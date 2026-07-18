# UI/UX & Motion Design Brief
## On Da Rocks — Website

---

## 1. Design Concept

**"Golden Hour, On Loop."**

The entire visual system is built around the moment the sun drops behind Kanke Dam — the one experience every ODR review agrees on. Deep Wine is the night/water base the site lives in; Algae is the literal color of the sun's last light hitting the water; Wasabi is the soft glow/highlight — the moment right before dusk. As the user scrolls, the site should subtly shift in mood, like time is passing, the way it does for a real evening at ODR.

## 2. Color System

| Name | Hex | Role |
|---|---|---|
| **Wine** | `#4C0004` | Primary background/base — used for large surfaces, nav-on-scroll, footer, dark sections. Reads as premium, moody, night-over-water. |
| **Algae** | `#AFA231` | Primary accent — CTAs, key headlines, icons, active states, the "sunset gold" glow. Used with intention, not everywhere. |
| **Wasabi** | `#DCD189` | Secondary/light — body text on dark backgrounds, light-mode surface sections, hover highlights, subtle gradients paired with Algae. |

**Supporting neutrals (not in the original 3, but required for usable UI — text-on-light, borders, disabled states):**
- Off-white / warm cream (`#FAF8F0`-ish) for any section that needs a light base so Wine/Algae text remains legible — treat as a "canvas," never a hero color
- A near-black derived from Wine (e.g., darkening `#4C0004` further) for deepest shadow areas, not pure `#000`

**Rule:** never introduce a 4th hue. Photography (real ODR sunset/food/crowd shots) provides the visual richness; the palette stays disciplined to these three plus neutrals. Gradients should be built by blending Wine → Algae → Wasabi (this literally recreates a sunset gradient, which is the whole point).

## 3. Typography

- **Display/headline font:** a confident, slightly editorial serif or high-contrast sans (e.g., something in the spirit of *Fraunces*, *Canela*, or *General Sans* for a warm-but-modern bar/grill feel) — used for hero headline, section titles, big number/stat callouts
- **Body font:** clean geometric sans (e.g., *Inter*, *Satoshi*) for readability in menu/content
- Large type scale — headlines should feel oversized/cinematic (think 8–14vw on hero), consistent with a motion-heavy, visually confident site
- All text on Wine background uses Wasabi or cream, never pure white (keeps the palette discipline)

## 4. Motion Philosophy

- **Motion should feel like weather, not like UI.** Prefer slow, weighted, physically-plausible easing (`power2.out`, `power3.inOut`) over bouncy/springy defaults — this isn't a playful SaaS product, it's a moody golden-hour bar.
- **Scroll = time of day.** Where possible, tie scroll progress to lighting/color shifts (e.g., hero 3D sky gradient subtly deepens from Wasabi-lit to Wine-dark as user scrolls past it) — reinforces the sunset concept mechanically, not just visually.
- **Every section gets ONE signature motion moment**, not ten small ones — motion-heavy means *purposeful and constant*, not *chaotic*.

## 5. Section-by-Section Spec

### Hero (#home)
- **3D scene (R3F):** abstracted horizon — a gradient "sky" plane (Wine top → Algae → Wasabi near horizon), a subtly animated "water" plane below with shader-based ripple/shimmer catching Algae/Wasabi highlights, and 2–3 floating foreground elements (e.g., a stylized ice cube/glass silhouette, subtle smoke/steam wisps referencing the grill) that drift gently on a loop and react to mouse parallax
- Headline: split-text character reveal, staggered, on load (e.g., "East India's Biggest Sunset Bar & Grill")
- Subtext fades/rises in after headline completes
- Primary CTA: magnetic button (cursor-attraction), Algae fill, subtle glow pulse
- Scroll indicator: minimal animated chevron/line, pulses to invite scroll
- **On scroll out:** 3D scene camera very slowly pushes forward/down as if descending toward the water, sky gradient deepens toward Wine — this is the single scrub-linked moment worth the performance cost

### About (#about)
- Two-column layout: text block + image, image has a subtle parallax (moves slower than scroll speed)
- Text reveals line-by-line via `reveal-on-scroll` (fade + 8px rise + blur-in)
- A thin animated line/underline draws itself under the section title on enter (SVG stroke-dashoffset animation)

### Signature Experience (#experience)
Four pillars: **The View / The Grill / The Vibe / The Space**
- Horizontal-scroll-within-vertical-scroll pinned section (GSAP ScrollTrigger pin): user scrolls down normally, but this section "catches" and translates the 4 cards horizontally as they continue scrolling, then releases
- Each card: image background with Wine gradient overlay for text legibility, icon or number (01/02/03/04) in Algae, title + 1-line description
- Cards scale/tilt very slightly (3–5°) on scroll-linked progress for a subtle 3D-card feel (CSS `perspective` + `rotateY`, cheap and effective, no R3F needed here)

### Menu Preview (#menu)
- Pinned section again (this is the second signature scrub moment) — category tabs (Starters / Mains / Grill / Bar) with items sliding in as a horizontal filmstrip
- Each menu item card: dish name, short description, price, subtle tag (veg leaf icon in Algae / non-veg marker), image thumbnail with slight scale-on-hover (desktop) or scale-on-enter (mobile)
- "View Full Menu" CTA at end of pinned sequence → links to `/menu` route
- Price range badge visible: "₹400–1,600 per person"

### Gallery (#gallery)
- Masonry or offset-grid layout, images at varying parallax speeds (classic "depth" scroll effect — some images move faster/slower than scroll = 3D depth illusion without true 3D)
- Lightbox on click/tap with smooth scale-up transition (Framer Motion `layoutId` shared-element transition)
- Mix of sunset/dam-view shots, food/grill shots, crowd/vibe shots — visually communicates "this is a real, lively, beautiful place"

### Events & Private Parties (#events)
- Large stat callouts animate via count-up on scroll-enter: "50–200 Guests" / "Free Parking" / "Live Music Evenings"
- Background: Wine base with a subtle Algae-tinted radial glow that follows cursor position (desktop) — reinforces "spotlight/celebration" feeling
- CTA: "Plan Your Event" → scrolls to Reserve section with occasion pre-filled

### Testimonials (#testimonials)
- Auto-advancing horizontal carousel (pauses on interaction/hover), drag-to-scroll enabled
- Each card: paraphrased review quote, reviewer first name, subtle star rating in Algae
- Card enters with a soft 3D flip or slide+fade, not a hard cut

### Location & Visit Info (#visit)
- Embedded map (styled to match palette if using Mapbox custom style; standard Google embed acceptable for v1 speed) alongside hours/address/parking info block
- "Best time to visit: golden hour" micro-copy with a small live-feeling sun-position graphic (simple animated SVG arc, not full 3D) tied to actual time of day if feasible (nice-to-have, not required for v1)

### Reserve / Contact (#reserve)
- Form fields animate in with slight stagger on section enter
- Wine background, Wasabi input fields with Algae focus-state border glow
- Success state: full-bleed confirmation animation (checkmark draw-in, Algae) rather than a plain toast — this is the final moment of the experience, worth a flourish
- WhatsApp/Call buttons flank the form, equally prominent — not buried as secondary options

### Footer
- Low-motion, high-utility — repeats address/phone/hours in static, accessible text
- Social icons with subtle hover-lift
- No heavy animation here — this is the "quick facts" safety net described in the App Flow doc

## 6. Micro-interactions Checklist

- Magnetic effect on all primary buttons (desktop only — replace with tap-scale on mobile)
- Custom cursor (desktop): small dot + trailing ring, shifts to Algae fill when hovering interactive elements
- Image reveals: clip-path wipe or scale-from-108%-to-100% on scroll-enter, never a hard cut
- Nav link underline: animated draw-in on hover, not just color change
- Button hover: subtle scale (1.02–1.04) + shadow lift, not color-invert (keeps palette discipline)

## 7. Accessibility & Motion Safety

- Respect `prefers-reduced-motion: reduce` globally — swap scrub/parallax/3D-drift for simple opacity fades, disable auto-advancing carousel, disable cursor-follow effects
- Maintain WCAG AA contrast: on Wine backgrounds, use Wasabi/cream text (never Algae-on-Wine for body copy — check contrast ratio, Algae is a mid-tone and can fail AA for small text; reserve pure Algae for large headlines/buttons/icons only)
- Ensure all pinned/scrubbed sections still work with keyboard-only scrolling and screen readers (content order in DOM must match visual/reading order regardless of animation)
