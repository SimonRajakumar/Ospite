/* Ospite: comportamenti comuni a tutte le pagine. Nessuna libreria. */
(function () {
  "use strict";
  /* ---- DA CAMBIARE QUI ---- */
  var WHATSAPP = "";          /* numero con prefisso, solo cifre, es. "393331234567". Vuoto = pulsante nascosto */
  var FISSO = 68;             /* il nostro piano: euro al mese */
  var PCT = 1.5;              /* il nostro piano: % sulle prenotazioni dalla pagina e sui soggiorni nuovi */
  var PAY = 3;                /* costo del pagamento online, % stimata */
  var COMM = 15.5;            /* commissione Airbnb, % */
  var COSTO_NOTTE = 20;       /* costo di una notte in più (pulizie, consumi), % del prezzo */

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;
  var fmt = function (n) { n = Math.round(n); var t = Math.abs(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); return (n < 0 ? "−" : "") + t; };
  var euro = function (n) { return fmt(n) + " €"; };
  var num = function (n, d) { return (Math.round(n * Math.pow(10, d || 1)) / Math.pow(10, d || 1)).toString().replace(".", ","); };
  var val = function (el) { var v = parseFloat(String(el.value).replace(",", ".")); return isFinite(v) ? v : 0; };

  /* ---------- menu su telefono ---------- */
  var mbtn = $(".menu-btn"), mm = $(".menu-mobile");
  if (mbtn && mm) {
    mbtn.addEventListener("click", function () { var open = mm.classList.toggle("aperto"); mbtn.setAttribute("aria-expanded", open); });
    $$("a", mm).forEach(function (a) { a.addEventListener("click", function () { mm.classList.remove("aperto"); mbtn.setAttribute("aria-expanded", "false"); }); });
  }

  /* ---------- WhatsApp: appare solo se il numero c'e ---------- */
  if (WHATSAPP) {
    $$("[data-wa]").forEach(function (a) {
      a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Ciao, vorrei informazioni per la mia casa.");
      a.target = "_blank"; a.rel = "noopener"; a.hidden = false;
    });
  }

  /* ---------- il viaggio: lo schermo cambia con il passo ---------- */
  var schermi = $$(".viaggio-visuale .vschermo"), passi = $$(".passo");
  if (schermi.length && passi.length) {
    passi.forEach(function (li, i) {
      var box = $(".passo-media", li); if (!box || !schermi[i]) return;
      var tel = document.createElement("div"); tel.className = "telefono"; tel.setAttribute("aria-hidden", "true");
      var sch = document.createElement("div"); sch.className = "schermo";
      sch.appendChild(schermi[i].cloneNode(true)); tel.appendChild(sch); box.appendChild(tel);
    });
    var attiva = function (i) {
      schermi.forEach(function (s, k) { s.classList.toggle("on", k === i); });
      passi.forEach(function (s, k) { s.classList.toggle("on", k === i); });
    };
    if (hasIO) {
      var io2 = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) attiva(+e.target.getAttribute("data-passo")); }); }, { rootMargin: "-45% 0px -45% 0px" });
      passi.forEach(function (p) { io2.observe(p); });
    }
  }

  /* ---------- portare il visitatore al modulo, gia compilato ---------- */
  function unitaEtichetta(u) { return u <= 1 ? "1" : u <= 5 ? "Da 2 a 5" : u <= 10 ? "Da 6 a 10" : "Più di 10"; }
  function precompila(d) {
    var sel = $("#f-unita"); if (sel && d.unita) sel.value = d.unita;
    var m = $("#f-msg"); if (m && d.msg) m.value = d.msg;
    var c = $("#contatti");
    if (c) {
      c.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      setTimeout(function () { var n = $("#f-nome"); if (n) n.focus({ preventScroll: true }); }, reduce ? 0 : 650);
    }
  }

  /* ---------- il modulo: nome e almeno un recapito ----------
     Senza JavaScript il browser controlla da solo il nome (required) e il formato dell'email.
     Con JavaScript il controllo lo facciamo noi, con messaggi in italiano. */
  var modulo = $("form.modulo");
  if (modulo) {
    modulo.noValidate = true;
    var nome = $("#f-nome"), tel = $("#f-tel"), em = $("#f-email"), err = $("#f-errore");
    /* l'errore si collega al campo sbagliato (aria-invalid + aria-describedby), poi si scollega */
    var segna = function (c, on) {
      var ids = (c.getAttribute("aria-describedby") || "").split(" ").filter(function (x) { return x && x !== "f-errore"; });
      if (on) { ids.push("f-errore"); c.setAttribute("aria-invalid", "true"); } else c.removeAttribute("aria-invalid");
      if (ids.length) c.setAttribute("aria-describedby", ids.join(" ")); else c.removeAttribute("aria-describedby");
    };
    modulo.addEventListener("submit", function (e) {
      var msg = "", sbagliati = [];
      if (!nome.value.trim()) { msg = "Scrivici il tuo nome."; sbagliati = [nome]; }
      else if (!tel.value.trim() && !em.value.trim()) { msg = "Lasciaci un telefono o un'email, così possiamo risponderti."; sbagliati = [tel, em]; }
      else if (em.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())) { msg = "L'email non sembra completa: controllala."; sbagliati = [em]; }
      [nome, tel, em].forEach(function (c) { segna(c, sbagliati.indexOf(c) > -1); });
      if (msg) { e.preventDefault(); err.textContent = msg; err.hidden = false; sbagliati[0].focus(); }
      else { err.hidden = true; }
    });
  }

  /* ---------- il conto di un anno (stesso modello ovunque) ----------
     1. una quota del fatturato passa alla pagina diretta: commissione evitata, meno pagamento
     2. una quota delle notti vuote si riempie con soggiorni nuovi: prezzo meno pagamento e costi della notte
     3. costi: annunci e il nostro piano (fisso + PCT% su prenotazioni dirette e soggiorni nuovi) */
  function contoAnno(i) {
    var r = {};
    r.rev = i.u * i.p * 365 * i.o / 100;
    r.oggi = r.rev * COMM / 100;
    r.dir = r.rev * i.s / 100;
    r.evitate = r.dir * COMM / 100;
    r.pag = r.dir * PAY / 100;
    r.notti = i.u * 365 * (1 - i.o / 100) * i.f / 100;
    r.nuovo = r.notti * i.p;
    r.nuovoNetto = r.nuovo * (1 - PAY / 100 - COSTO_NOTTE / 100);
    r.annunci = i.a * 365;
    r.piano = FISSO * 12 + PCT / 100 * (r.dir + r.nuovo);
    r.resta = r.evitate - r.pag + r.nuovoNetto - r.annunci - r.piano;
    r.perEuro = r.piano > 0 ? r.resta / r.piano : 0;
    /* primo anno: i primi due mesi a meta prezzo (fisso e percentuale) */
    r.primoAnno = r.piano - FISSO - (PCT / 100 * (r.dir + r.nuovo)) / 12;
    return r;
  }
  $$("[data-conto]").forEach(function (box) {
    var mini = box.getAttribute("data-conto") === "mini";
    var inp = function (k) { return $("[data-k=" + k + "]", box); };
    var out = function (k, t) { var e = $("[data-o=" + k + "]", box); if (e) e.textContent = t; };
    function draw() {
      var u = Math.max(0, Math.min(60, val(inp("u")))), p = val(inp("p")), o = Math.max(0, Math.min(100, val(inp("o"))));
      var i = { u: u, p: p, o: o,
        s: mini ? 15 : val(inp("s")),
        f: mini ? 10 : val(inp("f")),
        a: mini ? 3 * u : val(inp("a")) };
      ["u", "p", "o", "s", "f", "a"].forEach(function (k) {
        var e = $("[data-v=" + k + "]", box); if (!e) return;
        e.textContent = k === "u" ? fmt(i.u) : (k === "p" || k === "a" ? euro(i[k]) : num(i[k], 0) + "%");
      });
      var r = contoAnno(i);
      out("oggi", euro(r.oggi));
      out("resta", (r.resta > 0 ? "+" : "") + euro(r.resta));
      out("piano", euro(r.piano));
      out("pereuro", r.piano > 0 && r.resta > 0 ? "Per ogni euro che ci paghi, te ne restano " + num(r.perEuro, 1) + "." : "Con questi numeri non ti conviene: te lo diciamo prima.");
      out("primoanno", "Il primo anno, con la prova a metà prezzo: " + euro(r.primoAnno) + ".");
      if (!mini) {
        var of = function (k, t) { var e = $("[data-out-full=" + k + "]"); if (e) e.textContent = t; };
        of("fonte1", euro(r.evitate - r.pag)); of("fonte2", euro(r.nuovoNetto)); of("notti", fmt(r.notti));
        of("costi", "Già tolti dal totale: annunci " + euro(r.annunci) + " e il nostro piano " + euro(r.piano) + ".");
      }
      ultimo = i;
    }
    var ultimo = null;
    var vb = $("[data-verifica]", box);
    if (vb) vb.addEventListener("click", function () {
      if (!ultimo) return;
      precompila({ unita: unitaEtichetta(ultimo.u), msg: "Ho fatto il conto sul sito: " + ultimo.u + " unità, prezzo medio " + euro(ultimo.p) + " a notte, occupazione " + ultimo.o + "%." });
    });
    $$("input", box).forEach(function (e) { e.addEventListener("input", draw); e.addEventListener("change", draw); });
    draw();
  });

  /* ---------- il confronto per una prenotazione, con il grafico ---------- */
  var calc = $("[data-calcolo]");
  if (calc) {
    var stato = { piatt: COMM };
    var segs = $$(".segmenti button", calc);
    var rAltra = $("#r-altra"), wrapAltra = $("#c-altra"), cIva = $("#c-iva"), rStay = $("#r-sogg"), rAds = $("#r-ann");
    var svg = $("#grafico-svg"), esito = $("#esito");
    var C_PIATT = "#D3362D", C_DIR = "#2457E6", C_SOGLIA = "#A27B3F";
    segs.forEach(function (b) {
      b.addEventListener("click", function () {
        segs.forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        var v = b.getAttribute("data-val"); wrapAltra.hidden = v !== "altra";
        stato.piatt = v === "altra" ? +rAltra.value : +v; draw();
      });
    });
    rAltra.addEventListener("input", function () { stato.piatt = +rAltra.value; draw(); });
    [cIva, rStay, rAds].forEach(function (el) { el.addEventListener("input", draw); el.addEventListener("change", draw); });
    var nice = function (raw) { var p = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p; };
    var T = function (x, y, txt, attrs) { return '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" ' + (attrs || "") + ">" + txt + "</text>"; };
    function draw() {
      var f = stato.piatt * (cIva.checked ? 1.22 : 1) / 100, d = (PAY + PCT) / 100, A = +rAds.value, v = +rStay.value;
      $("#o-altra").textContent = num(+rAltra.value) + "%"; $("#o-sogg").textContent = euro(v); $("#o-ann").textContent = euro(A); $("#o-piatt").textContent = num(f * 100) + "%";
      var X0 = 200, X1 = 4000;
      var pl = function (x) { return f * x; }, dr = function (x) { return d * x + A; };
      var be = f > d ? A / (f - d) : Infinity;
      var W = Math.max(300, Math.round(svg.parentNode.clientWidth - 2)), small = W < 480;
      var H = Math.round(Math.min(440, Math.max(280, W * 0.6)));
      var m = { l: small ? 54 : 66, r: small ? 12 : 22, t: 30, b: 52 };
      var ymax = Math.max(pl(X1), dr(X1)) * 1.1, step = nice(ymax / 5); ymax = Math.ceil(ymax / step) * step;
      var sx = function (x) { return m.l + (x - X0) / (X1 - X0) * (W - m.l - m.r); };
      var sy = function (y) { return H - m.b - y / ymax * (H - m.t - m.b); };
      var o = [];
      for (var y = 0; y <= ymax + 0.5; y += step) { o.push('<line class="asse" x1="' + m.l + '" x2="' + (W - m.r) + '" y1="' + sy(y) + '" y2="' + sy(y) + '"/>'); o.push(T(m.l - 8, sy(y) + 4, euro(y), 'text-anchor="end"')); }
      var xs = small ? 1000 : 500;
      for (var x = xs; x <= X1; x += xs) o.push(T(sx(x), H - m.b + 20, euro(x), 'text-anchor="middle"'));
      o.push(T(m.l, 14, "Costo per soggiorno", 'class="titolo-asse"'));
      o.push(T(W - m.r, H - 8, "Valore dell'intero soggiorno", 'class="titolo-asse" text-anchor="end"'));
      if (be < X1) { var a = Math.max(be, X0); o.push('<polygon points="' + sx(a) + "," + sy(pl(a)) + " " + sx(X1) + "," + sy(pl(X1)) + " " + sx(X1) + "," + sy(dr(X1)) + " " + sx(a) + "," + sy(dr(a)) + '" fill="' + C_DIR + '" fill-opacity=".13"/>'); }
      if (be > X0 && be < X1) {
        o.push('<line x1="' + sx(be) + '" x2="' + sx(be) + '" y1="' + m.t + '" y2="' + (H - m.b) + '" stroke="' + C_SOGLIA + '" stroke-width="1.5" stroke-dasharray="5 4"/>');
        o.push(T(sx(be) + 6, m.t + 12, "conviene da " + euro(Math.round(be / 10) * 10), 'style="fill:' + C_SOGLIA + ';font-weight:600"'));
        o.push(T(sx(be) + 6, m.t + 28, "più i " + FISSO + " € al mese del piano", 'style="fill:' + C_SOGLIA + ';font-weight:500;font-size:12px"'));
      }
      o.push('<line x1="' + sx(X0) + '" y1="' + sy(pl(X0)) + '" x2="' + sx(X1) + '" y2="' + sy(pl(X1)) + '" stroke="' + C_PIATT + '" stroke-width="3.5" stroke-linecap="round"/>');
      o.push('<line x1="' + sx(X0) + '" y1="' + sy(dr(X0)) + '" x2="' + sx(X1) + '" y2="' + sy(dr(X1)) + '" stroke="' + C_DIR + '" stroke-width="3.5" stroke-linecap="round"/>');
      var xn = sx(v) > W * 0.6 ? X0 + (X1 - X0) * 0.45 : X1, up = pl(xn) >= dr(xn);
      o.push(T(sx(xn) - 2, sy(pl(xn)) + (up ? -10 : 20), "Piattaforma", 'text-anchor="end" style="fill:' + C_PIATT + ';font-weight:600;font-size:13px"'));
      o.push(T(sx(xn) - 2, sy(dr(xn)) + (up ? 22 : -10), "Dalla tua pagina", 'text-anchor="end" style="fill:' + C_DIR + ';font-weight:600;font-size:13px"'));
      var cx = sx(v), left = small ? cx > 95 : cx > W * 0.72, edge = cx > W * 0.72, pv = pl(v), dv = dr(v), pUp = pv >= dv;
      o.push('<line x1="' + cx + '" x2="' + cx + '" y1="' + m.t + '" y2="' + (H - m.b) + '" stroke="#1E1919" stroke-opacity=".35" stroke-width="1"/>');
      o.push('<circle cx="' + cx + '" cy="' + sy(pv) + '" r="6.5" fill="' + C_PIATT + '" stroke="#fff" stroke-width="2"/>');
      o.push('<circle cx="' + cx + '" cy="' + sy(dv) + '" r="6.5" fill="' + C_DIR + '" stroke="#fff" stroke-width="2"/>');
      o.push(T(left ? cx - 11 : cx + 11, sy(pv) + (pUp ? -10 : 20), euro(pv), (left ? 'text-anchor="end" ' : "") + 'style="fill:' + C_PIATT + ';font-weight:600;font-size:13px"'));
      o.push(T(edge ? cx - 11 : cx + 11, sy(dv) + (pUp ? 22 : -10), euro(dv), (edge ? 'text-anchor="end" ' : "") + 'style="fill:' + C_DIR + ';font-weight:600;font-size:13px"'));
      svg.setAttribute("viewBox", "0 0 " + W + " " + H); svg.innerHTML = o.join("");
      var fee = Math.round(pv), pay = Math.round(v * PAY / 100), our = Math.round(v * PCT / 100), dir = pay + A + our, diff = fee - dir;
      $("#x-comm").textContent = euro(fee); $("#x-resta-a").textContent = euro(v - fee);
      $("#x-pag").textContent = euro(pay); $("#x-ann").textContent = euro(A); $("#x-noi").textContent = euro(our); $("#x-resta-b").textContent = euro(v - dir);
      if (diff > 0.5) { esito.classList.remove("no"); esito.textContent = "Con la prenotazione dalla tua pagina ti restano " + euro(diff) + " in più."; }
      else { esito.classList.add("no"); esito.textContent = "Qui la piattaforma costa meno: " + euro(-diff) + " di differenza." + (isFinite(be) ? " Conviene da " + euro(Math.round(be / 10) * 10) + " in su." : ""); }
    }
    draw();
    if ("ResizeObserver" in window) new ResizeObserver(function () { draw(); }).observe(svg.parentNode); else window.addEventListener("resize", draw);
  }

  /* ---------- fa per te? ---------- */
  var quiz = $("#quiz");
  if (quiz) {
    var Q = [
      { q: "Quante unità affitti?", k: "u", o: [["Una", "1"], ["Da 2 a 5", "2-5"], ["Da 6 a 10", "6-10"], ["Più di 10", "10+"]] },
      { q: "Quante notti restano vuote in un anno?", k: "vuote", o: [["Poche: è quasi sempre piena", "poche"], ["Una parte", "parte"], ["Molte", "molte"]] },
      { q: "Da dove arrivano oggi le prenotazioni?", k: "canale", o: [["Solo dalle piattaforme", "piatt"], ["Piattaforme e qualche diretta", "misto"], ["Soprattutto dirette", "dirette"]] },
      { q: "Hai un sito dove si può prenotare?", k: "sito", o: [["No", "no"], ["Ho un sito, ma non si prenota", "nopren"], ["Sì", "si"]] }
    ];
    var step = 0, ans = {}, lab = {}, barra = 0, toccato = false;
    var mk = function (tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };
    var renderQ = function () {
      var it = Q[step]; quiz.innerHTML = "";
      /* la barra parte da zero e si riempie a ogni risposta data */
      var bar = mk("div", "q-barra"), fill = mk("span"); fill.style.width = barra + "%"; bar.appendChild(fill); quiz.appendChild(bar);
      quiz.appendChild(mk("p", "q-conta", "Domanda " + (step + 1) + " di " + Q.length));
      var tit = mk("p", "q-titolo", it.q); tit.tabIndex = -1; quiz.appendChild(tit);
      var ops = mk("div", "q-opzioni");
      it.o.forEach(function (o) {
        var b = mk("button", "q-op", o[0]); b.type = "button";
        if (ans[it.k] === o[1]) { b.classList.add("scelta"); b.setAttribute("aria-pressed", "true"); }
        b.addEventListener("click", function () { ans[it.k] = o[1]; lab[it.k] = o[0]; step++; toccato = true; step < Q.length ? renderQ() : renderR(); });
        ops.appendChild(b);
      });
      quiz.appendChild(ops);
      if (step > 0) { var bk = mk("button", "q-indietro", "Indietro"); bk.type = "button"; bk.addEventListener("click", function () { step--; toccato = true; renderQ(); }); quiz.appendChild(bk); }
      barra = step / Q.length * 100;
      requestAnimationFrame(function () { fill.style.width = barra + "%"; });
      /* dopo una risposta il fuoco va sulla nuova domanda (non al primo caricamento della pagina) */
      if (toccato) tit.focus({ preventScroll: true });
    };
    var renderR = function () {
      var t, p;
      if (ans.canale === "dirette") { t = "Hai già un canale diretto"; p = "Ti servono soprattutto annunci e prezzi migliori, per riempire le notti vuote. Parliamone."; }
      else if (ans.u === "1" && ans.vuote === "poche") { t = "Forse non ancora"; p = "Una casa quasi sempre piena lascia poco margine. Possiamo comunque guardare insieme i prezzi."; }
      else if (ans.vuote === "molte" || ans.u !== "1") { t = "Sì, ha senso parlarne"; p = "Hai notti da riempire e ospiti da riportare a te. È il lavoro che facciamo."; }
      else { t = "Da valutare insieme"; p = "In quindici minuti capiamo se i conti tornano."; }
      var extra = { no: " Partiremmo dalla pagina di prenotazione.", nopren: " Aggiungeremmo la prenotazione al tuo sito.", si: " Partiremmo da annunci e prezzi." }[ans.sito] || "";
      quiz.innerHTML = "";
      /* il risultato e' l'unica parte annunciata dai lettori di schermo; il fuoco va sul suo titolo */
      var box = mk("div", "q-esito"), h = mk("h3", "", t); h.tabIndex = -1; box.setAttribute("aria-live", "polite");
      box.appendChild(h); box.appendChild(mk("p", "", p + extra));
      var acts = mk("div", "q-azioni");
      var a = mk("button", "btn btn-vino", "Raccontaci la tua casa"); a.type = "button";
      a.addEventListener("click", function () {
        precompila({ unita: { "1": "1", "2-5": "Da 2 a 5", "6-10": "Da 6 a 10", "10+": "Più di 10" }[ans.u],
          msg: "Dal questionario: unità " + lab.u + "; notti vuote: " + lab.vuote + "; prenotazioni oggi: " + lab.canale + "; sito: " + lab.sito + "." });
      });
      var again = mk("button", "q-indietro", "Ricomincia"); again.type = "button"; again.addEventListener("click", function () { step = 0; ans = {}; lab = {}; barra = 0; renderQ(); });
      acts.appendChild(a); acts.appendChild(again); box.appendChild(acts); quiz.appendChild(box);
      h.focus({ preventScroll: true });
    };
    renderQ();
  }

  /* ---------- le parole: tocca per leggere ---------- */
  var gl = $(".glossario");
  if (gl) {
    var dts = $$("dt", gl), dds = $$("dd", gl);
    var wrap = document.createElement("div"); wrap.className = "parole";
    var panel = document.createElement("div"); panel.className = "parola-spiega"; panel.id = "parola-spiega"; panel.setAttribute("aria-live", "polite");
    var help = document.createElement("p"); help.className = "parole-aiuto"; help.textContent = "Tocca una parola per leggere cosa significa.";
    var btns = dts.map(function (dt, i) {
      var b = document.createElement("button"); b.type = "button"; b.className = "parola"; b.textContent = dt.textContent;
      b.setAttribute("aria-expanded", "false"); b.setAttribute("aria-controls", "parola-spiega");
      b.addEventListener("click", function () {
        btns.forEach(function (x) { x.setAttribute("aria-expanded", x === b); });
        panel.innerHTML = ""; var h = document.createElement("h3"); h.textContent = dt.textContent; panel.appendChild(h);
        var p = document.createElement("p"); p.innerHTML = dds[i].innerHTML; panel.appendChild(p);
      });
      wrap.appendChild(b); return b;
    });
    gl.hidden = true; gl.parentNode.insertBefore(help, gl); gl.parentNode.insertBefore(wrap, gl); gl.parentNode.insertBefore(panel, gl);
    btns[0].click();
  }

  /* ---------- barra su telefono ---------- */
  var barra = $(".barra-mobile");
  if (barra && hasIO) {
    var top = $(".hero2") || $(".apertura"), fine = $(".contatti"), seen = { top: true, fine: false };
    var io3 = new IntersectionObserver(function (en) {
      en.forEach(function (e) { seen[e.target === top ? "top" : "fine"] = e.isIntersecting; });
      barra.classList.toggle("vista", !seen.top && !seen.fine);
    }, { threshold: 0.02 });
    if (top) io3.observe(top); if (fine) io3.observe(fine);
  }
})();
