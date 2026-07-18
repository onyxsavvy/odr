# Technical Requirements Document (TRD)
## On Da Rocks — Website Build

---

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR/SEO for a public-facing restaurant site, image optimization built-in, single dev can ship fast |
| Language | TypeScript | Fewer runtime bugs in an animation-heavy codebase |
| Styling | Tailwind CSS + CSS variables for the 3-color system | Fast iteration, easy to enforce the fixed palette |
| Smooth scroll | **Lenis** (`@studio-freight/lenis`) | Industry-standard smooth-scroll engine, pairs cleanly with GSAP ScrollTrigger |
| Scroll/timeline animation | **GSAP + ScrollTrigger** | Best-in-class scrubbing, pinning, and scroll-linked timelines — this is what makes it feel "motion heavy" without feeling janky |
| Micro-interactions | **Framer Motion** | Hover states, menu card reveals, button magnetics, page-level transitions |
| 3D | **React Three Fiber + drei** (Three.js) | For the hero 3D scene (see UI/UX Motion Brief) — sunset/dam abstraction, floating glass/ice elements, parallax layers |
| Forms | React Hook Form + Zod validation → sends via a simple API route (Resend/Formspree) | Reservation request form |
| Image handling | `next/image`, WebP/AVIF, blur placeholders | Non-negotiable for perf given how photo-heavy this site is |
| Deployment | Vercel | Zero-config with Next.js, free tier is enough for v1 traffic |
| Analytics | Vercel Analytics or Plausible | Lightweight, no cookie-consent overhead |

## 2. Why R3F instead of a pre-rendered 3D video/Spline embed

Spline/Lottie embeds are faster to build but (a) add a large third-party runtime, (b) are harder to make truly scroll-reactive at a granular level, and (c) don't allow tinting geometry dynamically with the exact brand hex values. R3F gives full control to tie 3D object rotation/position/color directly to scroll progress and to the Wine/Algae/Wasabi palette. If timeline is tight, **fallback plan**: build the hero as a layered-parallax 2D scene (real photography + GSAP) and reserve R3F only for one standout moment (e.g., a rotating glass/ice cube or floating grill smoke) rather than a full 3D environment.

## 3. Animation Architecture

```
/lib/scroll/
  lenis-provider.tsx     — wraps app, initializes Lenis, syncs with GSAP ticker
  scroll-context.tsx     — exposes scroll progress (0–1) via context for components that need it (e.g., 3D scene, progress indicator)

/components/motion/
  reveal-on-scroll.tsx   — reusable wrapper: fade+rise+blur-in when element enters viewport (Framer Motion whileInView)
  pin-section.tsx        — GSAP ScrollTrigger pin wrapper for "sticky" sections (Menu horizontal scroll, Gallery)
  magnetic-button.tsx    — cursor-attraction effect for primary CTAs
  split-text.tsx         — word/char-level text reveal (hero headline, section titles)
  parallax-layer.tsx     — generic layer that moves at custom scroll speed (for depth in hero/gallery)

/components/three/
  sunset-scene.tsx       — R3F canvas: gradient sky plane, water shader plane (Wine base, Algae/Wasabi highlights), floating props
  scroll-rig.tsx         — ties camera/object transforms to scroll progress
```

**Core rule:** every scroll-triggered animation must have a `prefers-reduced-motion` fallback (instant/opacity-only transitions) — required for accessibility, not optional.

## 4. Performance Budget

Because this is explicitly "motion heavy," performance discipline is what prevents it from feeling cheap/laggy:

- **Lighthouse mobile performance ≥ 80** (animation-heavy sites rarely hit 90+, but 80 is the floor)
- LCP < 2.5s — hero background should be a compressed poster image/video, not the full 3D scene, on first paint; 3D scene mounts after
- 3D scene: cap to **one** R3F canvas active at a time, unmount when scrolled far out of view (use `IntersectionObserver`, not just `display:none`)
- GSAP ScrollTrigger: use `scrub: true` sparingly (expensive); prefer triggering once-per-enter animations for most sections, reserve scrub for 2–3 signature moments (hero, menu pin, gallery)
- Images: all served via `next/image`, max displayed width sized correctly, lazy-loaded below the fold
- Fonts: max 2 font families, self-hosted via `next/font`, `font-display: swap`
- Total JS for animation libraries should stay under ~180KB gzipped combined (GSAP core + ScrollTrigger + Framer Motion + Lenis + R3F/drei/three — three.js is the heaviest single piece; consider code-splitting so it's only loaded on the hero section mount)

## 5. Responsive & Device Strategy

- **Mobile-first build.** Given ODR's traffic will skew mobile (Instagram/Maps referral), the mobile experience is the primary experience, not an afterthought.
- 3D hero scene: build a lighter-weight mobile variant (fewer particles/geometry, or swap to a 2D parallax fallback below ~768px if frame rate testing shows drops on mid-range Android devices — very common in this market).
- Touch: replace hover-triggered interactions with tap/scroll-triggered equivalents.

## 6. SEO & Metadata

- Next.js Metadata API: title/description per section anchor where relevant
- Structured data: `Restaurant` schema (JSON-LD) — name, address, phone, price range, cuisine, opening hours, geo-coordinates, image
- OpenGraph/Twitter cards using a hero still frame
- `sitemap.xml` + `robots.txt`
- Target local-SEO queries: "sunset bar Ranchi," "restaurant Kanke Dam view," "birthday party venue Ranchi," "ODR Ranchi"

## 7. Content Management (v1)

All copy/menu/gallery data lives in typed content files:

```
/content/
  business.ts      — name, address, phone, hours, social links, geo-coords
  menu.ts          — categorized items with name, description, price, tag (veg/non-veg/bar)
  testimonials.ts  — curated/paraphrased reviews
  gallery.ts        — image manifest with alt text
```

This keeps it editable by a non-technical person later (swap values, no JSX knowledge needed) and makes a future CMS migration a matter of swapping the data source, not rebuilding components.

## 8. Browser Support

Evergreen Chrome, Safari (iOS — critical, test WebGL/Lenis behavior specifically on iOS Safari), Firefox, Edge. No IE11 considerations.
