# Product Requirements Document (PRD)
## On Da Rocks (ODR) — "East India's Biggest Sunset Bar & Grill"

**Client:** On Da Rocks, Rock Garden, Gandhi Nagar, Kanke Road, Ranchi, Jharkhand 834008
**Prepared by:** OnyxSavvy
**Doc type:** Product Requirements Document
**Version:** 1.0

---

## 1. Project Summary

ODR is a scenic sunset bar & grill perched above Kanke Dam in Ranchi — known for its dam-view seating, group/party energy, live evenings, and multi-cuisine grill menu. The current online presence is limited to Google Maps and Instagram; there is no dedicated website.

We are building a **single-page, motion-heavy, visually cinematic website** that sells the experience first and the menu second. The site should feel like watching the sun go down over the dam from ODR's deck — warm, golden, a little dramatic — even before a single photo loads.

## 2. Goals

| Goal | Why it matters |
|---|---|
| Convert visitors into table reservations / calls | Primary business driver — no online ordering infra exists yet |
| Communicate "premium sunset destination," not "just another Ranchi restaurant" | Reviews are mixed on food (3.4–4.0★) but consistently rave about ambience/view — the site must lead with what people actually love |
| Showcase group/event hosting (birthdays, get-togethers, corporate) | Real recurring revenue driver per reviews (birthday parties, 50–200 guest capacity) |
| Be genuinely impressive as a portfolio piece | This is also an OnyxSavvy showcase site — should demonstrate 3D/scroll-motion capability |

## 3. Non-Goals (out of scope for v1)

- Online food ordering / cart / payment
- Table booking with live availability (v1 = booking **request** form + WhatsApp/call CTA, not a real-time system)
- CMS/admin panel (menu managed as structured content in code for v1; can migrate to Sanity/Contentful in v2)
- Multi-language toggle (Hindi content can be added in v2)

## 4. Target Audience

1. **Young groups / friend circles (22–35)** — coming for the vibe, sunset photos, casual drinks + grill, birthdays
2. **Families** — evening outings, valuing the view and parking, less concerned with "trendy," more with comfort
3. **Corporate / event planners** — scouting a venue for 50–200 guest gatherings
4. **Out-of-towners / Google Maps discovery traffic** — need quick facts: location, hours, price range, "is it worth the drive to Kanke"

## 5. Brand Positioning

> "Ranchi's golden hour, on repeat." — A destination built around one unbeatable asset: the view. The website should never let the visitor forget that the sun setting over Kanke Dam is the main character; food, drinks, and ambience are supporting cast.

**Tone of voice:** Warm, a little cheeky, weekend-energy — consistent with ODR's own Instagram captions (e.g. "Because weekends are for food that makes you go 'damn!'"). Not corporate, not overly formal.

## 6. Verified Business Facts (source: Google Maps, Instagram, Facebook — pulled live)

- **Name:** On Da Rocks (ODR)
- **Tagline (owned, used in FB bio):** East India's Biggest Sunset Bar & Grill
- **Address:** Rock Garden, Gandhi Nagar, Kanke, Ranchi, Jharkhand 834008
- **Landmark:** Overlooking Kanke Dam
- **Phone:** 073610 00066 / 073620 00066
- **Email:** odrranchi@gmail.com
- **Instagram:** @odrranchi (~4.5K followers)
- **Hours:** Open daily, closes 12 AM
- **Price range:** ₹400–1,600 per person (venue/event pricing runs higher, ₹1,200–1,500/plate for 50+ guest bookings)
- **Rating:** 3.4–4.0★ across platforms (350+ reviews) — ambience/service praised more consistently than food
- **Cuisine:** Multi-cuisine — North Indian, Chinese, continental, tandoor/grill, bar
- **Popular dishes (per Maps data):** Paneer Tikka, Veg Biryani, Chicken Tikka, Chicken Coleslaw Salad, Pizza
- **Seating:** Indoor + outdoor/deck, dine-in, takeaway, delivery
- **Capacity:** 50–200 guests for private events
- **Amenities:** Ample free parking, dam view (day + night), live music evenings, group-friendly layout

## 7. Required Sections

1. **Hero / Landing** — full-viewport, cinematic, sunset-over-dam visual with 3D/parallax depth, tagline, primary CTA (Reserve/Call)
2. **About** — the ODR story: what it is, why the location matters, the "sunset ritual"
3. **Signature Experience / Highlights** — 3–4 pillars: The View, The Grill, The Vibe (live music/group energy), The Space (event capacity)
4. **Menu Preview** — curated highlight menu (not exhaustive), popular dishes called out, price range, link/CTA to full menu or WhatsApp for full PDF
5. **Gallery** — photo/video showcase, scroll-driven reveal, sunset + food + crowd shots
6. **Events & Private Parties** — birthdays, corporate, capacity, packages CTA
7. **Testimonials** — pulled/paraphrased real review sentiment (ambience, sunset, service)
8. **Location & Visit Info** — embedded map, hours, parking note, "why it's worth the drive"
9. **Reserve / Contact** — form + click-to-call + WhatsApp + Instagram
10. **Footer** — nav, socials, hours, address, credits

## 8. Success Criteria

- Site feels distinctly *not* like a template — motion and 3D depth should be the memorable takeaway
- Loads and remains smooth on mid-range mobile devices (majority of ODR's actual traffic will be mobile, from Instagram/Maps referral)
- Every core fact (address, phone, hours, price range) is accurate and easy to find within 2 scrolls
- Primary CTA (Reserve/Call/WhatsApp) is visible in <5 seconds on every device

## 9. Constraints

- Solo-developer build using AI-assisted (vibe-coding) workflow — architecture must stay simple enough for one person to maintain
- No backend/CMS budget in v1 — content is static/structured in code
- Must be genuinely performant despite being animation-heavy (see TRD for perf budget)
