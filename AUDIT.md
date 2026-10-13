# AUDIT: the Ospite site, version 5

Read-only audit, 13 October 2026. No site file was changed.

Files checked: everything in `prova sito Ospite 3/sito/`. The four files next to it (`anteprima-*.html`, `piani.html`, `strumento-piani-INTERNO.html`) were checked only to see whether they could end up published.

**How it was checked**
- Every page, `site.js`, `ruota.js` and `style.css` read line by line.
- Every page rendered in Chromium at **360 × 640** (a phone with its browser bars) and **1280 × 800**. Measured: position of each button, sideways scrolling, tap target sizes, layout shift, JavaScript errors, and requests to other servers.
- The form tested with JavaScript switched off. The questionnaire and the menu tested with the keyboard. The 13 October banner tested with the clock set to 14 October.
- Contrast computed for every colour pair the site uses for text.
- Weights measured raw and gzipped. Unused CSS found by matching every class in `style.css` against the pages and scripts.
- The Airbnb 15,5% from 13 October 2026 checked against independent sources (they agree; see C6 and I21). The Lodgify price checked too (sources do **not** agree; see C6).
- **Not checked:** the live Netlify site. This environment's network policy blocks it, so I cannot see which folder Netlify publishes or whether the live files match the repo. See C7.

**Already good, keep it**
- No cookies, no trackers, no analytics, no third-party scripts. Zero requests to other servers on every page.
- Fonts are self-hosted, with no Google Fonts call, so rule 7 is already met.
- No JavaScript errors.
- No sideways scrolling at 360 px.
- No layout shift at load.
- Valid HTML: no duplicate IDs, no broken tags, headings in order.
- Skip link, visible focus ring and `prefers-reduced-motion` support are in place.
- The honest "non conviene" verdicts are in both calculators and the questionnaire.
- Each source has a date, and the phone mock-up's report says "numeri inventati".

**How to read each finding.** Each one gives: **Where** (page and line, or element) · **Problem** · **Why it matters to an owner** · **Fix** · **Effort** (small / medium / large). The letter in brackets is the point of the brief it answers (a–i). Line numbers refer to the files in `prova sito Ospite 3/sito/`.

---

## CRITICAL

### C1. Nobody is behind the site (a, i)
- **Where:** all pages. The footer only says "© 2026 Ospite, Torino". `privacy.html:53` names the controller only as "chi gestisce Ospite". `site.js:5` has `WHATSAPP = ""`, so every WhatsApp button stays hidden. There is no email and no phone. The form is the only contact.
- **Problem:** there is no name, face, VAT number, phone or email anywhere.
- **Why it matters:** an owner whose stays are worth 1.500 € or more will not hand their details to a service with no face. It is the first thing they check. A commercialista will also ask for the partita IVA: Italian rules expect a business website to show it.
- **Fix:** add a short "Chi c'è dietro" block on the home page, just before the form: name, one photo, two lines on why Simon does this, and a phone or email. Put the legal details in the footer. Nothing is invented here: every item is **to be provided by Simon** (see the list at the end). Until then the existing placeholders stay as they are.
- **Effort:** small once the data exists.

### C2. Banned wording: "senza commissioni" and variants (b, rule 1)
- **Where (exact wording):**
  - "nel piano senza commissioni" at `index.html:179`, `come-lavoriamo.html:74`, `come-lavoriamo.html:102`, `prenotazioni-dirette-torino.html:104`, `domande.html:58`, and again in the structured data at `domande.html:28`. That is 6 places.
- **Where (same idea, other words):**
  - "Non paga commissioni" (glossary, `domande.html:74`).
  - "Commissioni che non paghi più" (`commissioni-airbnb-booking.html:122`).
  - "Commissioni non pagate" (phone mock-up, `index.html:137`).
- **Problem:** rule 1 forbids this in any wording. The six exact matches describe Lodgify's plan, not Ospite, but the reader cannot tell the difference.
- **Why it matters:** it is the cheap message every competitor uses, and it is not Simon's message ("you sell your own product directly instead of leaving the sale to Airbnb and Booking").
- **Fix:**
  - Lodgify: "nel piano a canone fisso", after Simon confirms the plan (see C6).
  - Glossary: describe what a direct booking *is* ("la vendi tu, sul tuo sito, senza un intermediario"), not what it avoids.
  - The other two lines go into Phase 3 with compliant wording.
- **Effort:** small.

### C3. On a phone, no button is visible until the visitor has scrolled a long way (a)
Measured at 360 × 640:

| Home page | Where it sits |
|---|---|
| First button ("Parliamone, quindici minuti") | ends at 724 px. The screen ends at 640 px, so it is below the first screen |
| Sticky "Parliamone" bar | appears only after about **1.450 px** of scrolling, because it waits for the whole hero (text + wheel + facts, 1.423 px tall) to leave the screen |
| "Il viaggio" (4 phone mock-ups) | about **3.100 px**, roughly 5 screens |
| Price | at 6.200 px (screen 10) |
| Calculator | at 7.660 px (screen 12) |
| Form | at 9.080 px (screen 14) |
| Whole page | 10.556 px, about **16,5 screens** |

- **Problem:** the visitor gets two screens of reading with no action in sight. Then comes a five-screen animation block. The price only appears on screen 10.
- **Why it matters:** a busy owner on a phone decides in the first screen whether to keep going. Most will never reach the price or the form.
- **Fix:**
  - Show the sticky bar as soon as the *hero button* leaves the screen, not the whole hero.
  - On phones, put the wheel after the buttons in a smaller size, or drop it to below the facts.
  - On phones, replace the four phone mock-ups in "Il viaggio" with one, or with the four short steps as text only. That saves about 2.000 px.
  - Move the price and calculator up (see I4).
- **Effort:** medium.
- *Inner pages are fine:* their dark header block is short, so the sticky bar shows after 250–620 px. Desktop is fine: the "Parliamone" button sits in the fixed header.

### C4. The form sends empty messages when JavaScript is off; check that leads reach Simon (a, d)
- **Where:** the form on 5 pages (e.g. `index.html:207`) has `novalidate` written in the HTML.
- **Problem:**
  - With JavaScript off, the browser skips all checks. Tested: an empty form was sent (`nome=&telefono=&email=`).
  - With JavaScript on, the checks work: name required, then phone or email, then email format.
  - Netlify Forms keeps submissions in the Netlify dashboard. Unless an email notification is switched on there, a lead can wait unseen while the page promises "rispondiamo entro un giorno lavorativo".
- **Why it matters:** lost or empty leads are the most expensive bug a selling site can have.
- **Fix:**
  - Remove `novalidate` from the HTML and set it from JavaScript instead (one line). Without JavaScript, the browser then at least demands the name.
  - Mark the phone/email pair so a no-JS visitor sees "almeno uno dei due".
  - **Simon to confirm** in Netlify: Forms → notifications → email on.
- **Effort:** small.

### C5. The 13 October banner will be wrong from tomorrow (c)
- **Where:** `site.js:81-88`, shown on `index.html:47` and `commissioni-airbnb-booking.html:46`.
- **What happens:**
  - Today it reads "Da oggi Airbnb trattiene il 15,5% sulle nuove prenotazioni…", which is fine.
  - From 14 October (tested) it reads **"Dal 13 ottobre la commissione del 15,5% è sulla tua fattura. Guarda quanto ti è costata, poi fai il conto."**
- **Problem:** the new fee applies to bookings *made* from 13 October, and Airbnb pays out after the stay. For most owners the first 15,5% invoices arrive weeks or months later. An owner who checks their invoice tomorrow sees 3% and concludes the site is wrong. The countdown branches ("Mancano N giorni", "Da domani") are dead code from tomorrow. The text also depends on the visitor's phone clock.
- **Fix:** delete the countdown script. Write one static sentence in the HTML, the same on both pages, in the past tense, with "sulle nuove prenotazioni" and "per la maggior parte degli host europei". Example: "Dal 13 ottobre 2026 Airbnb trattiene il 15,5% sulle nuove prenotazioni (prima, il 3%)." No JavaScript, no expiry.
- **Effort:** small.

### C6. The calculators say "al netto di tutto" but leave Lodgify out, and the headline number rests on the most uncertain estimate (b, rule 3 and 5)
- **Where:** `site.js:94-111` (`contoAnno`), labels at `index.html:196` and `commissioni-airbnb-booking.html:116`, cost line at `site.js:135`.
- **Problem 1, Lodgify:** the result line says "Con noi ne recuperi, al netto di tutto". The cost line says "Già tolti… annunci e il nostro piano". Lodgify is not subtracted. At "circa 33 €" a month that is about 400 € a year, and more with more units.
- **Problem 2, the Lodgify price itself is not certain:**
  - Third-party sources found on 13 October 2026 disagree.
  - Several put Lodgify's Professional plan at about 40–42 $ a month, not 33 €.
  - Some say a **1,9% fee on direct bookings** applies on some plans, others say 0%.
  - If a 1,9% fee applies, every direct-booking number on the site is too optimistic.
  - **Simon must check** the Italian price list for the plan he will actually use.
- **Problem 3, where the number comes from:**
  - With the home page defaults (3 units, 150 €, 60%), the big number is **+2.486 €**.
  - Of that, **+5.059 € comes from "notti vuote riempite"**. The site itself calls that "il numero più incerto".
  - The "solid" part (returning guests booking direct) is +1.848 €. That does not cover ads (3.285 €) plus the plan (1.136 €).
  - So if no empty night is filled, the same owner is at about **−2.500 € a year**.
  - The full calculator shows this split. The home calculator shows one big number.
- **Why it matters:** a sceptical owner will notice the missing Lodgify cost. When they do, they stop trusting every other number on the site. The site's whole edge is honest numbers.
- **Fix:**
  - Add a `LODGIFY` constant (value to be confirmed by Simon) and subtract it.
  - Rename the line, e.g. "Stima, dopo pubblicità, Lodgify e il nostro piano".
  - Under the big number on the home page, show the split in one line: "di cui X € da prenotazioni dirette, Y € da notti vuote (la stima più incerta)".
- **Effort:** small to medium.

### C7. Internal notes may be public: README.md and the internal pricing tool (i)
- **Where:**
  - `sito/README.md` sits inside the site folder. If Netlify publishes `sito/`, anyone can open `/README.md`. It contains "Il problema più grave rimasto: nessun nome, foto, partita IVA o telefono", "Regole di Simon" and the internal change log.
  - If Netlify publishes the parent folder instead, `strumento-piani-INTERNO.html`, `piani.html`, the previews and `sito.zip` are all public.
- **Why it matters:** an owner, a competitor or a lawyer could read Simon's own list of weak points.
- **Fix:**
  - **Simon to tell me which folder Netlify publishes.**
  - Then either move `README.md` out of the published folder, or add a one-line `_redirects` rule that returns 404 for it.
  - Keep the internal tool and previews outside the published folder.
- **Effort:** small.

### C8. Sentences that promise results (b, rule 3)
| Where | Text | Why it is a promise |
|---|---|---|
| `index.html:6` and `:14` (title, og:title) | "Prenotazioni dirette e **notti piene**" | promises full nights |
| `index.html:48` (hero lead) | "Poi **la riempiamo**" | promises to fill the page |
| `index.html:192`, `commissioni…:111` | "**riempiamo** il 10% delle notti vuote" / "Notti vuote che **riempiamo**" | stated as what will happen, not as an assumption |
| `index.html:196`, `commissioni…:116` | "Con noi **ne recuperi**, al netto di tutto" | an estimate stated as a fact |
| `site.js:130` | "Per ogni euro che ci paghi, **te ne restano** 2,2" | an estimate stated as a fact; "restano" is also unclear (in addition? in total?) |
| `commissioni…:123` | "Notti vuote **riempite**" | as above |

- **Fix:** keep the numbers, mark them as estimates ("stima", "ipotesi"), and describe the work, not the outcome. The exact sentences go in Phase 3.
- **Effort:** small.

---

## IMPORTANT

### I1. The site does not speak to the real target client (a, b)
- **Where:** hero kicker `index.html:45` ("Per chi affitta case e appartamenti…"). Examples at 150 € a night (`index.html:178`, calculator defaults). Mock-up stay of 540 €. Single-booking slider default 1.000 €. The questionnaire answers "Sì" to one unit with many empty nights (`site.js:245`).
- **Problem:** the client is an owner of high-end homes (stays of about 1.500 € or more; 2+ units, or a villa with empty nights or returning guests). The site never says so. With the site's own model, a direct booking beats the platform from about **640 €** a stay (15,5% platform against 3% payment, 1,5% ours and 70 € of ads). At 1.500 € the gap is large and easy to show, but the site shows it at 1.000 € and 540 €.
- **Fix:**
  - Kicker naming the client (stay value, 2+ units or villa, Torino and Piemonte).
  - Single-booking default at 1.500 €.
  - Home example at a high-end price per night (Simon to choose a realistic one).
  - Add one questionnaire question on the value of an average stay, with an honest "under X € it is not worth it" answer.
- **Effort:** medium.

### I2. "annunci" means two things (h)
- **Where:** 31 uses. The site uses "annunci" for **ads** (Google, Instagram), while every owner calls their Airbnb listing their "annuncio". The site itself uses it that way once: "Codice CIN negli annunci" (`prenotazioni-dirette-torino.html:72`).
- **Problem:** "Pagina di prenotazione, annunci e prezzi migliori" (meta descriptions) reads as "better listings".
- **Fix:** "pubblicità" (or "pubblicità su Google e Instagram") for ads. "Annuncio" or "scheda" for the Airbnb or Booking listing only.
- **Effort:** small (Phase 3 text).

### I3. "affitta / affitti" (rule 2, to decide)
- **Where:**
  - `index.html:28` (structured data) and `index.html:45` (hero kicker): "chi affitta case".
  - `index.html:77`: "affitti almeno una casa".
  - `site.js:218`: "Quante unità affitti?".
  - `domande.html:7` and `:15`: "chi affitta a Torino".
  - `domande.html:79`: "in affitto breve", the legal term in the CIN definition. Keep that one.
- **Problem:** these describe the *owner*, not the service, so they do not strictly break rule 2. But it is the vocabulary of small landlords, not of owners of high-end homes.
- **Fix:** Simon to decide. Suggested direction: "chi ospita", "case che ricevono ospiti".
- **Effort:** small.

### I4. The order of the home page (a)
- **Now:** hero (problem + number + price) → "Fa per te?" → "Tre cose" (offer) → "Il viaggio" (5 screens on phone) → price → calculator → form.
- **Problem:**
  - The visitor's *own* number (calculator) comes after the price and after a long animation.
  - The honest "No, se" list comes before the offer has been explained.
  - There is no proof block at all. Nothing should be invented, but the person, the sources and the method are real proof that is available.
- **Proposed:**
  1. Hero: the problem, the number explained with a 1.500 € example, one main button.
  2. **Your number:** the short calculator.
  3. **The offer:** "Tre cose".
  4. **The price** and the 60-day trial.
  5. "Il viaggio", much shorter on phones.
  6. **Proof without inventing:** "Chi c'è dietro" (C1), the SEC source next to the 15,5%, the honest "Fa per te / Non fa per te".
  7. Form.
- **Effort:** medium (HTML moves only, no new code).

### I5. Buttons that do not say what happens (a)
- **Where and problem:**
  - "Parliamone, quindici minuti" (×3) promises a 15-minute talk but leads to a form whose answer comes "entro un giorno lavorativo". The visitor expects to book a call.
  - "Inizia la prova" (×3) leads to the same form with nothing pre-filled. The questionnaire and calculator already pre-fill the form, so the trial button should too ("Vorrei iniziare la prova di 60 giorni").
  - None of the buttons say it costs nothing to talk.
- **Fix:** each button says what happens, how long it takes and what it costs. For example: "Scrivici: ti richiamiamo entro un giorno lavorativo, 15 minuti, gratis". Exact wording in Phase 3, prefill in Phase 2.
- **Effort:** small.

### I6. Missing price terms that a lawyer or commercialista will ask about (b, i)
- **Problem:** the site never says:
  - whether **68 € includes IVA**;
  - **what the 1,5% is calculated on** (what the guest pays? before or after cleaning fee and tourist tax?) and how it is invoiced;
  - how the **60-day trial ends** given the **30 days' notice** (to stop at day 60, must the owner give notice at day 30?);
  - what "inizia entro il 30 novembre" means exactly (first call? signed agreement? first day of work?).
- There is also no page with the terms of service.
- **Fix:** Simon decides the answers. Then one short "Le condizioni, in chiaro" block under the price, and the terms text reviewed by a professional.
- **Effort:** small for the text, but needs decisions.

### I7. "Instagram per chi è già stato tuo ospite" (i)
- **Where:** `index.html:90`, `come-lavoriamo.html:54`.
- **Problem:** showing ads to past guests means either uploading their contacts to Meta (that needs their consent, and Airbnb hides guests' emails anyway) or a Meta pixel on the Lodgify page (that needs a cookie banner on the owner's page).
- **Why it matters:** a lawyer will ask how it is done. An owner may assume Simon will use their guest list.
- **Fix:** Simon to say what is actually planned. Then describe it truthfully, and mention the consent or cookie banner on the owner's booking page where it applies.
- **Effort:** small (text), plus a decision.

### I8. Alloggiati Web and tourist tax: two different answers (b, rule 6)
- **Where:**
  - `prenotazioni-dirette-torino.html:72`: "Sulle prenotazioni dalla tua pagina **li impostiamo noi** in Lodgify". Read literally, Simon sets up the CIN, Alloggiati Web and the tourist tax.
  - `domande.html:62`: "restano adempimenti tuoi, come oggi: li impostiamo nella pagina".
- **Problem:** the two answers differ. Sending guest data to Alloggiati Web is guest handling, which is not offered (rule 6). It is also not clear that Lodgify can do it.
- **Fix:** one sentence used everywhere, saying exactly what is set up (for example, the tourist tax inside the price) and that the filings stay with the owner. Simon to confirm what Lodgify actually does.
- **Effort:** small.

### I9. The questionnaire loses keyboard focus and misses the key question (a, f)
- **Where:** `site.js:215-260`.
- **Problems:**
  - After each answer the card is rebuilt and focus falls back to the page (tested: `BODY`). A keyboard or screen-reader user must start again from the top.
  - `aria-live` sits on the whole card, so everything is read out again.
  - The progress bar shows 25% before the first answer.
  - "Più di 10" units gets no mention of the custom price.
  - There is no question on stay value (see I1).
- **Fix:**
  - Move focus to the new question title.
  - Keep `aria-live` for the result only.
  - Add the stay-value question.
  - Tune the result texts.
- **Effort:** small.

### I10. Dates that are already stale or will be (c)
| Where | Text | Goes stale |
|---|---|---|
| `site.js:80-88` | countdown banner | **tomorrow** (C5) |
| `domande.html:55` and `:28` (structured data) | "Cosa **cambia** il 13 ottobre?", "Airbnb **passa**…" | now; should read "è cambiato", "è passata" |
| `commissioni-airbnb-booking.html:45` | "Dal 13 ottobre 2026 Airbnb **passa** alla commissione unica" | now |
| `index.html:174`, `come-lavoriamo.html:97`, `prenotazioni-dirette-torino.html:99`, `domande.html:56`, `domande.html:28` | "entro il 30 novembre 2026" | 1 December 2026: becomes a false offer |
| `come-lavoriamo.html:57` and `:70` | "conviene partire entro metà novembre", "chi parte a metà novembre misura le feste" | mid-November |
| every footer | "© 2026" | 1 January 2027 |
| `sitemap.xml` | `lastmod` 2026-10-08 | at every change |
| `commissioni-airbnb-booking.html:152` | "Consultate tra il 6 e l'8 ottobre 2026" | does not expire, but the sources must be checked again before launch |
| phone mock-up, `index.html:105-131` | "settembre", "12–15 settembre" | seasonal only; marked as an example; can stay |

- **Fix:**
  - Past tense now.
  - For 30 November: a calendar reminder for Simon, plus one sentence in the README listing the 5 places to change.
  - Optionally, a tiny script that swaps the trial box to "offerta chiusa il 30 novembre" after the date, so the page never shows an expired offer even if Simon forgets.
- **Effort:** small.

### I11. The same blocks are copied across pages (d)
- **What is copied:**
  - The header on 7 pages, the footer on 8, the form on 5.
  - The price block on 3 (`index`, `come-lavoriamo`, `prenotazioni-dirette-torino`).
  - The FAQ text twice (visible, and in the structured data).
  - The same `<head>` lines on 8 pages.
- **Problem:** changing the price means editing about 12 places. Missing one creates exactly the inconsistency a sceptical owner notices.
- **Fix, keeping "no build step":**
  1. Keep the full price block on the home page only. Other pages get one price line and a link.
  2. Add a "where every repeated thing lives" table to the README, with a `grep` command to check them all in one go.
  3. Drop the FAQ structured data (see N8), or keep it and add it to that table.
- **Effort:** medium.

### I12. About 25% of the CSS is unused, and rules override each other (d)
- **Unused:**
  - 31 classes left over from versions 1–4: `.scena*`, `.mani*`, `.conto-tab`, `.tab-scorri`, `.conto-dopo`, `.perchi`, `.didascalia-foto`, `.fermati-lista`, `.posta`, `.contatti .altro`, `.affianca`, `.lettura`, `.anno*`, `.conto-voci`, `.da-completare`, `.testata--sopra`, `.marchio em`, `.grafico .l-piatt/.l-dir/.risparmio/.pareggio/.cursore`.
  - That is about **8,5 KB of the 34 KB** file.
- **Defined twice, the second one winning:**
  - `:focus-visible` (lines 27 and 425)
  - `.hero2-prezzo strong` (332 and 435)
  - `.ruota-centro` (348 and 416)
  - `.comando input[type=range]` height (228 and 428)
  - `.conto-esito` (362 and 461)
- **Fix:** delete the unused rules and merge the duplicates, with no visual change. Check at 360 and 1280 before and after.
- **Effort:** small.

### I13. Values written in two places in the JavaScript (d)
- **Where:**
  - `site.js:119-121`: the home calculator hard-codes 15% (direct share), 10% (filled nights) and 3 € a day per unit. The HTML text at `index.html:192` repeats them. These should be constants next to `FISSO` and `PCT`.
  - `site.js:82`: the date is hard-coded (removed with C5).
  - `site.js:117`: units capped at 60, while the slider stops at 20.
  - Chart range 200–4.000 €.
  - The brief mentions an `EMAIL` constant. **It does not exist:** the README says there is no email "per scelta". To be provided by Simon (C1).
- **Fix:** constants at the top. HTML text that repeats them goes in the README check table (I11).
- **Effort:** small.

### I14. Accessibility gaps (f)
- **Menu:** Escape does not close it (tested). The label stays "Menu" when open. Three navigations share the label "Pagine" (desktop, mobile, footer).
- **Form:**
  - The error message is not linked to the field (`aria-invalid` and `aria-describedby` are missing).
  - The help text "Basta uno dei due" is not linked to the phone and email fields.
- **Tap targets under 44 px:**
  - platform buttons in the commissions calculator: 40 px;
  - VAT checkbox: 22 px (its label row is clickable, which helps);
  - "Indietro" / "Ricomincia" in the questionnaire: about 24 px;
  - header "Parliamone": 40 px.
- **Screen readers:** `aria-live` on both calculator result panels reads every number again on every slider step.
- **Contrast** (computed):
  - ivory on bordeaux: 9,7:1 ✓
  - text grey on ivory: 5,5:1 ✓
  - form placeholder: 4,5:1 (borderline ✓)
  - **brass on ivory: 2,7:1 ✗**. Today brass is only used for lines and borders on light backgrounds, which is fine. It must never be used for text on ivory.
  - **brass on black: 6,4:1 ✓** (hero, wheel).
  - **Chart threshold label `#A27B3F` on white: 3,9:1 ✗** (12–13 px text).
- **Fix:** each item is a few lines.
- **Effort:** small.

### I15. Chart colours outside the palette (f, design)
- **Where:** `site.js:156` and `commissioni-airbnb-booking.html:83, 87, 91`: bright red `#D3362D` and blue `#2457E6`.
- **Problem:** the chart is the only place where the palette breaks. The old on-palette styles are still in the CSS, unused.
- **Fix, Simon to choose:**
  - (a) keep red and blue for readability; or
  - (b) black solid line for the platform, bordeaux for the owner's page, brass dashed line for the threshold, with a darker label so it passes contrast. Bordeaux and black are both dark, so a dashed line would carry the difference for colour-blind visitors.
- **Effort:** small.

### I16. Text that sounds machine-made (h; flagged only, no rewrite until Phase 3)
- **Triplets everywhere** (the commonest AI tell):
  - "Date libere, prezzo completo, condizioni chiare."
  - "Foto vere, prezzo chiaro, date libere."
  - "Pulizie, lenzuola, consumi."
  - "cosa è arrivato, cosa è costato, cosa resta"
  - "Su Instagram, su Google, da un amico."
  - "Il centro, la Crocetta, San Salvario"
  - "Prezzi, disdetta, Lodgify…"
  - plus the three-item lists in "Sì, se" and "No, se".
- **Slogan lines:**
  - "La parte che conta. Ed è tua." (`ruota.js:14`)
  - "Tre cose, e nient'altro."
  - "Un prezzo, scritto qui." (fine once; it appears on 3 pages)
- **Stock phrases:**
  - "vale la pena fare il conto" (banner)
  - "Ti diciamo con franchezza" (`come-lavoriamo.html:109`)
  - "è lì che lavoriamo di più" (`prenotazioni-dirette-torino.html:68`, a claim with nothing behind it)
  - "Torino ha i suoi picchi tra fiere ed eventi; le Langhe vivono l'autunno del tartufo…" (brochure tone)
- **Repetition:**
  - "quanto ti resta" ×6: page title, two buttons, two headings, thanks page.
  - "Parliamone, quindici minuti" ×3.
  - "così la stessa notte non si vende due volte" ×3.
- **Unclear sentences:**
  - "collegata ai suoi calendari" (`index.html:48`): whose? Airbnb's.
  - "Prima pagavi il 3%" (fact strip): true only for hosts who were on the split fee.
- None of the generic phrases named in the brief ("soluzioni su misura", "a 360 gradi", "il partner ideale") appear. "Prezzo su misura" is fine.

### I17. Numbers not explained in plain words (h)
- **15,5% against 3%:** never shown in euros. On a 1.500 € stay: before, Airbnb kept 45 € from the host; now 232,50 €. That one line is the strongest argument the site has.
- **Our 1,5%:** on a 1.500 € direct booking it is 22,50 €. Never shown.
- **"il 15,5% pesa per circa il 18,9%"** (`commissioni…:137`): needs "con l'IVA al 22% sopra la commissione".
- **"Per ogni euro che ci paghi, te ne restano 2,2":** in addition, or in total? (see C8).
- **Fix:** Phase 3.

### I18. The ad mock-up is not marked as an example (rule 3)
- **Where:** first phone screen, `index.html:103-106` ("Casa in collina · Sponsorizzato", with a real-looking photo).
- **Problem:** screens 2 and 4 say "Esempio" and "numeri inventati". Screens 1 and 3 say nothing, so screen 1 could be read as a real client's ad.
- **Fix:** an "Esempio" label on every screen.
- **Also, to be provided by Simon:** the licence or source of `calice`, `colazione` and `galleria-subalpina`.
- **Effort:** small.

### I19. Links and canonical addresses do not match; launch list wrong for two pages (g)
- **Links vs canonical:** canonical addresses, `og:url` and the sitemap use addresses without `.html` (`/commissioni-airbnb-booking`). Every internal link uses `.html`. That only works cleanly if Netlify's "Pretty URLs" setting is on. **Simon to confirm.** Otherwise make the links match.
- **Launch list:** README item 1 says to remove `noindex` from *every* page. `grazie.html` and `404.html` must keep it after launch. See the launch list below.
- **Effort:** small.

### I20. The 15,5% fact: two details to state precisely (b)
- **Checked:** independent sources agree on 13 October 2026, the EEA and Switzerland, and "most hosts pay 15,5%, some 14–16%". The site already says this on the commissions page.
- **Two details:**
  1. The fact strip "Prima pagavi il 3%" (`index.html:67`) drops the "for most hosts" caveat. Some professional hosts were already on the host-only fee.
  2. Airbnb charges the 15,5% on the booking subtotal: nights plus cleaning fee, excluding taxes. The calculator says "Tutte le notti insieme, senza tasse", which leaves the cleaning fee out.
- **Fix:** one word each. Simon should also check the figure on Airbnb's own Help Center before launch, since the sources above are third parties.

---

## NICE-TO-HAVE

### N1. Images (e)
- **`galleria-subalpina.webp`, 1600 px, 312 KB:**
  - Most phones get this file (360 css px × 3 dpr picks the 1600 version).
  - Fix: add a 1200 px version and recompress at about quality 70, to about 120–150 KB.
  - Width and height are set, so there is no layout shift.
- **`calice.webp` 54 KB and `colazione.webp` 67 KB:**
  - They show at about 270 css px (540 px at 2×), so their current size (640 × 960 and 800 × 600) is right.
  - Recompressing would take them to about 30–40 KB each.
- **Format:** the `image-set()` fallback to JPEG is correct.
- **Effort:** small (one-off conversion; no npm).

### N2. Weight today, and a proposed budget (e)
Home page today, as transferred (gzip):

| Item | Size |
|---|---|
| HTML | 5,7 KB |
| CSS | 8,1 KB |
| site.js | 7,2 KB |
| ruota.js | 2,6 KB |
| Fonts | 76 KB |
| Images | about 121 KB |
| **Total** | **about 221 KB** |

That is light. It loads one CSS file (no external ones), scripts are `defer`, and both fonts are preloaded. Proposed budget, so it stays light:

| Item | Budget |
|---|---|
| Home page, total transfer | ≤ 250 KB |
| CSS + JS (gzip) | ≤ 25 KB (today 18 KB; +3 KB allowed for Phase 4) |
| Fonts | ≤ 80 KB |
| Images per page | ≤ 150 KB (home) / ≤ 200 KB (Torino page) |
| Third-party requests | 0 |
| Layout shift | < 0,05 |

### N3. Bodoni font could be lighter (e)
- **Where:** `bodoni-moda.woff2`, 46 KB, a variable font covering weights 400–900.
- **Problem:** the site only ever uses weight 400.
- **Fix:** a static 400-only file, subset to Italian characters, would be about 20–25 KB. It needs a one-off conversion with a desktop tool (fonttools); nothing is added to the site.
- **Effort:** medium.

### N4. The wheel could run lighter without changing how it looks (e)
- **Where:** `ruota.js:89-98`.
- **Problem:** for each of about 1.400 line segments, on every frame for about 4 seconds, it builds a new colour array and colour string. That is fine on a laptop, but can stutter on a cheap phone right while the visitor reads the headline.
- **Fix:** work out the colour once per branch per frame. Same drawing, less work, nothing heavier.
- **Effort:** small.

### N5. A Netlify `_headers` file (d, g)
- **What it is:** one plain text file, no build step.
- **What it would add:**
  - `X-Robots-Tag: noindex` for the whole site, a second lock on top of the meta tag. It also covers images and the zip if they are ever published.
  - Basic security headers: `Content-Security-Policy` allowing only the site itself, `Referrer-Policy`, `X-Content-Type-Options`, `Permissions-Policy`.
  - Long caching for fonts and images.
- **Effort:** small.

### N6. Comments visible in the page source (i)
- **Where:**
  - "AL LANCIO: togli questa riga" on 7 pages.
  - "DA COMPLETARE PRIMA DEL LANCIO: nome e cognome…" (`privacy.html:51`).
  - The credit to Simon's brother (`ruota.js:1`).
- **Problem:** harmless, but a lawyer who views the source sees "to be completed".
- **Fix:** move these notes to the README.
- **Effort:** small.

### N7. Small code tidy-ups (d)
- **Inline styles:** `style="margin-top:…"` in 8 places.
- **Scope:** `data-out-full` is searched in the whole page instead of its own block.
- **Chart redraws:** the chart redraws whenever its box changes *height*, not only width.
- **Mobile menu link:** "Parliamone" points to `#contatti`, but `privacy.html` and `grazie.html` have no form, which is why they link to `index.html#contatti`. That is correct; keep it.
- **Effort:** small.

### N8. Structured data (g)
- **Organization:** truthful. It contains "chi affitta" (see I3) and the Netlify address.
- **FAQPage:** a copy of the visible FAQ. Since 2023 Google shows FAQ rich results only for government and health sites, so it brings almost nothing and doubles the upkeep. It also already needs editing (I10).
- **Suggestion:** remove the FAQPage block, keep Organization.
- **Effort:** small.

### N9. The commissions chart without JavaScript (d)
- **Problem:** with JavaScript off, the chart and both receipt columns are empty boxes. The `<svg>` also has no size until the script runs. Layout shift measured 0 here, but a slow phone could show a jump.
- **Fix:** give the `<svg>` a starting size, and add a `<noscript>` line with the 1.500 € example in numbers.
- **Effort:** small.

### N10. The thanks page could prepare the call (a)
- **Where:** `grazie.html`.
- **Idea:** "Per la chiamata tieni a portata di mano: numero di unità, prezzo medio a notte, notti prenotate l'anno scorso". The call gets shorter, and the visitor feels the next step is concrete.
- **Effort:** small.

---

## Consistency check (b)

**Price and terms, page by page**

| Claim | Home | Il conto | Come lavoriamo | Torino | Domande / FAQ data | Meta / OG | site.js |
|---|---|---|---|---|---|---|---|
| 68 € al mese + 1,5% | ✓ | ✓ (`:141`) | ✓ | ✓ | ✓ | ✓ home; ✓ come-lavoriamo | ✓ `FISSO`, `PCT` |
| 1,5% only on the owner's page | ✓ | ✓ | ✓ | ✓ | ✓ | – | ✓ (also charged on "filled nights", which the model treats as direct bookings: consistent) |
| 34 € + 0,75%, start by 30 Nov 2026 | ✓ (price box); hero says "60 giorni a metà prezzo" without the date | – | ✓ box; "La prova: 60 giorni" text has no date | ✓ | ✓ | "Prova a metà prezzo" (home) and "a metà prezzo" (come-lavoriamo), no date | ✓ first year = 2 months at half fixed fee and half % |
| 30 days' notice | ✓ (price note) | – | ✓ | ✓ | ✓ | – | – |
| 15,5% from 13 Oct 2026 | ✓ | ✓ | – | – | ✓ (tense, I10) | ✓ commissioni, domande | ✓ `COMM` |
| Lodgify "da circa 33 €" | ✓ | – | ✓ | ✓ | ✓ | – | **missing from the calculation** (C6) |
| "Impostazione inclusa" | ✓ | – | ✓ | ✓ | – | – | – |

**Other mismatches**
- **Home example** (`index.html:178`: "il piano circa 95 € al mese… le piattaforme trattengono circa 1.270 €"): recomputed with the site's own model as 94,7 € and 1.273 €. ✓
- **Phone mock-up report:**
  - 744 € = 15,5% of 4.800 € ✓
  - 144 € = 3% ✓
  - 140 € = 68 € + 1,5% × 4.800 € ✓
  - It leaves out Lodgify (C6).
- **Alloggiati Web / tourist tax:** two different answers (I8).
- **Booking.com "circa 15%":** the same everywhere. ✓
- **Ad cost:**
  - The single-booking calculator assumes 70 € per booking.
  - The yearly model assumes 3 € a day per unit.
  - With the defaults these match (about 70 € per booking) only if the ads are credited for *both* the returning guests and the filled nights.
  - If only the filled nights count, it is closer to 220 € per booking (assuming stays of 3 nights).
  - A plain-words note on the commissions page would help.

**Banned wording**

| Rule | Found |
|---|---|
| 1, "senza / zero commissioni" | 6 exact, 3 variants (C2) |
| 2, "affittare" for the service | none for the service; 6 uses for the owner (I3) |
| 6, services not offered | photo, keys, cleaning and guests are only mentioned as **not** offered ✓. "Rimettiamo in ordine le foto che hai già" is listing work, which is offered ✓. Alloggiati Web wording is borderline (I8) |
| 3, promises | 6 places (C8) |

---

## Before launch: remove or change (g)

1. `<meta name="robots" content="noindex">`: remove on `index`, `commissioni-airbnb-booking`, `come-lavoriamo`, `prenotazioni-dirette-torino`, `domande` and `privacy`. **Keep it on `grazie.html` and `404.html`.** If N5 is applied, also remove the `X-Robots-Tag` header.
2. The domain `fantastic-bombolone-9636cc.netlify.app`. It appears in canonical, `og:url` and `og:image` on 7 pages, in the structured data (`index.html:28`), in `sitemap.xml` (5 times) and in `robots.txt`.
3. Controller details in `privacy.html` and the footer (C1). Have the privacy text reviewed by a professional.
4. `WHATSAPP` in `site.js:5`, and an email if Simon wants one. Neither exists today.
5. The "AL LANCIO" and "DA COMPLETARE" comments (N6).
6. The 30 November offer: dated, and with a plan for 1 December (I10).
7. Check that `README.md`, the internal tool, the previews and `sito.zip` are not published (C7).
8. Netlify: form email notification switched on, and Pretty URLs on (C4, I19).
9. Check the facts once more: Airbnb Help Center for the 15,5%; Lodgify's Italian price list and any booking fee (C6, I20).
10. The renaming to "Solen" is a separate job and is not part of this list.

---

## To be provided by Simon (rule 8: nothing invented, placeholders left as they are)

- Name, or company name.
- A photo (optional, but it helps a lot).
- Partita IVA, and the tax regime. That decides whether 68 € is shown "+ IVA".
- Email and/or phone or WhatsApp number.
- Address for the privacy notice.
- Licence or source of the three photos.
- Lodgify: the exact plan, its monthly price in euros, and whether it charges a fee on direct bookings.
- Which folder Netlify publishes. Whether form notifications are on. Whether Pretty URLs is on.
- The final domain.
- What the 1,5% is calculated on, and how it is invoiced. How the trial ends against the 30 days' notice. What "inizia entro il 30 novembre" means.
- How Instagram/Meta ads will reach past guests (I7).
- What exactly is set up in Lodgify for the tourist tax and Alloggiati Web (I8).
- A terms-of-service text, to be reviewed by a professional.

## Privacy notice: what is incomplete (rule 9; listed only, wording not touched)

- The data controller is not identified (name, address, VAT number, contact).
- Rights requests can only be sent through the form. There is no email or postal address.
- Netlify, Inc. is a US company. The notice does not mention transfer outside the EU or the safeguards used.
- Netlify's server logs (IP addresses) and any spam filtering on form submissions are not mentioned. Simon to check what Netlify actually does.
- It does not say how long data is kept once someone *becomes* a client.
- It does not say whether giving the data is optional, or what happens if it is not given.
- There is no date or version.
- The cookie sentence is accurate today. It becomes false the moment any pixel or tag is added; the README already notes this.

---

## The 10 changes that would raise conversions the most (ranked)

1. **Put a real person behind the site (C1).** A name, a face, a VAT number and a phone number. For a sceptical owner of a valuable home this comes before any argument. Today the site asks for trust and offers nobody to trust.
2. **Make the next step visible on the phone's first screen (C3).** Show the sticky bar as soon as the hero button scrolls away, shorten the hero, and cut "Il viaggio" from 5 screens to 1 on phones. Today there is no button for 1.450 px, and the price is on screen 10.
3. **Speak to the actual client (I1).** Say "stays from about 1.500 €, two or more units, or a villa". Use examples at that level, which is where the numbers are clearly in the owner's favour. The visitor recognises themselves in the first line.
4. **Show the 15,5% in euros on a 1.500 € stay (I17).** "Prima 45 €, ora 232,50 €" in the hero. One concrete line does more than the whole fact strip.
5. **Reorder the home page (I4):** problem → your number → offer → price → proof → contact. The visitor reaches their own number on screen 2, not screen 12.
6. **Buttons that say what happens (I5):** "Scrivici: ti richiamiamo entro un giorno lavorativo, 15 minuti, gratis". Pre-fill the form from "Inizia la prova". Less uncertainty means more clicks.
7. **Calculator numbers an owner can check (C6):** Lodgify included, estimates labelled as estimates, the solid and uncertain parts shown separately. Trust is the product here: one hidden cost found by the owner undoes the rest.
8. **State the terms in full (I6):** IVA, what the 1,5% is calculated on, how the trial ends. Owners and their commercialisti ask these on the first call. Answering on the page removes a reason to wait.
9. **Fix tomorrow's banner and the promise sentences (C5, C8).** A false sentence about the owner's invoice, or "notti piene", is exactly what makes a sceptic close the tab.
10. **Say "pubblicità", not "annunci", for ads (I2).** Owners currently read "annunci migliori" as "better listings" and misunderstand two thirds of the offer.

Reliability fixes that are not "conversion" but must happen anyway: **C4** (empty form sends, lead notifications) and **C7** (internal notes possibly public).

---

### Sources used for the fact checks
- [VRM Intel: Airbnb's Host-Only Fee Reaches Europe on October 13](https://vrmintel.com/airbnb-eu-host-only-fee-october-13-deadline/)
- [Lodgify blog: Airbnb Host Fees 2026](https://www.lodgify.com/blog/airbnb-host-fees/)
- [Fybroo: Airbnb and Booking.com host fees in 2026](https://fybroo.com/en/airbnb-and-booking-host-fees)
- [Hospitable: Split Fee vs Host-Only Fee](https://help.hospitable.com/en/articles/4703232-airbnb-service-fees-split-fee-vs-host-only-fee)
- [Tabivista: Airbnb Host Service Fee 2026](https://www.tabivista.com/blog/airbnb-host-fees-2026/)
- [Roommaster: Lodgify Pricing 2026](https://www.roommaster.com/blog/lodgify-pricing)
- [Capterra: Lodgify Pricing](https://www.capterra.com/p/131924/Lodgify/pricing/)
- [CostBench: Lodgify hidden costs](https://costbench.com/software/vacation-rental-software/lodgify/hidden-costs/)
