/* La ruota dell'ospite. Meccanismo ispirato al lavoro del fratello di Simon
   (rami che crescono dal centro verso le parole, poi l'anello si chiude),
   riscritto da zero: colori del sito, sei parole, accessibile da tastiera,
   rispetta "riduci il movimento", si ferma da sola quando ha finito. */
(function () {
  "use strict";
  var el = document.querySelector("[data-ruota]");
  if (!el) return;
  var testo = document.getElementById("ruota-testo");
  var PAROLE = [
    ["Scopre", "Su Instagram, su Google, da un amico."],
    ["Sceglie", "Foto vere, prezzo chiaro, date libere."],
    ["Prenota", "Qui la piattaforma trattiene il 15,5%."],
    ["Soggiorna", "La parte che conta. Ed è tua."],
    ["Ricorda", "Se è andata bene, lo racconta."],
    ["Ritorna", "E prenota di nuovo. Da te, questa volta."]
  ];
  var N = PAROLE.length, R = 0.42, reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* generatore pseudo-casuale con seme fisso: la ruota ha sempre la stessa forma */
  var seed = 7;
  var rnd = function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  /* rami, in coordinate da 0 a 1 */
  var segs = [], reach = [], C = 0.5;
  function ramo(x, y, a, t, w, b, depth) {
    if (depth > 2 || segs.length > 1400) return;
    var n = 4 + rnd() * 5;
    for (var d = 0; d < n; d++) {
      var len = 0.014 + rnd() * 0.016; a += (rnd() - 0.5) * 0.8;
      var nx = x + Math.cos(a) * len, ny = y + Math.sin(a) * len;
      if (Math.hypot(nx - C, ny - C) > R - 0.035) break;
      segs.push({ x1: x, y1: y, x2: nx, y2: ny, t: t, w: w, b: b });
      t += len; x = nx; y = ny; w = Math.max(0.35, w * 0.88);
      if (rnd() < 0.14) ramo(x, y, a + (rnd() < 0.5 ? -0.8 : 0.8), t, w * 0.7, b, depth + 1);
    }
  }
  for (var b = 0; b < N; b++) {
    var ang = -Math.PI / 2 + b / N * Math.PI * 2;
    var TX = C + Math.cos(ang) * (R - 0.03), TY = C + Math.sin(ang) * (R - 0.03);
    var x = C, y = C, a = ang + (rnd() - 0.5) * 1.1, t = 0, w = 1.9;
    for (var g = 0; g < 70; g++) {
      var len = 0.017 + rnd() * 0.018, bear = Math.atan2(TY - y, TX - x);
      a += (rnd() - 0.5) * 0.9; var da = Math.atan2(Math.sin(bear - a), Math.cos(bear - a)); a += da * 0.34;
      var nx = x + Math.cos(a) * len, ny = y + Math.sin(a) * len;
      segs.push({ x1: x, y1: y, x2: nx, y2: ny, t: t, w: w, b: b });
      t += len; x = nx; y = ny; w = Math.max(0.5, w * 0.965);
      if (rnd() < 0.28) ramo(x, y, a + (rnd() < 0.5 ? -0.9 : 0.9), t, w * 0.62, b, 1);
      if (Math.hypot(x - TX, y - TY) < 0.022 || Math.hypot(x - C, y - C) > R - 0.02) break;
    }
    reach[b] = t;
  }
  var maxLen = Math.max.apply(null, reach);

  /* parole: pulsanti veri, sul bordo dell'anello */
  var bottoni = PAROLE.map(function (p, i) {
    var ang = -Math.PI / 2 + i / N * Math.PI * 2;
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "ruota-parola"; btn.textContent = p[0];
    btn.style.left = (50 + Math.cos(ang) * R * 100) + "%";
    btn.style.top = (50 + Math.sin(ang) * R * 100) + "%";
    btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "ruota-testo");
    btn.addEventListener("click", function () {
      var aperta = btn.getAttribute("aria-expanded") === "true";
      bottoni.forEach(function (o) { o.setAttribute("aria-expanded", "false"); });
      if (aperta) { testo.textContent = "Tocca una parola."; return; }
      btn.setAttribute("aria-expanded", "true");
      testo.innerHTML = ""; var bb = document.createElement("b"); bb.textContent = p[0]; testo.appendChild(bb); testo.appendChild(document.createTextNode(p[1]));
    });
    el.appendChild(btn); return btn;
  });

  /* disegno */
  var cv = el.querySelector("canvas"), ctx = cv.getContext("2d"), S = 0, dpr = 1;
  function misura() {
    dpr = Math.min(2, window.devicePixelRatio || 1); S = el.clientWidth;
    cv.width = Math.round(S * dpr); cv.height = Math.round(S * dpr);
  }
  var AV = [244, 239, 231], OT = [176, 141, 87];
  var T0 = null, arrivo = [], finito = false, raf = null;
  var DUR = 1.7, STEP = 0.32, START = 0.25;
  function taglio(b, s) {
    var g = Math.min(1, Math.max(0, (s - START - b * STEP) / DUR));
    return (1 - Math.pow(1 - g, 2.2)) * reach[b];
  }
  function disegna(s, ora) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, S, S); ctx.lineCap = "round";
    for (var i = 0; i < segs.length; i++) {
      var sg = segs[i];
      if (sg.t > taglio(sg.b, s)) continue;
      var r = Math.hypot(sg.x1 - C, sg.y1 - C) / R, k = Math.min(1, r);
      var f = arrivo[sg.b] != null ? Math.min(1, (ora - arrivo[sg.b]) / 700) : 0;
      var c = AV.map(function (v, j) { return Math.round(v + (OT[j] - v) * f); });
      ctx.strokeStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (0.16 + 0.42 * k * k + 0.12 * f).toFixed(3) + ")";
      ctx.lineWidth = sg.w * S / 520 + 0.3;
      ctx.beginPath(); ctx.moveTo(sg.x1 * S, sg.y1 * S); ctx.lineTo(sg.x2 * S, sg.y2 * S); ctx.stroke();
    }
  }
  function passo(ora) {
    if (T0 === null) T0 = ora;
    var s = (ora - T0) / 1000, tutte = true;
    for (var b = 0; b < N; b++) {
      if (arrivo[b] == null) {
        if (taglio(b, s) >= reach[b] - 1e-9) { arrivo[b] = ora; bottoni[b].classList.add("vista"); }
        else tutte = false;
      }
    }
    disegna(s, ora);
    if (tutte && !el.classList.contains("chiusa")) { el.classList.add("chiusa"); finito = ora + 1400; }
    if (finito && ora > finito) { disegna(99, ora + 1000); raf = null; return; }
    raf = requestAnimationFrame(passo);
  }
  function finale() {
    for (var b = 0; b < N; b++) { arrivo[b] = 0; bottoni[b].classList.add("vista"); }
    el.classList.add("chiusa"); disegna(99, 1e9);
  }
  misura();
  if (reduce) { finale(); }
  else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { io.disconnect(); raf = requestAnimationFrame(passo); }
    }, { threshold: 0.25 });
    io.observe(el);
  } else { raf = requestAnimationFrame(passo); }
  var ridisegna = function () { misura(); if (!raf && el.classList.contains("chiusa")) disegna(99, 1e9); };
  if ("ResizeObserver" in window) new ResizeObserver(ridisegna).observe(el); else window.addEventListener("resize", ridisegna);
})();
