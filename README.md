# F2A CARS — website

Premium digital showroom and F2A Vlogs hub for **F2A CARS**, Timog, Quezon City.
Buy · Sell · Trade · Consign — *“We communicate aftersales.”*

**Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Framer Motion · Lucide · React Router 7

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build
```

## Where things live

| What | File |
| --- | --- |
| Business info, nav, services, brand statements, social links | `src/data/site.ts` |
| Facebook metrics (followers, recommend %, reviews + date) | `src/data/socialProof.ts` |
| Inventory (**sample data**) | `src/data/vehicles.ts` |
| F2A Vlogs episodes | `src/data/vlogs.ts` |
| “Latest from F2A” post cards | `src/data/posts.ts` |
| Testimonials / customer stories (**placeholders**) | `src/data/testimonials.ts`, `src/data/customerStories.ts` |
| Every image URL + gallery | `src/data/images.ts` |
| Inventory loading, filters, sorting | `src/lib/inventory.ts` |
| Form submission boundary + payload types | `src/lib/submissions.ts` |
| Per-page SEO (title, description, OG, canonical, JSON-LD) | `src/lib/seo.tsx` |
| robots.txt, sitemap.xml, site-wide JSON-LD, hero preload | `vite.config.ts` |

Components never hardcode business details or image URLs — edit the data files and the whole site updates.

## Before launch

- [ ] **Connect form submissions.** Forms validate and show success states, but `submitForm()` is simulated — *nothing is delivered yet*. Connect Supabase and/or an email/CRM function (see below).
- [ ] **Replace the sample inventory.** Every vehicle in `vehicles.ts` is marked `sample: true` (shows a SAMPLE badge and a notice). Real listings drop the flag.
- [ ] **Replace placeholder photography.** Images marked `placeholder: true` in `images.ts` are free-license Unsplash photos, not F2A vehicles. The F2A logo and the EP. 406 artwork are F2A’s own (from the Facebook page).
- [ ] **Replace placeholders** in `testimonials.ts`, `customerStories.ts` and the placeholder cards in `vlogs.ts` — only with real content used with permission.
- [ ] **Add video links** (`videoUrl`) for episodes — YouTube or Facebook URLs embed automatically; without one the player links to Facebook.
- [ ] **Review `/privacy` and `/terms`** — they are templates and say so on the page.
- [ ] **Set `VITE_SITE_URL`** (see `.env.example`) so canonical URLs, Open Graph images and `sitemap.xml` use the real domain.
- [ ] Confirm opening hours before publishing any (Facebook lists “Always open”; the site shows none).

## Going live with Supabase

`supabase/schema.sql` has the tables (vehicles, vehicle_images, inquiries, sell_requests, trade_requests, consignment_requests, financing_requests, contact_messages, vlogs, testimonials, customer_stories) with row-level security: the public can read published content and insert leads, never read them.

1. `npm install @supabase/supabase-js`, add `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
2. Replace the body of `fetchVehicles()` in `src/lib/inventory.ts` with a Supabase query (example in the file).
3. Replace the simulated submit in `submitForm()` (`src/lib/submissions.ts`) with an insert into `submissionTables[kind]`, mapping camelCase keys to snake_case. Upload sell-form photos to Supabase Storage.
4. Email/CRM/Messenger notifications belong in a server function holding the secret keys — never in the browser.

Because content is already centralized, a future `/admin` (vehicles, prices, availability, images, vlogs, stories, testimonials) only needs to write to these tables.

## Deploying

It’s a static SPA (`dist/`). Hosts must fall back to `index.html` for client routes — `vercel.json` does this on Vercel; on Netlify add `/* /index.html 200` to `_redirects`.

## Notes

- **Performance:** routes are code-split, libraries sit in a cached `vendor` chunk, images are responsive (`srcset`) and lazy, the homepage hero is preloaded, and Framer Motion uses `LazyMotion`. Fonts load from Google Fonts (Archivo variable, width + weight axes); self-host them later with `@fontsource-variable/archivo` if you want zero third-party requests.
- **Accessibility:** semantic landmarks, skip link, native `<dialog>` modals (focus trap, Esc), labelled fields with inline errors, visible focus, `prefers-reduced-motion` respected.
- **Facts:** only information from the F2A CARS Facebook page is used. Don’t add awards, branches, hours, financing rates, bank partners or testimonials that F2A hasn’t confirmed.
