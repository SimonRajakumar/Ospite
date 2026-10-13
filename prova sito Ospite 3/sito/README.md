# Sito "Ospite" (nome di lavoro): leggimi prima di modificare

Sito statico in italiano per un servizio a chi affitta case e appartamenti a Torino e in Piemonte: pagina di prenotazione (Lodgify), annunci, prezzi e annuncio migliori. HTML, un CSS, due JS. Nessuna libreria, nessun server.

**Le pagine HTML sono la fonte. Si modificano direttamente.**

## Pagine

| File | Cosa contiene |
|---|---|
| `index.html` | Titolo con prezzo, la ruota dell'ospite, tre cose che facciamo, conto rapido (3 numeri), il viaggio nel telefono, prezzi, fa per te / non fa per te, modulo di contatto |
| `commissioni-airbnb-booking.html` | "Il conto": confronto per una prenotazione (grafico rosso/blu) e conto su un anno con tutte le ipotesi modificabili |
| `come-lavoriamo.html` | Primi sette giorni, ogni settimana, la prova di 60 giorni, chi paga cosa, prezzi, questionario "Fa per te?" |
| `prenotazioni-dirette-torino.html` | Pagina locale (Torino e Piemonte) |
| `domande.html` | Domande frequenti e glossario "tocca una parola" (niente dati strutturati FAQ: Google non li mostra più per siti come questo, e andavano tenuti allineati a mano) |
| `privacy.html` | Informativa per il modulo. **Da completare** con i dati del titolare |
| `grazie.html` | Pagina dopo l'invio del modulo |
| `404.html` | Pagina per gli indirizzi che non esistono (percorsi assoluti, funziona a qualsiasi profondità) |

## Cose che si cambiano in un punto

In cima a `assets/site.js`:
- Non c'è un'email nostra, per scelta: per ora l'unico contatto è il modulo. Quando ci sarà, va aggiunta nelle pagine (sezione contatti) e nell'informativa privacy.
- `WHATSAPP`: numero con prefisso, solo cifre (es. `393331234567`). **Vuoto = i pulsanti WhatsApp restano nascosti.**
- `FISSO = 68` e `PCT = 1.5`: il prezzo. Se lo cambi, cambia anche i testi dei prezzi nelle pagine (blocco "Un prezzo, scritto qui", titolo della home, domande).
- `PAY = 3`, `COMM = 15.5`, `COSTO_NOTTE = 20`: le ipotesi dei calcoli.

I due calcolatori (home e "Il conto") usano **la stessa funzione** `contoAnno`, quindi non possono dare numeri diversi.

## Dove vive ogni cosa ripetuta

Senza un programma che costruisca le pagine, i numeri sono scritti a mano in più posti. Se ne cambi uno, cambialo **ovunque** compaia. Il comando in fondo li elenca tutti, con file e riga.

| Cosa | Oggi | Dove compare | In `assets/site.js` | Attenzione |
|---|---|---|---|---|
| Canone del piano | 68 € al mese | `index` (titolo, prezzi, esempio), `come-lavoriamo`, `prenotazioni-dirette-torino`, `domande`, `commissioni-airbnb-booking` (testo e riquadro senza JavaScript), meta description di `index` e `come-lavoriamo` | `FISSO` | anche la frase «più i 68 € al mese del piano» nel grafico viene da `FISSO`; «68 € al mese più l'1,5%» è scritto anche dentro `images/condividi.jpg` (il comando non lo trova: va rifatta l'immagine) |
| Percentuale del piano | 1,5% | stesse pagine del canone, più la legenda e la ricevuta del grafico | `PCT` | anche dentro `images/condividi.jpg` |
| Prova a metà prezzo | 34 € + 0,75%, primi 60 giorni | riquadro scuro dei prezzi in `index`, `come-lavoriamo`, `prenotazioni-dirette-torino`; risposta «Quanto costa?» in `domande` | (il conto annuale calcola da solo la metà di `FISSO` e `PCT`) | |
| Scadenza della prova | 30 novembre 2026 | gli stessi 4 punti della riga sopra | — | dal 1° dicembre 2026 è un'offerta scaduta: va cambiata o tolta |
| Partire per le feste | «entro metà novembre» | `come-lavoriamo` (2 volte) | — | scade a metà novembre |
| Durata della prova | 60 giorni | `index`, `come-lavoriamo`, `prenotazioni-dirette-torino`, `domande`, `commissioni-airbnb-booking` | — | |
| Preavviso di disdetta | 30 giorni | nota sotto i prezzi (3 pagine), `domande` | — | in `privacy.html` «30 giorni» è un'altra cosa (tempo di risposta): non toccarla |
| Commissione Airbnb | 15,5% dal 13 ottobre 2026 | quasi ogni pagina, l'avviso in `index` e `commissioni-airbnb-booking`, la ruota (`assets/ruota.js`), l'immagine per i social (`images/condividi.jpg`, testo dentro l'immagine) | `COMM` | `og:image:alt` lo ripete in tutte le pagine |
| Commissione Booking | circa 15% | `index` (fatti), `commissioni-airbnb-booking` (testo e pulsante `data-val="15"`) | — | |
| Lodgify | da circa 33 € al mese | nota sotto i prezzi (3 pagine), `come-lavoriamo` («Chi paga cosa»), `domande` | — (oggi non entra nei calcoli) | prezzo da verificare sul listino |
| Soglia per fermare gli annunci | 150 € a prenotazione | `come-lavoriamo`, `domande` | — | |
| Annunci per prenotazione | 70 € | cursore `#r-ann` e testo in `commissioni-airbnb-booking` | — | valore iniziale del cursore |
| Ipotesi del conto rapido | 15% passa alla pagina, 10% notti riempite, 3 € al giorno per unità | frase «Ipotesi: …» in `index`; valori iniziali dei cursori `#a-s`, `#a-f`, `#a-a` in `commissioni-airbnb-booking` | `QUOTA_DIRETTA`, `NOTTI_RIEMPITE`, `ANNUNCI_UNITA` | i cursori del conto completo devono partire dagli stessi valori |
| Pagamento online | 3% | `index` (ipotesi), `commissioni-airbnb-booking` | `PAY` | |
| Costo di una notte in più | 20% | `index` (ipotesi), `commissioni-airbnb-booking` | `COSTO_NOTTE` | |
| Asse del grafico | da 200 € a 4.000 € | cursore `#r-sogg` (min e max) | `GRAFICO_DA`, `GRAFICO_A` | |
| Anno nel piè di pagina | © 2026 | tutte le 8 pagine | — | da cambiare a gennaio |
| Data di aggiornamento | `lastmod` | `sitemap.xml` (5 righe) | — | da aggiornare a ogni modifica dei testi |

**Il controllo, con un solo comando** (dalla cartella del sito):

```sh
grep -rnoE --include='*.html' --include='*.js' --include='*.xml' '(^|[^0-9.,])(68|34|33|150|70)( |&nbsp;)€|(^|[^0-9])1,5%|0,75%|15,5%|circa 15%|30 novembre|metà novembre|13 ottobre|60 giorni|30 giorni|(^|[^0-9.,])3( |&nbsp;)€ al giorno|© 2026|<lastmod>[^<]*' . | sort
```

Stampa ogni occorrenza come `file:riga:testo`. Dopo una modifica, il valore vecchio non deve comparire più.

## Il modulo di contatto

Funziona solo su Netlify (Netlify Forms): le richieste arrivano nel pannello del sito, sezione Forms. In locale non invia. C'è un campo trappola contro lo spam.

## Prima del lancio

1. Togli `<meta name="robots" content="noindex">` da ogni pagina. (Il promemoria «AL LANCIO: togli questa riga», che prima era un commento accanto al tag in ogni pagina, ora sta solo qui.)
2. Il dominio nei canonical, nelle anteprime, in `sitemap.xml` e `robots.txt` è quello di Netlify (`fantastic-bombolone-9636cc.netlify.app`). Con un dominio vero, sostituiscilo ovunque.
3. **Chi c'è dietro.** Il problema più grave rimasto: nessun nome, foto, partita IVA o telefono. Vanno messi nel piede e in `privacy.html`, sezione «Chi tratta i dati»: nome e cognome (o ragione sociale), indirizzo, partita IVA e un recapito del titolare. (Prima lo ricordava un commento nascosto nella pagina; ora sta solo qui.) L'informativa non è completa finché il titolare non è identificato: falla verificare a un professionista.
4. **La scadenza della prova.** Il sito promette la metà prezzo a chi inizia entro il 30 novembre 2026. Dopo quella data va tolta o cambiata: una scadenza non rispettata costa la fiducia.
5. **L'avviso del 13 ottobre** è una frase fissa, al passato, uguale in `index.html` e `commissioni-airbnb-booking.html` (nessuno script). Da gennaio 2027 conviene sostituirla.
6. Inserisci il numero WhatsApp in `assets/site.js`, se lo vuoi.
7. Se installi un pixel di Meta o un tag di Google Ads, la frase sui cookie in `privacy.html` diventa falsa: serve un banner per il consenso.
8. Controlla i fatti: Airbnb 15,5% dal 13 ottobre 2026 (fonte: documento di Airbnb alla SEC), Booking circa 15%, listino Lodgify (da circa 33 € al mese nel piano senza commissioni).

## Regole di Simon

- Nessun falso segnale di fiducia: niente clienti, risultati, recensioni o foto inventati o altrui.
- Poche parole, fatti e numeri, stile Ogilvy. Niente linguaggio da guru, niente sito "da intelligenza artificiale".
- Prezzi chiari e visibili. Ogni sezione porta a un'azione: fare il conto o scriverci.
- Foto e video non sono offerti come servizio.

## Registro modifiche

- **6 ott 2026** Prima versione in cinque pagine.
- **7 ott 2026** Controllo completo, caratteri ospitati nel sito, calcolatore dei piani interno.
- **8 ott 2026** Versione 4: titolo senza foto con la ruota dell'ospite (sei parole); prezzo unico 68 € al mese + 1,5%, prova di 60 giorni a metà prezzo; conto rapido in home e conto annuale con lo stesso modello; grafico aggiornato al nuovo prezzo; modulo di contatto Netlify, informativa privacy, pagina di ringraziamento; WhatsApp opzionale; testi ridotti; tolte le foto a bassa risoluzione.
- **8 ott 2026** Versione 5, dopo la revisione completa: nuovo titolo ("L'ospite che torna da te ti costa il 15,5%"), avviso con il conto alla rovescia al 13 ottobre, home riordinata (fa per te, tre cose, il viaggio, prezzo, conto), prezzo preciso (1,5% solo sulla tua pagina) e costo reale con Lodgify, scadenza della prova al 30 novembre, i due calcolatori allineati (annunci 3 € per unità senza tetto, cursore fino a 80 €), tre fonti con il grado di certezza, primo anno con la prova, calcolatori e questionario che compilano il modulo, telefono ed email separati, pagina 404 in italiano, immagine per WhatsApp e social, icona per iPhone, testata fissa su desktop, focus leggibile, bersagli da 44 px, fonti con Airbnb in testa e in nuova scheda, pagina Torino ampliata, informativa senza segnaposto visibili. Tolto dal sito lo strumento interno dei piani.
