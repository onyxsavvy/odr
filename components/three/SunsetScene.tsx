"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom shader for the sunset gradient sky
const SunsetMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#4C0004") }, // Wine
    uColor2: { value: new THREE.Color("#AFA231") }, // Algae
    uColor3: { value: new THREE.Color("#DCD189") }, // Wasabi
    uScroll: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uScroll;
    varying vec2 vUv;

    void main() {
      // Modify y based on scroll to deepen the wine color
      float y = vUv.y + uScroll * 0.5;
      
      // Blend colors
      vec3 color = mix(uColor3, uColor2, smoothstep(0.0, 0.4, y));
      color = mix(color, uColor1, smoothstep(0.3, 0.8, y));
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

function SkyGradient() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(() => {
    // We can link this to scroll trigger later via a global state or let GSAP handle a proxy object
    if (materialRef.current) {
      // get scroll progress for home section
      const progress = ScrollTrigger.maxScroll(window) > 0 
        ? window.scrollY / window.innerHeight 
        : 0;
      // Clamp progress
      materialRef.current.uniforms.uScroll.value = Math.min(progress, 1.5);
    }
  });

  return (
    <mesh position={[0, 0, -10]} scale={[100, 100, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={SunsetMaterial.vertexShader}
        fragmentShader={SunsetMaterial.fragmentShader}
        uniforms={SunsetMaterial.uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

function WaterSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // simple shimmering effect via rotation and position sine waves
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = -3 + Math.sin(time * 0.5) * 0.1;
      meshRef.current.rotation.x = -Math.PI / 2 + Math.sin(time * 0.2) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -3, -5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 20, 32, 32]} />
      <meshStandardMaterial 
        color="#1A0001" 
        roughness={0.1}
        metalness={0.8}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      // Mouse parallax
      gsap.to(groupRef.current.rotation, {
        x: -mouse.y * 0.1,
        y: mouse.x * 0.1,
        duration: 2,
        ease: "power2.out"
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Some abstract glass/ice floating elements */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-4, 1, -2]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshPhysicalMaterial 
            color="#AFA231"
            transmission={0.9}
            opacity={1}
            metalness={0.1}
            roughness={0.1}
            ior={1.5}
            thickness={2}
          />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[5, -1, -3]}>
          <icosahedronGeometry args={[0.8, 0]} />
          <meshPhysicalMaterial 
            color="#DCD189"
            transmission={0.8}
            opacity={1}
            metalness={0.2}
            roughness={0.2}
            ior={1.2}
            thickness={1}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function SunsetScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, -5]} intensity={2} color="#DCD189" />
      
      <SkyGradient />
      <WaterSurface />
      <FloatingParticles />
      
      <Environment preset="sunset" />
    </Canvas>
  );
}
