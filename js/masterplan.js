/* Plano del barrio Los Ginkgos visto desde arriba, derecho, con la disposición del catastro (GeoARBA).
   Los lotes se dibujan parejos: cada lado de la calle interna tiene el mismo fondo y lotes del mismo ancho.
   Las superficies y frentes de la ficha son los reales:
   - Lotes 1 a 5: subparcelas 1 a 5 de la parcela 63D (Fracción 9) según ARBA: 516, 592, 443, 623 y 501 m².
   - Lotes 6 a 11: superficies de la planilla; frente aproximado = superficie / fondo de su sector.
   Calle interna (prolongación de Balcarce) en el medio y acceso desde Azcuénaga. */
(function () {
    const svg = document.getElementById('masterplan');
    if (!svg) return;

    const ESTADOS = {
        vendido: ['Vendido', 'st-vendido'],
        venta: ['A la venta', 'st-disponible'],
        obra: ['En obra', 'st-obra'],
        proyecto: ['En proyecto', 'st-proyecto'],
        proximo: ['Próximo proyecto', 'st-terreno', 'Próximo']
    };
    // n, quinta, estado, detalle, superficie (m²), frente (m), unidad con ficha
    const LOTES = [
        [1, 1, 'vendido', 'Casa vendida', 516.00, null],
        [2, 1, 'vendido', 'Casa vendida', 592.00, null],
        [3, 1, 'vendido', 'Casa vendida', 443.00, null],
        [4, 1, 'vendido', 'Casa de 131 m² vendida', 623.00, null, 'uf4'],
        [5, 1, 'vendido', 'Casa terminada y vendida', 501.00, null],
        [6, 2, 'proximo', 'Terreno para una próxima casa', 447.80],
        [7, 2, 'venta', 'En proyecto: plano listo, próximo inicio', 451.70, null, 'uf7'],
        [8, 2, 'venta', 'En obra, al 80% de avance', 452.03, null, 'uf8'],
        [9, 2, 'proximo', 'Terreno para una próxima casa', 582.20],
        [10, 2, 'venta', 'Casa terminada, lista para mudarse', 581.90, null, 'uf10'],
        [11, 2, 'proximo', 'Terreno para una próxima casa', 577.40]
    ];
    // con casa (vendida, en obra, terminada o en proyecto) se llama UF; si es solo terreno, Lote
    const nombre = n => LOTES[n - 1][3].startsWith('Terreno') ? 'Lote' : 'UF';

    /* Geometría base en metros, sin girar: x de izquierda a derecha, y desde el fondo (0) hacia Azcuénaga (AZ) */
    const AZ = 100.98, FONDO = 30, CALLE = 7.5;              // media calle de 7,50 m a cada lado del eje
    const L1 = [-CALLE - FONDO, -CALLE], L2 = [CALLE, CALLE + FONDO];
    const shapes = {}, centros = {};
    const tramo = (lado, k, cant) => { const w = AZ / cant, y2 = AZ - k * w; return [lado[0], y2 - w, lado[1], y2]; };
    LOTES.forEach(l => {
        const n = l[0];
        const r = n <= 5 ? tramo(L1, n - 1, 5) : tramo(L2, n - 6, 6);   // lote 1 y lote 6 sobre Azcuénaga
        shapes[n] = r;
        if (n >= 6 && !l[5]) l[5] = l[4] / (n <= 8 ? 27.82 : 39.79);   // frente aproximado; en 1-5 no se muestra
    });

    /* Plano derecho y horizontal, con la misma disposición que en el catastro:
       parcela 18 (lotes 1-5) abajo, lotes 6-11 arriba, Azcuénaga a la derecha. */
    const ANG = -90 * Math.PI / 180, C0 = [0, AZ / 2];
    const NORTE = -42.4;   // el norte real queda girado respecto del dibujo
    const rot = (x, y) => {
        const dx = x - C0[0], dy = y - C0[1];
        return [+(C0[0] + dx * Math.cos(ANG) - dy * Math.sin(ANG)).toFixed(2), +(C0[1] + dx * Math.sin(ANG) + dy * Math.cos(ANG)).toFixed(2)];
    };
    const poly = (x1, y1, x2, y2) => [[x1, y1], [x2, y1], [x2, y2], [x1, y2]].map(p => rot(...p).join(',')).join(' ');
    const DEG = ANG * 180 / Math.PI;

    // banda cruzada en la esquina de arriba a la derecha de cada lote, con su estado
    // (recortada con la forma del lote para que no se salga)
    const BANDA = { vendido: 'VENDIDO', venta: 'EN VENTA', proximo: 'PRÓXIMO' };
    const banda = (n, est, x1, y1, x2, y2) => {
        const pts = [rot(x1 + .45, y1 + .45), rot(x2 - .45, y2 - .45)];
        // en pantallas angostas el plano se achica: la banda va más grande para que se lea
        const g = innerWidth < 600 ? 1.55 : 1, xr = Math.max(pts[0][0], pts[1][0]), yt = Math.min(pts[0][1], pts[1][1]), k = 5.2 * g;
        return `<clipPath id="mpc${n}"><polygon points="${poly(x1 + .45, y1 + .45, x2 - .45, y2 - .45)}"/></clipPath>` +
            `<g class="mp-flag mp-flag-${est}" clip-path="url(#mpc${n})"><g transform="translate(${xr - k} ${yt + k}) rotate(45) scale(${g})">` +
            `<rect x="-16" y="-1.9" width="32" height="3.8"/><text x="0" y=".75">${BANDA[est]}</text></g></g>`;
    };

    let s = '';
    // Lotes
    s += '<g class="mp-lots">';
    LOTES.forEach(([n, , est]) => {
        const [x1, y1, x2, y2] = shapes[n], [cx, cy] = rot((x1 + x2) / 2, (y1 + y2) / 2);
        s += `<g class="mp-lot ${ESTADOS[est][1]}" data-n="${n}" tabindex="0" role="button" aria-label="${nombre(n)} ${n}: ${ESTADOS[est][0]}">` +
            `<polygon points="${poly(x1 + .45, y1 + .45, x2 - .45, y2 - .45)}"/>` +
            `<text x="${cx}" y="${cy + 1}" class="mp-n">${String(n).padStart(2, '0')}</text>` +
            (BANDA[est] ? banda(n, est, x1, y1, x2, y2) : `<text x="${cx}" y="${cy + 5.2}" class="mp-st">${(ESTADOS[est][2] || ESTADOS[est][0]).toUpperCase()}</text>`) + '</g>';
    });
    s += '</g>';
    // Nombres de calles, acceso y norte
    const az = rot(-25, AZ + 9.4);
    s += `<text x="${az[0]}" y="${az[1]}" class="mp-street-name" transform="rotate(${DEG.toFixed(1)} ${az[0]} ${az[1]})">CALLE AZCUÉNAGA</text>`;
    // al fondo (lotes 5 y 11) limita con el Barrio Las Acacias
    const ac = rot(0, -9);
    s += `<text x="${ac[0]}" y="${ac[1]}" class="mp-street-name" transform="rotate(${DEG.toFixed(1)} ${ac[0]} ${ac[1]})">BARRIO LAS ACACIAS</text>`;
    const ci = rot(0, 20);
    s += `<text x="${ci[0]}" y="${ci[1]}" class="mp-street-name" transform="rotate(${(DEG + 90).toFixed(1)} ${ci[0]} ${ci[1]})">CALLE INTERNA</text>`;
    const f1 = rot(0, AZ + 11), f2 = rot(0, AZ - 7), fa = rot(-2.4, AZ - 3.5), fb = rot(2.4, AZ - 3.5), fl = rot(3.4, AZ - 10);
    s += `<path d="M${f1}L${f2}M${fa}L${f2}L${fb}" class="mp-arrow"/>`;
    s += `<text x="${fl[0]}" y="${fl[1]}" class="mp-small">ACCESO</text>`;

    // Encuadre: lo que rodea al barrio, con el norte arriba a la izquierda
    const pts = [[L1[0] - 6, -16], [L2[1] + 6, -16], [L2[1] + 6, AZ + 18], [L1[0] - 6, AZ + 18]].map(p => rot(...p));
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const W0 = Math.min(...xs), H0 = Math.min(...ys), W = Math.max(...xs) - W0, H = Math.max(...ys) - H0;
    const nx = W0 + 11, ny = H0 + 14;
    s += `<g class="mp-norte" transform="rotate(${NORTE} ${nx} ${ny})"><circle cx="${nx}" cy="${ny}" r="5.5"/><path d="M${nx} ${ny - 4.2}L${nx + 2.2} ${ny + 2.6}L${nx} ${ny + 1.2}L${nx - 2.2} ${ny + 2.6}Z"/><text x="${nx}" y="${ny - 6.6}">N</text></g>`;
    // de fondo, la vista aérea del barrio: se armó sobre este mismo encuadre, así los lotes coinciden con la foto
    s = `<image href="images/barrio/plano-aereo.webp" x="${W0}" y="${H0}" width="${W}" height="${H}" preserveAspectRatio="none"/>` + s;
    svg.setAttribute('viewBox', `${W0.toFixed(1)} ${H0.toFixed(1)} ${W.toFixed(1)} ${H.toFixed(1)}`);
    svg.innerHTML = s;

    /* En la página de una casa: solo marca su lote y lleva a las otras casas */
    if (svg.dataset.lote) {
        const n0 = +svg.dataset.lote;
        svg.querySelectorAll('.mp-lot').forEach(g => {
            const l = LOTES[+g.dataset.n - 1];
            g.classList.toggle('on', +g.dataset.n === n0);
            g.classList.toggle('mp-mute', +g.dataset.n !== n0);
            g.addEventListener('click', () => { location.href = l[6] ? 'casa.html?uf=' + l[6] : 'barrio-los-ginkgos.html#lotes'; });
        });
        return;
    }

    /* Ficha lateral */
    const card = document.getElementById('mpCard');
    const fmt = v => v.toFixed(2).replace('.', ',');
    // Fotos y planos de cada casa: las mismas galerías que usan las fichas (script.js)
    const fotos = uf => (typeof galleries !== 'undefined' && galleries[uf]) || [];
    const nombres = uf => [...document.querySelectorAll(`.gthumb[data-gal="${uf}"]`)].map(i => i.alt);
    function casa(uf) {
        const imgs = fotos(uf);
        if (!imgs.length) return '';
        const alts = nombres(uf);
        const plano = alts.findIndex(a => /plan/i.test(a));
        const mini = imgs.slice(1, 5).map((src, i) =>
            `<button type="button" data-open="${i + 1}" aria-label="Ver ${alts[i + 1] || 'foto'}"><img src="${src}" alt="" loading="lazy"></button>`).join('');
        return `<button type="button" class="mp-photo" data-open="0" aria-label="Ver fotos de la casa">` +
            `<img src="${imgs[0]}" alt="${alts[0] || 'Casa'}"><span>${imgs.length} fotos${plano >= 0 ? ' y planos' : ''}</span></button>` +
            (mini ? `<div class="mp-thumbs">${mini}</div>` : '') +
            `<div class="mp-actions">` +
            (plano >= 0 ? `<button type="button" class="btn-primary" data-open="${plano}">Ver planta</button>` : `<button type="button" class="btn-primary" data-open="0">Ver fotos</button>`) +
            `<a href="casa.html?uf=${uf}" class="btn-outline">Ver proyecto</a></div>`;
    }
    let actual = null;
    function show(n) {
        if (n === actual) return;
        actual = n;
        const [, , est, det, sup, fr, uf] = LOTES[n - 1];
        svg.querySelectorAll('.mp-lot').forEach(g => g.classList.toggle('on', +g.dataset.n === n));
        const esUF = nombre(n) === 'UF';
        const wa = 'https://wa.me/5491159951188?text=' + encodeURIComponent(`Hola! Me interesa ${esUF ? 'la UF' : 'el lote'} ${n} del Barrio Los Ginkgos.`);
        card.dataset.casa = uf || '';
        card.innerHTML =
            `<span class="mp-chip ${ESTADOS[est][1]}">${ESTADOS[est][0]}</span>` +
            `<h3>${nombre(n)} ${String(n).padStart(2, '0')}</h3>` +
            `<p>${det}</p>` +
            (uf ? casa(uf) : '') +
            `<dl>` +
            (fr ? `<div><dt>Frente</dt><dd>≈ ${fr.toFixed(1).replace('.', ',')} m</dd></div>` : '') +
            `<div><dt>Superficie</dt><dd>${fmt(sup)} m²</dd></div></dl>` +
            (est === 'vendido' ? '' : `<a href="${wa}" target="_blank" rel="noopener" class="btn-outline btn-block">Consultar por ${esUF ? 'esta unidad' : 'este lote'}</a>`);
    }
    const pick = e => { const g = e.target.closest('.mp-lot'); return g && +g.dataset.n; };
    svg.addEventListener('mouseover', e => { const n = pick(e); if (n) show(n); });
    svg.addEventListener('focusin', e => { const n = pick(e); if (n) show(n); });
    svg.addEventListener('click', e => { const n = pick(e); if (n) { show(n); if (window.matchMedia('(max-width: 900px)').matches) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } });
    svg.addEventListener('keydown', e => { const n = pick(e); if (n && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); show(n); } });
    card.addEventListener('click', e => {
        const o = e.target.closest('[data-open]');
        if (o && card.dataset.casa && window.openLightboxGal) { window.openLightboxGal(card.dataset.casa, +o.dataset.open); return; }
    });
    show(10);
})();
