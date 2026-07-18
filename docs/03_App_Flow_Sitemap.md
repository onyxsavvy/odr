# App Flow & Sitemap
## On Da Rocks — Website

---

## 1. Site Structure

This is a **single-page scroll experience** with anchor-based navigation (not multi-route), which is standard for restaurant/experience sites and works best with the scroll-motion approach.

```
/ (single page, anchor sections)
  #home        Hero
  #about       About / Story
  #experience  Signature Experience (View / Grill / Vibe / Space)
  #menu        Menu Preview
  #gallery     Gallery
  #events      Events & Private Parties
  #testimonials Testimonials
  #visit       Location & Visit Info
  #reserve     Reserve / Contact

/menu           (optional secondary route — full menu, simpler/static page, less motion, fast-loading, linkable directly from Google/Instagram)
/privacy        (minimal, required for any form data collection)
```

**Why one optional secondary route (`/menu`):** Google/Instagram traffic often wants the menu specifically and fast — a lighter, low-motion dedicated page prevents making them sit through the full cinematic experience just to see prices. Everything else stays on the single scroll page.

## 2. Navigation Behavior

- **Sticky/floating nav** appears after scrolling past the hero (not present in the first viewport — let the hero breathe)
- Nav background: transitions from transparent to a translucent Wine (`#4C0004`)-tinted glass panel on scroll
- Active section highlight as user scrolls (scroll-spy)
- Mobile: hamburger → full-screen takeover menu with staggered link reveal animation
- Persistent CTA button in nav: "Reserve a Table" (Algae accent) — always visible, never hidden behind hamburger

## 3. User Flow — Primary Path (Reservation Intent)

```
Land on Hero (sunset visual, tagline)
   ↓ scroll
About (understand what ODR is / why it's special)
   ↓ scroll
Signature Experience (View / Grill / Vibe / Space — builds desire)
   ↓ scroll
Menu Preview (concrete: what will I eat, what will it cost)
   ↓ scroll
Gallery (social proof via visuals — "this is real, people are here")
   ↓ scroll
Events (if group/celebration intent — branch point)
   ↓ scroll
Testimonials (trust reinforcement right before conversion)
   ↓ scroll
Visit Info (practical: where, when, parking)
   ↓ scroll
Reserve (convert: form / call / WhatsApp)
```

Every section from About onward also carries a secondary, lower-emphasis CTA (e.g., a "Reserve" text link) so high-intent users don't have to scroll the whole way if they've already decided.

## 4. User Flow — Secondary Path (Quick-Fact Seeker)

Some visitors (especially Maps referrals) just want hours/address/phone. Solve this without breaking the cinematic flow:

- Sticky nav always includes a "Visit" link that jumps straight to Location & Visit Info
- Footer repeats all key facts (address, phone, hours) in plain, no-animation text — a safety net for anyone who scrolls to the bottom looking for facts, or for crawlers/screen readers

## 5. User Flow — Event Planner Path

```
Hero → (skip via nav) → Events section directly
   ↓
Sees capacity (50–200 guests), package framing, CTA: "Enquire for your event"
   ↓
Form (event-specific fields: date, guest count, occasion type) OR direct WhatsApp/call
```

## 6. Conversion Actions (all present, redundantly, by design)

1. **Reserve form** (#reserve) — name, phone, date, party size, occasion (optional), message
2. **Click-to-call** — phone number is a `tel:` link everywhere it appears (nav, footer, visit section)
3. **WhatsApp CTA** — `wa.me` link pre-filled with a friendly message ("Hi! I'd like to reserve a table at ODR for...")
4. **Instagram link** — secondary, for browsing photos/trust-building, not primary conversion

## 7. Loading / Transition States

- Initial load: brief branded loader (2–3 sentence-length animation max, not a long splash) while hero assets/3D scene initialize — should never exceed ~1.5s perceived wait
- Section-to-section: no hard page transitions (single page), but each section "arrives" via scroll-triggered reveal rather than being visible all at once on load
- `/menu` route: standard Next.js page transition, lightweight, near-instant

## 8. Accessibility Flow Notes

- All anchor nav links are real `<a href="#section">` — keyboard/screen-reader navigable, not JS-only click handlers
- Skip-to-content link for screen reader users to bypass the hero animation
- Reduced-motion users get the same content/order, just without scrub/parallax — never hidden content, only removed motion
