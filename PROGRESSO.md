# PROGRESSO

Running log for the audit and improvement of the Ospite site (version 5).
Every phase ends with a stop. Nothing moves to the next phase without Simon's "go".

Today: 13 October 2026.

---

## Where the site is

- Live source: `prova sito Ospite 3/sito/` (the pages edited directly, no build step).
- `prova sito Ospite 3/sito.zip` is an exact copy of `sito/` (checked file by file on 13 October 2026).
- Other files in `prova sito Ospite 3/`, outside the live site: `anteprima-home.html`, `anteprima-commissioni.html`, `piani.html`, `strumento-piani-INTERNO.html`. All carry `noindex`. They will be looked at in Phase 1 only to check that nothing internal is deployed by mistake.

---

## Phase 0: setup (done)

Done:
- Checked git status: working tree clean, starting point commit `a2ef3a5`.
- Created branch `audit-2026-10`.
- Created this file.
- No site file was touched.

## Phase 1: read-only audit (done, 13 October 2026)

Done:
- Wrote `AUDIT.md`: 8 Critical, 20 Important, 10 Nice-to-have findings. It also has a consistency table, the banned-wording list, a list of dates going stale, a weight budget, a "before launch" list, a "to be provided by Simon" list, what is incomplete in the privacy notice, and the top 10 conversion changes.
- Every page rendered at 360 × 640 and 1280 × 800 in Chromium. Form, questionnaire, menu and banner tested.
- No site file was edited.
- Could not reach the live Netlify site (this environment's network blocks it). Which folder Netlify publishes is a question for Simon (finding C7).

## Phase 2, Part A: mechanical fixes (done, 13 October 2026)

Approved by Simon: C5, I10 (tense only), C4, I14, I9, I12, I13, N4, N6, N7, N8, N9, I11 step 2, N1, N5, I18, I19 (launch list only).

How it was checked:
- After every theme, all 8 pages rendered at 360 × 640 and 1280 × 800.
- Checked each time: JavaScript errors, requests to other servers (always zero), sideways scrolling, layout shift, and a pixel comparison with the previous state.
- "No visual change" themes (CSS clean-up, constants, inline styles) are pixel-identical.

| Commit | Theme | Findings |
|---|---|---|
| e1d5d4a | Dates: static 13 October banner, past tense | C5, I10 |
| 44dba22 | Forms: browser checks without JavaScript, errors tied to fields | C4, I14 (form) |
| cdc57de | Questionnaire: focus, live region, progress bar from 0 | I9 |
| 4e39ff3 | Accessibility: menu, labels, 44 px targets, quieter announcements, darker chart label | I14 |
| 073d393 | CSS: unused rules deleted, duplicates merged (33,9 → 26,5 KB) | I12 |
| a1c1484 | site.js: constants, small tidy-ups | I13, N7 |
| 521acd1 | Wheel: less work per frame, identical drawing | N4 |
| af8761b | Inline margins → CSS classes | N7 |
| a3ad216 | Launch reminders moved from page source to README | N6 |
| f61ab24 | FAQPage structured data removed | N8 |
| 8ee8591 | Chart: starting size + example in numbers without JavaScript | N9 |
| 34f1c50 | README: table of repeated values + one grep command | I11 step 2 |
| a700fa0 | Images: 1200 px Galleria, lighter WebP | N1 |
| 183516c | **Fix** of a bug introduced in cdc57de (variable name clash broke the sticky bar on come-lavoriamo after the first answer) | — |
| d00229c | `_headers`: noindex header, CSP, security headers, caching | N5 |
| 7c9932c | "Esempio" label on all four phone screens | I18 |
| 98ad832 | README launch list: grazie and 404 keep noindex; Pretty URLs check | I19 |

Not touched, as agreed: C1, C2, C6, C7, C8, I1, I2, I3, I5, I6, I7, I8, I11 step 1, I16, I17, I20, N3, N10, and the 30 November lines.

## Phase 2, Part B: design and flow (in progress, 13 October 2026)

Done and committed:
- `c7daf4f` **I15, option (b):** the commissions chart in the palette.
  - Black for the platform line.
  - Bordeaux for the owner's page and the shaded area.
  - Brass dashed line for the threshold, with the darker brass label.
  - Grey for the vertical cursor, so it is not confused with the black line.
  - Checked at 360 and 1280 px.

Built, **not committed**, waiting for Simon's OK (working copy only):
- **C3:**
  - The sticky bar watches the hero buttons instead of the whole hero.
  - The wheel is 17,5rem wide on phones (under 40rem).
  - "Il viaggio" on phones shows one phone (first screen) above the four steps; the four cloned phones are gone.
  - Desktop: all pages pixel-identical.
- **I4:**
  - Home order: hero → calculator → "Tre cose" → price → "Il viaggio" → "Fa per te?" → empty hidden slot `<section id="chi-ce-dietro" hidden>` → form.
  - The price block on the home page loses its ivory background, so the bands keep alternating.
  - The README describes the slot.
- **Screenshots** in `screenshot-parte-B/` (not committed): full page and first screen at 360 px, before and after, plus a side-by-side comparison.

Measured at 360 px (phone 360 × 640):

| | Before | After |
|---|---|---|
| First button (bottom edge) | 724 | 724 (unchanged: the hero text above it is unchanged) |
| Sticky bar | appears at 1.480 | **visible on the first screen** (the hero buttons are below it); hides while the hero buttons are on screen; reappears at **788** |
| Price | 6.200 | **3.724** |
| Calculator | 7.660 | **1.466** |
| Form | 9.080 | **7.495** |
| Page height | 10.556 | **8.972** |

## What Simon must decide (Part B)

1. **OK to commit C3 + I4** as they are?
2. **Sticky bar trigger:** it reappears at 788 px, when *both* hero buttons have left the screen (at 360 px they sit one above the other). If you prefer it keyed on the first button only, it would reappear at 724 px.
3. **"Fa per te?" placement:** your list for the new order did not mention it. I kept it (no wording removed), just before the empty "Chi c'è dietro" slot and the form, as a last honest filter. Say if you want it elsewhere.
4. **Pre-existing, not fixed:** on the commissions chart at 360 px, the label "più i 68 € al mese del piano" touches the label "Piattaforma", and "Dalla tua pagina" sits on its own line. Fix now or later?
## Phase 3: text proposals in TESTI-PROPOSTE.md (waiting)
## Phase 4: animations (waiting)

---

## What Simon must decide

1. **Branch on GitHub:** decided. The work stays on `audit-2026-10` locally; the commits go to GitHub as `claude/nifty-rubin-ey0ew4`, the only branch this session can push to.
2. **Part B decisions:** see the section above.
3. **Still open from the audit:**
   - C2 wording: "senza commissioni" is still on 5 pages, plus the README launch list (item 10).
   - The share image `images/condividi.jpg` has "Per chi affitta", "annunci" and the price baked into the picture. If I2 or I3 change the wording, the image must be remade too.
4. **Questions only you can answer** (full list at the end of `AUDIT.md`):
   - Which folder Netlify publishes (is `README.md` public?).
   - Are form email notifications on?
   - Lodgify's real plan, price and any booking fee.
   - IVA on 68 €.
   - What the 1,5% is calculated on.
   - How the trial ends against the 30 days' notice.
5. **One choice:** replace "affitta / affitti" (I3)? (Chart colours: decided, option b, done.)
