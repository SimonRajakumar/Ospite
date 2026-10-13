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
| `domande.html` | Domande frequenti (con dati strutturati) e glossario "tocca una parola" |
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
