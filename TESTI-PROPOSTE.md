# TESTI-PROPOSTE — Round 1

Phase 3, round 1 of 2. 13 October 2026.

**Nothing here is applied.** No page, script or image was edited in this phase. Simon approves line by line; only approved lines get applied, in a later step.

**Round 1 covers:**
- `index.html`;
- the calculators and the questionnaire in `assets/site.js`;
- the wheel texts in `assets/ruota.js` (they show on the home page);
- `commissioni-airbnb-booking.html`.

Findings covered: C2, C8, I1, I2, I3, I5, I7, I8, I16, I17, I20.

**Round 2 (after Simon's "go"):**
- the pages `come-lavoriamo.html`, `prenotazioni-dirette-torino.html`, `domande.html` and `grazie.html`;
- titles, meta descriptions and Open Graph texts of every page;
- the "metà novembre" lines;
- the words written inside `images/condividi.jpg`.

**How to approve.** Reply with the IDs, e.g. "OK R1-04, R1-06; no R1-17; R1-21 with this change: …". Where a proposal has options, say which.

**Format of each change.** ID · file:line · finding. Then **Ora** (exact current text), **Proposta**, and **Perché** (one line on why it is better). Line numbers refer to the files as committed at `69e648e`.

**"In attesa".** Marks lines that need a decision or a figure from Simon first: the Lodgify plan, the C6 cost labels, and the I6 terms. Those are listed, not drafted (section 6).

## Numbers used in this file

All numbers come from the site's own model in `assets/site.js`, the same formulas the calculators use.

| | |
|---|---|
| Airbnb on a 1.500 € stay | 15,5% = **232,50 €**. Before, for most hosts: 3% = **45 €** |
| With 22% IVA on the commission | 232,50 + 51,15 = **283,65 €**, which is 18,9% of 1.500 € |
| Our 1,5% on 1.500 € | **22,50 €** |
| One booking on the owner's page, 1.500 € stay (site's estimates) | payment 3% = 45 € + advertising ≈ 70 € + our 1,5% = 22,50 € → **137,50 €**, against 232,50 € on Airbnb. Difference **95 €**, before the 68 € a month. |
| Same at 1.000 € | 115 € against 155 € → difference **40 €** |
| Where the owner's page starts to pay, per booking | 70 € ÷ (15,5% − 3% − 1,5%) = 70 € ÷ 11% = **636 €** → rounded to **650 €**. At 650 €: Airbnb 100,75 €, own page 99,25 €, practically even. |
| How many direct bookings cover the 68 € a month | at 1.500 €, 68 ÷ 95 ≈ 0,7 → **about one a month**. At 1.000 €, 68 ÷ 40 ≈ 1,7 → **about two a month**. |

---

## 1. index.html

### 1.1 Page head (only the C8 lines; meta description and Open Graph description go in round 2)

**R1-01** · `index.html:6` (`<title>`) · C8
- **Ora:** «Ospite | Prenotazioni dirette e notti piene, a Torino»
- **Proposta:** «Ospite | Prenotazioni dirette per case e ville a Torino e in Piemonte»
- **Perché:** «notti piene» is a promise; the new title says what the service is and for whom.

**R1-02** · `index.html:14` (`og:title`) · C8
- **Ora:** «Ospite | Prenotazioni dirette e notti piene, a Torino»
- **Proposta:** «Ospite | Prenotazioni dirette per case e ville a Torino e in Piemonte»
- **Perché:** same as R1-01; the text shown when the link is shared on WhatsApp must not promise either.

**R1-03** · `index.html:28` (structured data, `description`) · I2, I3
- **Ora:** «Pagina di prenotazione diretta, annunci e prezzi migliori per chi affitta case e appartamenti a Torino e in Piemonte.»
- **Proposta:** «Pagina di prenotazione diretta, pubblicità su Google e Instagram e cura delle schede Airbnb e Booking, per chi ospita in case e ville a Torino e in Piemonte.»
- **Perché:** «annunci» read as "listings"; «chi affitta» goes (rule 2); the three parts of the service are named.

### 1.2 Hero

Measured on a throwaway copy of the site (not the real pages), with R1-04, R1-06, R1-07, R1-08, R1-09 and R1-10 applied together:
- at **360 px** the first button ends at **718 px** (today 724);
- at **1280 px** it ends at **729 px** (today 732);
- no sideways scrolling.

So the 1.500 € example fits without pushing the button down.

**R1-04** · `index.html:45` (kicker above the title) · I1, I3
- **Ora:** «Per chi affitta case e appartamenti a Torino e in Piemonte»
- **Proposta:** «Due o più case, o una villa, a Torino e in Piemonte. Soggiorni da 1.500 € in su.»
- **Perché:** the owner recognises themselves in the first line: what they own, where, what a stay is worth. «affitta» goes.
- *Longer option:* «Per chi ospita a Torino e in Piemonte: due o più case, o una villa, con soggiorni da 1.500 € in su.» It takes one more line on a phone and pushes the button down 51 px, so I recommend the short one.

**R1-05** · `index.html:46` (`<h1>`) · no change
- **Ora:** «L'ospite che torna da te ti costa il 15,5%.»
- **Proposta:** keep as it is.
- **Perché:** it is the hook, it is true, and it is also in `og:image:alt` and inside `condividi.jpg`. The euro example right under it (R1-06) makes it concrete.

**R1-06** · `index.html:47` (dated banner; same text on `commissioni-airbnb-booking.html:46`) · I17, I20
- **Ora:** «Il 13 ottobre 2026 Airbnb è passata al 15,5% sulle nuove prenotazioni, per la maggior parte degli host europei.»
- **Proposta:** «Il 13 ottobre 2026, per la maggior parte degli host europei, Airbnb è passata al 15,5% sulle nuove prenotazioni: su un soggiorno da 1.500 € sono 232,50 €, contro i 45 € di prima (3%).»
- **Perché:** the percentage becomes an amount the owner recognises. The C5 wording stays: date, past tense, «sulle nuove prenotazioni», «per la maggior parte degli host».

**R1-07** · `index.html:48` (lead) · C8, I16, rule 1
- **Ora:** «Ti costruiamo la pagina dove i tuoi ospiti prenotano senza passare da Airbnb, collegata ai suoi calendari. Poi la riempiamo, e misuriamo quanto ti resta.»
- **Proposta:** «Costruiamo la tua pagina di prenotazione, collegata ai calendari di Airbnb e Booking, e la facciamo conoscere con la pubblicità.»
- **Perché:** it describes the work, not an outcome («la riempiamo» was a promise). «ai suoi calendari» (whose?) becomes explicit. «senza passare da Airbnb» described what is avoided; now it says what the page is.

**R1-08** · `index.html:49` (price in the hero) · I17. Note: what the 1,5% is calculated on is still in attesa (I6).
- **Ora:** «68 € al mese più l'1,5%, solo sulle prenotazioni fatte sulla tua pagina. I primi 60 giorni a metà prezzo, e se i conti non tornano te lo diciamo prima di iniziare.»
- **Proposta:** «68 € al mese più l'1,5% delle prenotazioni fatte sulla tua pagina: 22,50 € su 1.500 €. I primi 60 giorni a metà prezzo.»
- **Perché:** the 1,5% gets its amount, on the same 1.500 € stay as the banner above. The honest line («se non conviene…») moves under the buttons (R1-10), where it answers "what happens if I call".

**R1-09** · `index.html:51` and `:52` (the two hero buttons) · I5, I16
- **Ora:** «Parliamone, quindici minuti» · «Vedi quanto ti resta»
- **Proposta:** «Chiedi una chiamata» · «Fai il conto: tre numeri»
- **Perché:** each button says what you do. The second says what it costs you in effort (three numbers) and drops one of the six «quanto ti resta».

**R1-10** · `index.html`, new line right after the buttons (after line 54) · I5, rule 5
- **Ora:** —
- **Proposta:** «Una chiamata di 15 minuti, gratuita. Ti richiamiamo entro un giorno lavorativo; se non conviene, te lo diciamo lì.»
- **Perché:** what happens, how long, what it costs, and the honest verdict, in two short sentences.
- **Simon to confirm:** that the first call is free («gratuita»).

### 1.3 The wheel (`assets/ruota.js`, shown in the home hero)

**R1-11** · `ruota.js:11` («Scopre») · I16
- **Ora:** «Su Instagram, su Google, da un amico.»
- **Proposta:** «Da un amico che c'è già stato, o cercando una casa su Google.»
- **Perché:** breaks the triplet; two concrete ways a guest finds a house.

**R1-12** · `ruota.js:12` («Sceglie») · I16
- **Ora:** «Foto vere, prezzo chiaro, date libere.»
- **Proposta:** «Vede le date libere e il prezzo finale, pulizie comprese.»
- **Perché:** one sentence with a subject instead of three slogans; «pulizie comprese» is a fact an owner can check.

**R1-13** · `ruota.js:13` («Prenota») · I17
- **Ora:** «Qui la piattaforma trattiene il 15,5%.»
- **Proposta:** «Se prenota su Airbnb, qui Airbnb trattiene il 15,5%: 232,50 € su 1.500 €.»
- **Perché:** the number in euros, and it says the cost applies only when the booking goes through Airbnb.

**R1-14** · `ruota.js:14` («Soggiorna») · I16, rule 4
- **Ora:** «La parte che conta. Ed è tua.»
- **Proposta:** «Il soggiorno lo segui tu, come oggi. Noi non gestiamo chiavi né pulizie.»
- **Perché:** the slogan becomes a fact, and it repeats what is not offered.

**R1-15** · `ruota.js:15` («Ricorda») · I16
- **Ora:** «Se è andata bene, lo racconta.»
- **Proposta:** «Se si è trovato bene, si ricorda il nome della casa.»
- **Perché:** concrete. The name is what brings a guest back to the owner's page.

**R1-16** · `ruota.js:16` («Ritorna») · I16
- **Ora:** «E prenota di nuovo. Da te, questa volta.»
- **Proposta:** «Se trova la tua pagina, la volta dopo prenota da te.»
- **Perché:** it states the condition («se trova la tua pagina») instead of implying it always happens.

**R1-17** · `index.html:63` (wheel text without JavaScript)
- **Ora:** «Scopre, sceglie, prenota, soggiorna, ricorda, ritorna. Ogni volta che torna, la piattaforma trattiene il 15,5%.»
- **Proposta:** «Scopre, sceglie, prenota, soggiorna, ricorda, ritorna. Se ogni volta prenota su Airbnb, ogni volta Airbnb trattiene il 15,5%.»
- **Perché:** the 15,5% applies only to bookings made through Airbnb; the old line said it applied to every return.

### 1.4 The fact strip under the hero

**R1-18** · `index.html:67` · I16, I20
- **Ora:** «Airbnb, dal 13 ottobre 2026. Prima pagavi il 3%.»
- **Proposta:** «Airbnb, dal 13 ottobre 2026, per la maggior parte degli host. Prima, il 3%.»
- **Perché:** «Prima pagavi il 3%» was false for hosts already on the single fee.

**R1-19** · `index.html:69` · I17
- **Ora:** «il nostro, solo sulla tua pagina, più 68 € al mese»
- **Proposta:** «il nostro, solo sulle prenotazioni dalla tua pagina, più 68 € al mese. Su 1.500 €: 22,50 €.»
- **Perché:** says exactly what the 1,5% is taken on, with the amount.

`index.html:68` («circa 15%» · «Booking.com, di solito») stays.

### 1.5 Short calculator (`#conto`, now right after the hero)

**R1-20** · `index.html:75` (heading) · I16
- **Ora:** «Quanto ti resta in un anno»
- **Proposta:** «Il conto di un anno, con i numeri della tua casa»
- **Perché:** says what the block does, and drops one «quanto ti resta».

**R1-21** · `index.html:76` (intro) · C8
- **Ora:** «Tre numeri della tua casa. Il resto lo stimiamo con ipotesi prudenti.»
- **Proposta:** «Sposta tre cursori. Il resto è stimato con le ipotesi scritte qui sotto, che puoi cambiare nel conto completo.»
- **Perché:** «prudenti» is a judgement nobody can check; the new line says where the assumptions are and that they can be changed.

**R1-22** · `index.html:79–81` (starting values of the sliders, not text) · I1. *Code work, needs approval.*
- **Ora:** 3 unità, 150 € a notte, 60%.
- **Proposta, option A (recommended):** 2 unità, **300 € a notte**, 60%.
- **Proposta, option B:** 1 unità (una villa), **500 € a notte**, 45%.
- **Perché option A:**
  - It matches the first client type in the brief (two or more units).
  - 5 nights at 300 € is the 1.500 € stay used in every example, so the whole site tells one story.
  - It is the less flattering of the two. Estimated yearly result: +5.776 € for A, +7.022 € for B.
- **Honest note:** with either option, most of the estimated gain comes from empty nights getting booked, the least certain assumption. Without it the result is negative: about −838 € (A), −556 € (B). This is finding C6, in attesa (section 6.2). Until it is fixed, the bigger default numbers make the home result look better. Please weigh that before approving R1-22 on its own.

**R1-23** · `index.html:82` (the assumptions line) · C8, I2, I16. The Lodgify cost is still missing from this list: in attesa, C6.
- **Ora:** «Ipotesi: il 15% delle prenotazioni passa alla tua pagina, riempiamo il 10% delle notti vuote, annunci da 3 € al giorno per unità. Già tolti il 3% del pagamento online e il 20% di costo per ogni notte in più. I prezzi migliori non li contiamo. Tutte le ipotesi.»
- **Proposta:** «Le ipotesi: il 15% delle prenotazioni passa alla tua pagina; il 10% delle notti oggi vuote viene prenotato grazie alla pubblicità, che costa 3 € al giorno per unità. Sono già tolti il pagamento online (3%) e, per ogni notte in più, un costo pari al 20% del prezzo. Eventuali prezzi migliori non sono nel conto. Tutte le ipotesi.»
- **Perché:** «riempiamo» was a promise; now every figure reads as an assumption, and «annunci» becomes «pubblicità».

**R1-24** · `index.html:85` and `commissioni-airbnb-booking.html:116` (first result label)
- **Ora:** «Oggi lasci alle piattaforme, in un anno»
- **Proposta:** «Oggi alle piattaforme, in un anno (stima)»
- **Perché:** marks it as an estimate built from three slider values.

**R1-25** · `index.html:86` and `commissioni-airbnb-booking.html:117` (main result label) · C8, C6
- **Ora:** «Con noi ne recuperi, al netto di tutto»
- **Proposta:** «In più per te in un anno: stima, già tolti pubblicità e il nostro piano»
- **Perché:**
  - «ne recuperi» stated an estimate as a fact.
  - «al netto di tutto» was not true, because Lodgify is not subtracted.
  - The new label lists exactly what is subtracted today.
- **In attesa, C6:** when the Lodgify figure is confirmed, add «Lodgify» to this list.

**R1-26** · `assets/site.js:148` (line under the main result) · I17
- **Ora:** «Per ogni euro che ci paghi, te ne restano 2,2.»
- **Proposta:** «Stima: ogni euro che ci paghi ti lascia 2,20 € in più, già tolto quell'euro.»
- **Perché:** says the 2,20 € is in addition and already net of the euro paid, and marks it as an estimate.
- **Code note:** the number would then show two decimals (2,20 instead of 2,2).
- The negative case on the same line («Con questi numeri non ti conviene: te lo diciamo prima.») stays as it is.

**R1-27** · `index.html:88` (calculator buttons) · I5
- **Ora:** «Verifichiamolo sulla tua casa» · «Cambia le ipotesi»
- **Proposta:** «Manda questi numeri» · «Cambia le ipotesi nel conto completo»
- **Perché:** says what the button does (it copies the numbers into the form) and where the link goes.
- **New line under the button:** «Li copiamo nel modulo qui sotto: aggiungi un recapito e ti richiamiamo entro un giorno lavorativo.»

`index.html:87` («Ci paghi, in un anno») and `site.js:149` («Il primo anno, con la prova a metà prezzo: … €.») stay.

### 1.6 «Tre cose»

**R1-28** · `index.html:96` (heading) · I16
- **Ora:** «Tre cose, e nient'altro.»
- **Proposta:** «Cosa facciamo»
- **Perché:** no slogan; the heading says what is underneath.

**R1-29** · `index.html:98` («La tua pagina») · I16
- **Ora:** «La pagina di prenotazione, costruita con Lodgify: il programma che tiene allineati i calendari di Airbnb e Booking, così la stessa notte non si vende due volte.»
- **Proposta:** «La costruiamo con Lodgify. Quando un ospite prenota da te, quelle date risultano occupate anche su Airbnb e Booking; quando prenota lì, si chiudono sulla tua pagina.»
- **Perché:** shows what happens in practice, instead of the same formula repeated three times on the site. (No Lodgify price here, so not in attesa.)

**R1-30** · `index.html:99` («Gli annunci») · I2, I7. Neutral wording; the final text waits for Simon's decision on past guests (section 4).
- **Ora:** «Gli annunci» — «Google per chi cerca casa a Torino, Instagram per chi è già stato tuo ospite. Li paghi tu, direttamente; noi li seguiamo ogni settimana.»
- **Proposta:** «La pubblicità» — «Su Google, per chi cerca una casa a Torino o in Piemonte, e su Instagram. La paghi tu, direttamente a Google e Meta. Noi la impostiamo e ogni settimana guardiamo quanto costa ogni prenotazione.»
- **Perché:**
  - «pubblicità» cannot be confused with the owner's listing.
  - Nothing is said about guest lists.
  - The weekly check is described by what is measured.

`index.html:100` («La tua scheda su Airbnb e Booking» — «Rivediamo i prezzi ogni settimana: proponiamo, decidi tu. Riscriviamo titolo e descrizione e rimettiamo in ordine le foto che hai già.») stays: clear, factual, uses «scheda» correctly.

### 1.7 Price

**R1-31** · `index.html:107` (heading) · I16
- **Ora:** «Un prezzo, scritto qui.»
- **Proposta:** «Quanto costa»
- **Perché:** the plainest heading for the section an owner looks for first.

**R1-32** · `index.html:112` · I17. Note: what the 1,5% is calculated on is in attesa (I6).
- **Ora:** «L'1,5% solo sulle prenotazioni fatte sulla tua pagina. Su Airbnb e Booking non prendiamo nulla.»
- **Proposta:** «L'1,5% solo sulle prenotazioni fatte sulla tua pagina: su un soggiorno da 1.500 €, 22,50 €. Sulle prenotazioni di Airbnb e Booking non prendiamo nulla.»
- **Perché:** the percentage with its amount; «sulle prenotazioni di» says exactly where we take nothing.

**R1-33** · `index.html:115` · I2
- **Ora:** «Annunci su Google e Instagram, seguiti ogni settimana»
- **Proposta:** «Pubblicità su Google e Instagram, seguita ogni settimana (la spesa la paghi tu, a parte)»
- **Perché:** the word for ads, and the reminder that the ad spend is not in the 68 €.

**R1-34** · `index.html:124` («Inizia la prova») → see section 2, I5.

**R1-35** · `index.html:127` (example «Quanto costa davvero») · I1. The Lodgify figure inside stays in attesa.
- **Ora:** «Quanto costa davvero, tutto compreso. Con 3 unità a 150 € a notte e il 60% di occupazione: il piano circa 95 € al mese, gli annunci consigliati circa 270 €, Lodgify da circa 33 €. Oggi, con le stesse case, le piattaforme trattengono circa 1.270 € al mese.»
- **Proposta, option A (recommended, same as R1-22):** «Quanto costa davvero, tutto compreso (stima). Con 2 appartamenti a 300 € a notte e il 60% di occupazione: il nostro piano circa 104 € al mese, la pubblicità consigliata circa 180 €, Lodgify [in attesa]. Oggi, con le stesse case, le piattaforme trattengono circa 1.700 € al mese.»
- **Proposta, option B:** «Quanto costa davvero, tutto compreso (stima). Con una villa a 500 € a notte e il 45% di occupazione: il nostro piano circa 96 € al mese, la pubblicità consigliata circa 90 €, Lodgify [in attesa]. Oggi le piattaforme trattengono circa 1.060 € al mese.»
- **Perché:**
  - The example now uses the client the site is for.
  - The figures are the site's own model: A = plan 1.243 €/year, ads 6 € a day, platforms 20.367 €/year; B = 1.151 €, 3 € a day, 12.729 €.
  - The example is marked as an estimate.
  - Same choice as R1-22, so the example and the calculator agree.

**R1-36** · `index.html:128` (price note) · **in attesa**: Lodgify, C6, I6.
- **Ora:** «Impostazione inclusa. Annunci e Lodgify li paghi tu, direttamente: Lodgify parte da circa 33 € al mese nel piano senza commissioni e cresce con le unità (listino su lodgify.com). Disdici quando vuoi, con 30 giorni di preavviso. Più di 10 unità? Prezzo su misura. Nei primi 60 giorni paghi metà e misuriamo insieme: se i numeri non tornano, te lo diciamo noi.»
- **Proposta:** no text yet.
- **What the final text must do:**
  - remove «nel piano senza commissioni» (rule 1);
  - «Annunci» → «La pubblicità»;
  - add the Lodgify figure once confirmed;
  - add the trial terms once decided (I6).
- **Stopgap, if you want rule 1 met before the Lodgify answer:** delete only the four words «nel piano senza commissioni». No new text is added, so nothing about Lodgify is invented.

### 1.8 «Il viaggio» (the four steps and the phone mock-up)

**R1-37** · `index.html:186` (step 1) · I2
- **Ora:** «Un annuncio con la tua casa, a chi sta organizzando un viaggio a Torino.»
- **Proposta:** «Vede la pubblicità della tua casa mentre organizza un viaggio a Torino.»
- **Perché:** «annuncio» here meant an ad; the guest is now the subject, as in «Ti trova».

**R1-38** · `index.html:187` (step 2) · I16
- **Ora:** «Date libere, prezzo completo, condizioni chiare.»
- **Proposta:** «Sulla tua pagina vede le date libere e il prezzo finale, pulizie comprese.»
- **Perché:** a sentence instead of three labels, and it says where this happens.

**R1-39** · `index.html:189` (step 4) · I16
- **Ora:** «Ogni mese una pagina: cosa è arrivato, cosa è costato, cosa resta.»
- **Proposta:** «Ogni mese ti mandiamo un resoconto di una pagina: quanto hanno portato le prenotazioni dirette e quanto sono costate.»
- **Perché:** breaks the «cosa… cosa… cosa» rhythm and says who sends what.

`index.html:188` (step 3, «Il pagamento arriva a te. Il calendario si aggiorna anche su Airbnb e Booking.») stays.

**R1-40** · `index.html:151`, `:152`, `:163` (phone mock-up: booking and confirmation screens) · I1
- **Ora:** «180 € a notte» · «Totale 540 €» · «Totale pagato 540 €»
- **Proposta:** «500 € a notte» · «Totale 1.500 €» · «Totale pagato 1.500 €» (3 nights, the dates 12–15 settembre stay).
- **Perché:** the example on the phone becomes the same 1.500 € stay used everywhere. It is still labelled «Esempio».

**R1-41** · `index.html:173–179` (phone mock-up: monthly report; it stays «Esempio, con numeri inventati») · C2, I2, I1
- **Ora:**
  - «Prenotazioni dalla tua pagina 6»
  - «Valore 4.800 €»
  - «Notti che erano vuote 5»
  - «Commissioni non pagate 744 €»
  - «Annunci −300 €»
  - «Pagamento online −144 €»
  - «Il nostro piano −140 €»
- **Proposta:**
  - «Prenotazioni dalla tua pagina 4»
  - «Valore 6.000 €»
  - «Notti che erano vuote 5»
  - «Il 15,5% che resta a te 930 €»
  - «Pubblicità −280 €»
  - «Pagamento online −180 €»
  - «Il nostro piano −158 €»
- **Arithmetic:** 6.000 € × 15,5% = 930 €; 4 bookings × 70 € = 280 €; 3% = 180 €; 68 € + 1,5% of 6.000 € = 158 €.
- **Perché:** «Commissioni non pagate» breaks rule 1. The new line says what a direct sale is: the owner keeps the 15,5%. The amounts follow the high-end example.
- *Alternative for the C2 line, if you prefer a plainer comparison:* «Su Airbnb sarebbero stati (15,5%) 930 €».

### 1.9 «Fa per te?»

**R1-42** · `index.html:199` (first «Sì, se» item) · I1, I3
- **Ora:** «affitti almeno una casa con notti vuote, o con ospiti che tornano»
- **Proposta:** «hai due o più case, o una villa, con soggiorni da circa 1.500 € e notti vuote o ospiti che tornano»
- **Perché:** the real client, in their own terms; «affitti» goes.

**R1-43** · `index.html:199` (third «Sì, se» item)
- **Ora:** «preferisci provare due mesi prima di decidere»
- **Proposta:** «vuoi provare 60 giorni a metà prezzo prima di decidere»
- **Perché:** the same figure («60 giorni») as everywhere else, and it reminds the visitor of the half price.

**R1-44** · `index.html:200` (new fourth «No, se» item) · I1, rule 5
- **Ora:** —
- **Proposta:** «i tuoi soggiorni valgono meno di circa 650 €: lì, secondo le nostre stime, la pubblicità costa quanto la commissione che risparmi»
- **Perché:** the honest limit from the site's own numbers (table at the top), stated before the visitor asks.
- **Check against rule 1:** «la commissione che risparmi» is a comparison of two costs, not a «senza commissioni» claim.
- *Stricter alternative if you want to avoid the word «risparmi»:* «i tuoi soggiorni valgono meno di circa 650 €: lì, secondo le nostre stime, una prenotazione dalla tua pagina costa quanto una su Airbnb».

**R1-45** · `index.html:201` · I16, rule 3
- **Ora:** «Non ti ritrovi? Scrivici lo stesso: in quindici minuti ti diciamo se conosciamo qualcuno che fa al caso tuo.»
- **Proposta:** «Non ti ritrovi? Scrivici lo stesso: se non possiamo esserti utili, te lo diciamo subito.»
- **Perché:** «conosciamo qualcuno» promises a network of contacts the site cannot show.

**R1-46** · `index.html:203` (link to the questionnaire) · I5
- **Ora:** «Rispondi a quattro domande»
- **Proposta:** «Fa per te? Cinque domande, un minuto»
- **Perché:** says how long it takes. Five, because of the new question in section 3.

### 1.10 Contact form (the same block is on 5 pages; approving here applies it everywhere)

**R1-47** · `index.html:211`
- **Ora:** «Due righe bastano. Di solito rispondiamo entro un giorno lavorativo.»
- **Proposta:** «Due righe bastano. Ti rispondiamo entro un giorno lavorativo, di solito proponendo una telefonata di 15 minuti.»
- **Perché:** tells the visitor what comes after they press «Invia».

**R1-48** · `index.html:226` (send button) · I5
- **Ora:** «Mandaci due righe»
- **Proposta:** «Invia la richiesta»
- **Perché:** the reply time is already in the line above the form (R1-47); the button says exactly what it does.

The heading «Raccontaci la tua casa.» and the help texts in the form stay. The label «Quante unità» stays, consistent with «Quante unità hai?».

---

## 1b. commissioni-airbnb-booking.html

The IDs continue from section 5 so the earlier numbers do not change. The page title, meta description and Open Graph texts go in round 2. The form is covered by R1-47 and R1-48, and the two result labels by R1-24 and R1-25.

### Opening

**R1-73** · `commissioni-airbnb-booking.html:44` (`<h1>`) · I16
- **Ora:** «Commissioni Airbnb 15,5% e Booking: quanto ti resta»
- **Proposta:** «Commissioni di Airbnb (15,5%) e Booking: il conto, euro per euro»
- **Perché:** drops one of the six «quanto ti resta» and says what the page does.

**R1-74** · `:45` (intro) · I20
- **Ora:** «Fino a ottobre l'host pagava il 3% e l'ospite una commissione separata. Dal 13 ottobre 2026 Airbnb è passata alla commissione unica: il 15,5% lo paga tutto l'host, sulle prenotazioni fatte da quel giorno. Booking.com lavora così da anni, con una percentuale che in Italia di solito si aggira sul 15%.»
- **Proposta:** «Fino a ottobre, per la maggior parte degli host, Airbnb tratteneva il 3% e faceva pagare all'ospite una commissione a parte. Dal 13 ottobre 2026 è passata alla commissione unica: il 15,5% lo paga tutto l'host, sulle prenotazioni fatte da quel giorno. Booking.com lavora così da anni, di solito con circa il 15% in Italia.»
- **Perché:** adds «per la maggior parte degli host» where the 3% appears (I20) and shortens the last sentence. The euro example is not repeated here, because it is in the banner right below (R1-06).

**R1-75** · `:46` (banner) → same text as **R1-06**, so the two pages stay identical (C5).

### «Una prenotazione»

**R1-76** · `:69–70` (stay value: starting value of the slider and its displayed figure) · I1. *Code work, needs approval.*
- **Ora:** slider at 1.000 €, display «1.000 €».
- **Proposta:** slider at **1.500 €**, display «1.500 €».
- **Perché:** the chart opens on the client's typical stay. At 1.500 € it reads «Con la prenotazione dalla tua pagina ti restano 95 € in più», the same figure as the text examples.

**R1-77** · `:71` (help under the stay value) · I20
- **Ora:** «Tutte le notti insieme, senza tasse. Esempio: 4 notti a 250 € fanno 1.000 €.»
- **Proposta:** «Notti più pulizie, tasse escluse: è la base su cui Airbnb calcola il 15,5%. Esempio: 5 notti a 280 € e 100 € di pulizie fanno 1.500 €.»
- **Perché:**
  - It says what Airbnb charges the 15,5% on: nights plus cleaning, excluding taxes.
  - The example matches the new 1.500 € default (5 × 280 € + 100 € = 1.500 €).
  - In attesa, I6: the same slider value is also the base of our 1,5%, which is still to be defined.

**R1-78** · `:74` (slider label) · I2
- **Ora:** «Annunci, per ogni prenotazione»
- **Proposta:** «Pubblicità, per ogni prenotazione»
- **Perché:** I2. The help line under it («Una stima: circa 0,70 € a clic…») stays.

**R1-79** · `:78` (note under the sliders) · I2. The Lodgify part is in attesa (C6).
- **Ora:** «Nel conto: pagamento online (3%, stima) e il nostro 1,5%. I 68 € al mese fissi sono nel conto annuale qui sotto.»
- **Proposta:** «Nel conto ci sono il pagamento online (3%, stima), la pubblicità e il nostro 1,5%. I 68 € al mese del piano sono nel conto annuale, più in basso.»
- **Perché:** lists everything that really is in the comparison (the advertising was missing from the old note), and no more.

**R1-80** · `:81` (text shown without JavaScript) · I2
- **Ora:** «… 45 € di pagamento online (3%), 70 € di annunci e 22,50 € per il nostro 1,5%. …»
- **Proposta:** «… 45 € di pagamento online (3%), 70 € di pubblicità e 22,50 € per il nostro 1,5%. …» (the rest unchanged)
- **Perché:** I2.

**R1-81** · `:84` (chart legend) · I2, I16
- **Ora:** «Dalla tua pagina: pagamento, annunci, nostro 1,5%» · «Quello che ti resta in più»
- **Proposta:** «Dalla tua pagina: pagamento, pubblicità, nostro 1,5%» · «La differenza a tuo favore»
- **Perché:** I2, and one more «ti resta» varied.

**R1-82** · `:93` (receipt row) · I2
- **Ora:** «Annunci»
- **Proposta:** «Pubblicità»
- **Perché:** I2. «Ti restano» in the two receipt columns stays: it is a receipt line, not a slogan.

**R1-83** · `site.js:258` (result line under the chart, when the owner's page costs less) · C8
- **Ora:** «Con la prenotazione dalla tua pagina ti restano 95 € in più.» (the figure changes with the sliders)
- **Proposta:** «Stima: con la prenotazione dalla tua pagina ti restano 95 € in più, prima dei 68 € al mese del piano.»
- **Perché:** marked as an estimate, and it reminds the visitor of the fixed monthly fee, so the comparison is complete.

**R1-84** · `site.js:259` (result line, when the platform costs less)
- **Ora:** «Qui la piattaforma costa meno: 35 € di differenza. Conviene da 640 € in su.» (example values)
- **Proposta:** «Qui costa meno la piattaforma, di 35 €. Secondo queste stime, la tua pagina conviene da 640 € a soggiorno in su.»
- **Perché:** says what «conviene» refers to (the stay value) and that it is an estimate. The honest «non conviene» stays.

### «Su un anno, con il nostro piano»

**R1-85** · `:105` (intro) · I16. Interim wording, true today; the list of costs is in attesa (C6).
- **Ora:** «Due fonti di guadagno, una solida e una da misurare, e tutti i costi dentro. I prezzi migliori non li contiamo.»
- **Proposta:** «Il conto separa due voci: una abbastanza solida, l'altra da misurare con la prova. Dentro ci sono il pagamento online, la pubblicità e il nostro piano. Eventuali prezzi migliori non sono contati.»
- **Perché:** «tutti i costi dentro» was false while Lodgify is missing. The new line lists exactly what is inside.

**R1-86** · `:112` (slider label) · C8
- **Ora:** «Notti vuote che riempiamo»
- **Proposta:** «Notti vuote che si prenotano (ipotesi)»
- **Perché:** it is an assumption the visitor sets, not a promise. The help line («Il numero più incerto: è quello che la prova misura.») stays.

**R1-87** · `:113` (slider label and help) · I2
- **Ora:** «Quanto spendi in annunci al giorno, in tutto» — «Li paghi tu, direttamente a Meta e Google. Consigliamo 3 € al giorno per unità.»
- **Proposta:** «Pubblicità al giorno, per tutte le unità» — «La paghi tu, direttamente a Google e Meta. Per iniziare consigliamo 3 € al giorno per unità.»
- **Perché:** I2. «Per iniziare» says the 3 € is a starting point, not a fixed rule.

**R1-88** · `:123` (first of the three boxes) · C2
- **Ora:** «Commissioni che non paghi più» — «Solido: dipende solo da quante prenotazioni passano alla tua pagina. Già tolto il pagamento online.»
- **Proposta:** «Il margine delle prenotazioni che vendi tu» — «La voce più solida: dipende da quante prenotazioni passano alla tua pagina. Già tolto il pagamento online.»
- **Perché:** «Commissioni che non paghi più» breaks rule 1. The new title says what a direct sale is. «La voce più solida» is more honest than «Solido» on its own, since it is still an estimate.

**R1-89** · `:124` (second box) · C8
- **Ora:** «Notti vuote riempite»
- **Proposta:** «Notti vuote prenotate (stima)»
- **Perché:** an estimate, not a result. The line under it («… notti, al netto dei costi. Il più incerto: è quello che la prova misura.») stays.

**R1-90** · `site.js:153` (cost line under the boxes) · I2. Lodgify is in attesa (C6).
- **Ora:** «Già tolti dal totale: annunci 2.190 € e il nostro piano 1.243 €.» (example values)
- **Proposta:** «Già tolti dal totale: pubblicità 2.190 € e il nostro piano 1.243 €.»
- **Perché:** I2. Lodgify gets added here when confirmed.

### «I numeri che usiamo»

**R1-91** · `:135` (before and after 13 October) · I20
- **Ora:** «Prima e dopo il 13 ottobre. Nel modello a commissione divisa l'host pagava il 3% e l'ospite una commissione separata, di solito tra il 14% e il 16,5%. Con la commissione unica il 15,5% lo paga tutto l'host. Puoi alzare i prezzi per compensare, ma la commissione resta: anche sull'ospite che torna.»
- **Proposta:** «Prima e dopo il 13 ottobre. Nel modello a commissione divisa la maggior parte degli host pagava il 3%, e l'ospite una commissione separata, di solito tra il 14% e il 16,5%. Con la commissione unica il 15,5% lo paga tutto l'host. Puoi alzare i prezzi per compensare, ma la commissione resta: anche sull'ospite che torna.»
- **Perché:** «la maggior parte degli host» where the 3% appears (I20). The rest was already clear.

**R1-92** · `:136` (Airbnb 15,5%) · I20
- **Ora:** «Airbnb, 15,5%. Per la maggior parte degli host dello Spazio economico europeo e della Svizzera. Airbnb indica che può variare tra il 14% e il 16%: fa fede la tua fattura.»
- **Proposta:** «Airbnb, 15,5%. Per la maggior parte degli host dello Spazio economico europeo e della Svizzera, calcolato sulle notti più le pulizie, tasse escluse. Airbnb indica che può variare tra il 14% e il 16%: fa fede la tua fattura.»
- **Perché:** says what the 15,5% is charged on (I20).

**R1-93** · `:138` (VAT) · I17
- **Ora:** «IVA sulla commissione. Se nel tuo caso si applica, il 15,5% pesa per circa il 18,9%.»
- **Proposta:** «IVA sulla commissione. Se paghi l'IVA al 22% sulla commissione, il 15,5% diventa circa il 18,9%. Su un soggiorno da 1.500 €: 232,50 € di commissione più 51,15 € di IVA, 283,65 € in tutto.»
- **Perché:** explains where 18,9% comes from (15,5% × 1,22) with the amounts on the usual stay.

**R1-94** · `:140` (advertising) · I2
- **Ora:** «Annunci, circa 70 € a prenotazione.»
- **Proposta:** «Pubblicità, circa 70 € a prenotazione.»
- **Perché:** I2. The rest of the paragraph (estimates from ad providers, measured by the trial) stays.

**R1-95** · `:141` (one more night) · I16
- **Ora:** «Una notte in più costa il 20% del prezzo. Pulizie, lenzuola, consumi. Una stima: la sostituiamo con i tuoi numeri appena li abbiamo.»
- **Proposta:** «Una notte in più costa il 20% del prezzo. È una stima di quanto spendi per ospitare una notte, dalle pulizie ai consumi: la sostituiamo con i tuoi numeri appena li abbiamo.»
- **Perché:** breaks the three-word list and says what the 20% stands for.

**R1-96** · `:142` (our plan) · I17. The base of the 1,5% is in attesa (I6).
- **Ora:** «Il nostro piano. 68 € al mese più l'1,5% delle prenotazioni fatte sulla tua pagina. Nient'altro.»
- **Proposta:** «Il nostro piano. 68 € al mese più l'1,5% delle prenotazioni fatte sulla tua pagina: 22,50 € su un soggiorno da 1.500 €. A noi non va nient'altro.»
- **Perché:** the amount in euros. «A noi non va nient'altro» makes clear it is our fee only; the advertising and Lodgify are paid separately.

**Stays as it is on this page:**
- `:52` intro of «Una prenotazione»;
- `:67` VAT checkbox;
- `:76` advertising estimate;
- `:104` heading;
- `:125` «Prezzi migliori» box;
- `:137` Booking.com;
- `:139` online payment;
- the sources and the date they were consulted (`:147–153`);
- the chart labels «conviene da …» and «più i 68 € al mese del piano».

---

## 2. Buttons (I5): what happens, how long, what it costs

"Gratuita" needs Simon's confirmation. "Entro un giorno lavorativo" is already promised on the site today.

| ID | Where | Ora | Proposta (button) | Line under the button |
|---|---|---|---|---|
| R1-49 | `index.html:51` | «Parliamone, quindici minuti» | «Chiedi una chiamata» | «Una chiamata di 15 minuti, gratuita. Ti richiamiamo entro un giorno lavorativo; se non conviene, te lo diciamo lì.» (R1-10) |
| R1-50 | `prenotazioni-dirette-torino.html:77` | «Parliamone, quindici minuti» | «Chiedi una chiamata di 15 minuti» | «Gratuita. Ti richiamiamo entro un giorno lavorativo.» |
| R1-51 | `domande.html:65` | «Parliamone, quindici minuti» | «Chiedi una chiamata di 15 minuti» | «Gratuita. Ti richiamiamo entro un giorno lavorativo.» |
| R1-52 | `index.html:124` | «Inizia la prova» | «Chiedi di iniziare la prova» | «Lasci un recapito, ti richiamiamo entro un giorno lavorativo e fissiamo l'avvio. Primi 60 giorni: 34 € al mese più 0,75%.» |
| R1-53 | `come-lavoriamo.html:98` | «Inizia la prova» | «Chiedi di iniziare la prova» | same as R1-52 |
| R1-54 | `prenotazioni-dirette-torino.html:100` | «Inizia la prova» | «Chiedi di iniziare la prova» | same as R1-52 |
| R1-55 | header, all pages (desktop button and last mobile-menu link) | «Parliamone» | «Chiedi una chiamata» | — (no room in the header) |
| R1-56 | sticky bar on phones, 5 pages | «Parliamone» | «Chiamata di 15 minuti, gratuita» | — |
| R1-57 | `index.html:52` | «Vedi quanto ti resta» | «Fai il conto: tre numeri» | — (R1-09) |
| R1-58 | `index.html:88`, `commissioni-airbnb-booking.html:119` | «Verifichiamolo sulla tua casa» | «Manda questi numeri» | «Li copiamo nel modulo qui sotto: aggiungi un recapito e ti richiamiamo entro un giorno lavorativo.» (R1-27) |
| R1-59 | questionnaire result, `site.js:311` | «Raccontaci la tua casa» | «Manda le risposte» | «Le copiamo nel modulo qui sotto: aggiungi un recapito e ti richiamiamo entro un giorno lavorativo.» |
| R1-60 | form, 5 pages | «Mandaci due righe» | «Invia la richiesta» | — (R1-48) |

**Why, for all of them:** «Parliamone» does not say what happens. The visitor expected to book a call and found a form. Now the button says what you ask for, and the line below says when the answer comes, how long the call takes and that it costs nothing. «Inizia la prova» promised an immediate start; the real next step is a call to set the start.

**Notes for later code work** (not text, not applied):
- «Chiedi di iniziare la prova» should pre-fill the form message, e.g. «Vorrei iniziare la prova di 60 giorni.», and set focus on the name. The calculators and the questionnaire already do this.
- The lines under the buttons need a small style (a `nota` paragraph under the button row).

---

## 3. Questionnaire (`assets/site.js:271–314`)

**R1-61** · `site.js:272` (question 1) · I3 (decided by Simon)
- **Ora:** «Quante unità affitti?»
- **Proposta:** «Quante unità hai?»
- **Perché:** rule 2, as decided. The answers («Una», «Da 2 a 5», «Da 6 a 10», «Più di 10») stay.

**R1-62** · new question 2, after «Quante unità hai?» · I1, rule 5
- **Proposta:** «Quanto vale, in media, un soggiorno nella tua casa?» — answers: «Meno di 650 €» · «Tra 650 e 1.500 €» · «1.500 € o più»
- **Where 650 € comes from (the site's own model):**
  - On Airbnb a booking costs 15,5% of its value.
  - On the owner's page it costs 3% (payment) + 1,5% (ours) + about 70 € of advertising.
  - The two are equal when 0,155 × V = 0,045 × V + 70, so V = 70 ÷ 0,11 = 636 €. Rounded to 650 €.
  - At 650 €: Airbnb 100,75 €, own page 99,25 €. Under it, the owner's page costs more, before even counting the 68 € a month.
- **Perché:** it asks the one figure that decides whether the service pays. The honest answer for low-value stays comes from the site's own numbers.

**R1-63** · new result for «Meno di 650 €». It is checked first and overrides every other result.
- **Proposta:** title «Con questi soggiorni non conviene» — text «Sotto i 650 € a soggiorno, secondo le nostre stime, una prenotazione dalla tua pagina costa quanto una su Airbnb, o di più: circa 70 € di pubblicità, il 3% di pagamento online e il nostro 1,5%, contro il 15,5%. Preferiamo dirtelo adesso.»
- **Perché:** the honest verdict, with the arithmetic in plain words.

**R1-64** · extra sentence added to the result when the answer is «Tra 650 e 1.500 €»
- **Proposta:** «Tra 650 e 1.500 € il margine c'è, ma è sottile: secondo le nostre stime, su un soggiorno da 1.000 € una prenotazione dalla tua pagina lascia circa 40 € in più, quindi servono circa due prenotazioni dirette al mese per coprire i 68 € del piano.»
- **Perché:** says how much and how many bookings, instead of a generic «da valutare».

**R1-65** · extra sentence added when the answer is «1.500 € o più»
- **Proposta:** «Su un soggiorno da 1.500 €, secondo le nostre stime, una prenotazione dalla tua pagina lascia circa 95 € in più: ne basta circa una al mese per coprire i 68 € del piano.»
- **Perché:** gives the owner the concrete number for their case, still marked as an estimate.

**R1-66** · `site.js:301` (result «Hai già un canale diretto») · I2, C8
- **Ora:** «Ti servono soprattutto annunci e prezzi migliori, per riempire le notti vuote. Parliamone.»
- **Proposta:** «Allora il lavoro è soprattutto sulla pubblicità e sui prezzi, per cercare prenotazioni nelle notti vuote.»
- **Perché:** «per riempire» became «per cercare» (work, not outcome); «annunci» → «pubblicità». The button below already invites contact.

**R1-67** · `site.js:303` (result «Sì, ha senso parlarne») · C8
- **Ora:** «Hai notti da riempire e ospiti da riportare a te. È il lavoro che facciamo.»
- **Proposta:** «Hai notti vuote, oppure ospiti che possono tornare e prenotare da te: è il caso per cui lavoriamo. Il conto preciso lo facciamo al telefono, in 15 minuti.»
- **Perché:** describes the situation and the next step, and promises nothing.

**R1-68** · `site.js:304` (result «Da valutare insieme»)
- **Ora:** «In quindici minuti capiamo se i conti tornano.»
- **Proposta:** «In una chiamata di 15 minuti vediamo se i conti tornano.»
- **Perché:** says it is a call; same figure as the buttons.

**R1-69** · `site.js:305` (extra line when the owner already has a site) · I2
- **Ora:** «Partiremmo da annunci e prezzi.»
- **Proposta:** «Partiremmo da pubblicità e prezzi.»
- **Perché:** I2.

`site.js:302` («Forse non ancora» — «Una casa quasi sempre piena lascia poco margine. Possiamo comunque guardare insieme i prezzi.») and the other two extra lines stay.

**Notes for later code work** (not text):
- add question R1-62 and the order of the checks (R1-63 first);
- add the stay value to the message copied into the form;
- the intro on `come-lavoriamo.html:109` says «Quattro domande»; it will need «Cinque» (round 2).

---

## 4. Ads and past guests (I7)

The final wording waits for Simon's decision on how ads will reach past guests. These neutral versions say nothing about guest lists or contact uploads.

**R1-70** · `index.html:99` → see **R1-30**.

**R1-71** · `come-lavoriamo.html:54` · I7, I2
- **Ora:** «Google per chi cerca casa a Torino, Instagram per chi è già stato tuo ospite. Il budget lo decidi tu.»
- **Proposta:** «Su Google, per chi cerca una casa a Torino o in Piemonte, e su Instagram. Il budget lo decidi tu e lo paghi direttamente a Google e Meta.»
- **Perché:** removes the promise of targeting past guests, which would need their consent or a Meta pixel with a cookie banner on the owner's page.

## 5. Tourist tax, CIN and Alloggiati Web (I8)

**R1-72** · one sentence, to be used everywhere this topic appears
- **Proposta:** «Codice CIN, imposta di soggiorno e comunicazione degli ospiti ad Alloggiati Web restano adempimenti tuoi, come oggi, anche per le prenotazioni dalla tua pagina.»
- **Where it goes (applied in round 2):**
  - `prenotazioni-dirette-torino.html:72` replaces «Sulle prenotazioni dalla tua pagina li impostiamo noi in Lodgify.»
  - `domande.html:61` replaces «Imposta di soggiorno e Alloggiati Web restano adempimenti tuoi, come oggi: li impostiamo nella pagina.»
  - The closing «Per il fisco, il riferimento è il tuo commercialista.» stays in both places.
- **Perché:** one answer instead of two different ones. It claims nothing about what is set up in Lodgify, and it says clearly that the filings stay with the owner (rule 4).
- **Simon to confirm separately:** whether anything is set up in Lodgify for the tourist tax. If so, it can be said in a second sentence once confirmed.

---

## 6. In attesa: listed, not drafted

### 6.1 Lodgify (plan, monthly price, any fee on direct bookings)

Lines with ⚠ also contain «senza commissioni» (rule 1), so they must change in any case.

| Where | Current text (Lodgify part) |
|---|---|
| `index.html:127` | «Lodgify da circa 33 €» |
| `index.html:128` ⚠ | «Lodgify parte da circa 33 € al mese nel piano senza commissioni e cresce con le unità» |
| `come-lavoriamo.html:74` ⚠ | «Lodgify lo paghi tu: parte da circa 33 € al mese nel piano senza commissioni e cresce con le unità.» |
| `come-lavoriamo.html:101` | «Lodgify da circa 33 €» |
| `come-lavoriamo.html:102` ⚠ | «Lodgify parte da circa 33 € al mese nel piano senza commissioni e cresce con le unità» |
| `prenotazioni-dirette-torino.html:103` | «Lodgify da circa 33 €» |
| `prenotazioni-dirette-torino.html:104` ⚠ | «Lodgify parte da circa 33 € al mese nel piano senza commissioni e cresce con le unità» |
| `domande.html:57` ⚠ | «L'abbonamento è a tuo nome e parte da circa 33 € al mese nel piano senza commissioni.» |
| `sito/README.md`, launch list item 10 ⚠ | «listino Lodgify (da circa 33 € al mese nel piano senza commissioni)» |

Lines that name Lodgify without a price or plan (`index.html:98`, the `domande.html` glossary) are not affected.

### 6.2 C6: what the calculators subtract (Lodgify not included today)

| Where | What will need the decision |
|---|---|
| `index.html:82` | the list of costs in the assumptions line (R1-23) |
| `index.html:86`, `commissioni-airbnb-booking.html:117` | the result label (R1-25 is true today; Lodgify gets added) |
| `index.html:127` | «tutto compreso» in the example (R1-35) |
| `commissioni-airbnb-booking.html:78` | «Nel conto: pagamento online (3%, stima) e il nostro 1,5%.» |
| `commissioni-airbnb-booking.html:105` | «Due fonti di guadagno, una solida e una da misurare, e tutti i costi dentro.» («tutti i costi» is false while Lodgify is missing) |
| `site.js:153` | «Già tolti dal totale: annunci … e il nostro piano ….» |
| `index.html:173–179` | phone report: no Lodgify line |
| `index.html:86` and full calculator | C6 also proposes showing the split «di cui X € da prenotazioni dirette, Y € da notti vuote (la stima più incerta)» under the main result |

### 6.3 I6: IVA, what the 1,5% is calculated on, trial end against the 30 days' notice, meaning of «inizia entro il 30 novembre»

| Decision | Where the wording will need it (round 1 files; the same lines on the round 2 pages will be listed there) |
|---|---|
| IVA on 68 € and on the 1,5% | `index.html:49`, `:69`, `:111`, `:112`, `:122`; `commissioni-airbnb-booking.html:142` |
| What the 1,5% is calculated on (stay value? with or without cleaning? with or without tourist tax?) | `index.html:49`, `:69`, `:112`; `commissioni-airbnb-booking.html:71`, `:78`, `:93` («Il nostro 1,5%»), `:142`. The «22,50 € su 1.500 €» examples (R1-08, R1-19, R1-32) assume it is the stay value; they change if the base is different. |
| How the 60-day trial ends with 30 days' notice | `index.html:49` («I primi 60 giorni a metà prezzo»), `:123`, `:128` («Disdici quando vuoi, con 30 giorni di preavviso… Nei primi 60 giorni paghi metà e misuriamo insieme») |
| What «inizia entro il 30 novembre 2026» means (first call, signed agreement, first day of work?) | `index.html:123` |

## 7. «Chi c'è dietro» (C1): what the block should contain, not written

The empty slot is ready: `index.html:207`, `<section id="chi-ce-dietro" hidden>`, just before the form. When Simon provides the data, the block should hold:

1. **Name and surname** (or company name), as on the invoice.
2. **One real photo** of Simon. Optional, but it is what a sceptical owner looks for first.
3. **Two or three factual lines** on who he is and why he does this work. Facts only: based in Turin, what he has done so far. No invented experience, no clients.
4. **How to reach him directly:** phone and/or email, WhatsApp if wanted. The same details go in the footer.
5. **Partita IVA** (or the legal form) in the footer. The privacy notice gets completed separately, by a professional.
6. **What happens after the first contact**, in one line, consistent with the buttons in section 2.

Not to include: testimonials, client logos, results or reviews (rule 3), until real and documented.

---

## 8. Rule check on this file

I searched every proposed text for the banned wording.

| Rule | Result |
|---|---|
| 1 | «senza commissioni», «zero commissioni», «non paga commissioni», «commissioni non pagate» appear only in the **Ora** quotes and in section 6.1, never in a proposal |
| 2 | «affitt…» appears only in **Ora** quotes. «in affitto breve» (legal CIN definition) is untouched |
| 3 | «riempiamo», «notti piene», «ne recuperi» appear only in **Ora** quotes. Every proposed figure that is an assumption says «stima» or «ipotesi» |
| 4 | «chiavi» and «pulizie» appear only as *not offered* (R1-14). Alloggiati Web appears only as the owner's responsibility (R1-72) |
| 6 | Price, trial, notice and date figures are unchanged: 68 € + 1,5%, 34 € + 0,75%, 60 giorni, 30 novembre 2026, 30 giorni, 15,5% dal 13 ottobre 2026 |

The proposals use «pubblicità» for ads, and «annuncio»/«scheda» only for the owner's Airbnb or Booking listing.

## 9. The five changes that matter most in round 1

1. **The hero with the 1.500 € example** (R1-04, R1-06, R1-07, R1-08). In ten seconds the owner reads who it is for, what Airbnb now takes in euros (232,50 € instead of 45 €), what the service is and what it costs on the same stay (22,50 €). Measured: the first button moves up slightly (718 px against 724).
2. **No promise, no banned wording** (R1-01/02, R1-07, R1-23, R1-25, R1-26, R1-41; R1-36 stopgap). «Notti piene», «la riempiamo», «ne recuperi, al netto di tutto», «Commissioni non pagate» go. A sceptical owner or a lawyer finds nothing to object to.
3. **Buttons that say what happens** (section 2, with R1-10). «Chiedi una chiamata» plus «15 minuti, gratuita, entro un giorno lavorativo; se non conviene, te lo diciamo lì». This removes the uncertainty that stops people pressing the button.
4. **The questionnaire's honest question on stay value** (R1-62 to R1-65). Under 650 € it says «non conviene», with the arithmetic. It filters out the wrong clients and shows the right ones that the numbers are real.
5. **«Pubblicità» instead of «annunci»** (R1-30, R1-33, R1-37 and the calculator labels). Two thirds of the offer stop being misread as "better listings".
