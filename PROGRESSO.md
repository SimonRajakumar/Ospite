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

## Phase 2: code and flow fixes (next, waiting for Simon's list)

Will apply only the findings Simon approves. One theme per commit (dates, consistency, forms, performance, accessibility, cleanup). Check at 360 and 1280 after each theme.
## Phase 3: text proposals in TESTI-PROPOSTE.md (waiting)
## Phase 4: animations (waiting)

---

## What Simon must decide

1. **Branch on GitHub.** This cloud session can only push to the branch `claude/nifty-rubin-ey0ew4`. The work sits on the local branch `audit-2026-10` and the same commits are pushed to `claude/nifty-rubin-ey0ew4`. If you want a branch actually named `audit-2026-10` on GitHub, say so and I will push it too (or you can rename it on GitHub later).
2. **Which findings to apply in Phase 2.** Reply with the IDs (e.g. "C2, C3, C4, C5, I9, I12"). Findings that change wording (C2, C8, I2, I3, I16, I17) can also wait for Phase 3, where every sentence is shown before and after.
3. **Urgent, tomorrow:** C5. The 13 October banner shows a misleading sentence from 14 October. It is a small fix; it needs your "go".
4. **Questions only you can answer** (full list at the end of `AUDIT.md`):
   - Which folder Netlify publishes (is `README.md` public?).
   - Are form email notifications on?
   - Lodgify's real plan, price and any booking fee.
   - IVA on 68 €.
   - What the 1,5% is calculated on.
   - How the trial ends against the 30 days' notice.
5. **Two choices:**
   - Chart colours (I15): keep red and blue, or move to the palette.
   - Replace "affitta / affitti" (I3)?
