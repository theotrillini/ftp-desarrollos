/* Plantas ilustradas de las casas de Los Ginkgos, con ambientes clicables.
   Unidades en decímetros (10 = 1 m). Dibujo esquemático a partir del plano de obra:
   el cuerpo principal se muestra derecho y el living (el ala del plano) conserva su giro.
   Cada ambiente indica las fotos de `galleries[uf]` (script.js) que le corresponden. */
const PLANTAS = {
    // UF 10: sobre el plano de obra original; cada ambiente es un polígono en píxeles del plano
    uf10: {
        imagen: 'images/uf10/plano.png', ancho: 754, alto: 478, vector: true,
        // vista 3D (render hecho sobre la maqueta calcada del plano): zona y punto de cada ambiente en píxeles del render
        render: {
            // vista desde arriba, mismo formato que la de la UF8 (1024 x 852)
            src: 'images/uf10/render-planta.webp', ancho: 1024, alto: 852,
            zonas: {
                living: [[575, 470], [760, 280], [915, 380], [770, 530], [700, 560], [620, 540]],
                cocina: [[400, 215], [560, 210], [600, 230], [600, 330], [555, 330], [555, 350], [410, 370]],
                comedor: [[410, 372], [555, 352], [575, 452], [420, 466]],
                dorm: [[222, 517], [440, 517], [445, 660], [236, 660]],
                nino: [[240, 237], [380, 227], [395, 402], [247, 402]],
                bano: [[207, 412], [380, 410], [384, 508], [212, 510]],
                frente: [[676, 580], [760, 544], [915, 412], [920, 660], [670, 660]],
                patio: [[98, 240], [150, 244], [228, 665], [98, 675]]
            },
            pins: { living: [700, 430], cocina: [520, 300], comedor: [445, 440], dorm: [390, 595], nino: [310, 355], bano: [255, 470], frente: [820, 595], patio: [150, 520] }
        },
        ambientes: [
            // id, nombre, medidas, fotos, polígono, punto, tono
            ['living', 'Living', '4,49 × 6,34 m', [4], [[452, 292], [591, 141], [714, 226], [576, 374]], [583, 258], 'calido'],
            ['cocina', 'Cocina', '2,95 × 2,20 m', [2], [[298, 92], [384, 96], [453, 84], [460, 164], [421, 172], [300, 178]], [372, 132], 'humedo'],
            ['comedor', 'Comedor', '3,15 × 4,23 m', [3], [[300, 180], [420, 175], [444, 288], [406, 294], [300, 298]], [360, 238], 'calido'],
            ['dorm', 'Cuarto principal', '4,23 × 3,86 m', [6, 7], [[144, 338], [304, 338], [328, 384], [328, 461], [164, 461]], [228, 400], 'calido'],
            ['nino', 'Cuarto de niño', '2,95 × 3,25 m', [8], [[158, 103], [276, 81], [289, 198], [164, 198]], [222, 145], 'calido'],
            ['bano', 'Baño principal', '', [9, 10, 11], [[114, 248], [265, 248], [271, 330], [140, 332], [126, 332]], [196, 290], 'humedo'],
            ['frente', 'Frente e ingreso', '', [0, 1], null, [600, 430]],
            ['patio', 'Patio', 'Entre el cuarto principal y el fondo', [5], [[40, 100], [92, 108], [160, 466], [40, 466]], [78, 330], 'verde']
        ],
        sinFoto: [
            ['Lavadero ext.', [[100, 114], [150, 104], [158, 184], [106, 188]], [128, 150]],
            ['Vestidor', [[308, 302], [404, 302], [409, 378], [332, 380], [308, 334]], [356, 340]],
            ['Toilette', [[333, 388], [406, 388], [408, 462], [333, 462]], [368, 410]],
            ['Palier', [[412, 300], [444, 294], [538, 396], [525, 418], [516, 429], [516, 461], [412, 461]], [466, 400]]
        ]
    },
    // UF 8: vista 3D desde arriba; solo se marcan los ambientes que tienen foto
    uf8: {
        render: {
            src: 'images/uf8/vista-3d.jpg', ancho: 1024, alto: 852,
            zonas: {
                living: [[232, 535], [520, 535], [520, 748], [232, 748]],
                cocina: [[110, 235], [300, 235], [300, 330], [190, 330], [190, 470], [290, 470], [290, 535], [110, 535]],
                dorm: [[598, 150], [806, 150], [806, 400], [598, 400]],
                suite: [[808, 150], [912, 150], [912, 316], [808, 316]],
                bano: [[596, 405], [756, 405], [756, 522], [526, 522], [526, 470], [596, 470]],
                semi: [[110, 74], [386, 74], [386, 232], [110, 232]],
                ingreso: [[526, 535], [640, 535], [640, 752], [526, 752]]
            },
            pins: { living: [380, 600], cocina: [150, 300], dorm: [690, 330], suite: [862, 232], bano: [650, 462], semi: [262, 200], ingreso: [585, 610] }
        },
        ambientes: [
            // id, nombre, medidas, fotos
            ['living', 'Living', '', [1]],
            ['cocina', 'Cocina', '', [2]],
            ['dorm', 'Dormitorio principal', '', [3]],
            ['suite', 'Baño en suite', '', [4]],
            ['bano', 'Baño', '', [5]],
            ['semi', 'Semicubierto y lavadero', '', [6, 7]],
            ['ingreso', 'Frente e ingreso', '', [0]]
        ]
    },
    // UF 7: dos plantas, una vista 3D por planta (mismo formato que la UF8)
    uf7: {
        pisos: [
            {
                nombre: 'Planta baja',
                render: {
                    src: 'images/uf7/vista-3d-planta-baja.webp', ancho: 1024, alto: 864,
                    zonas: {
                        estar: [[90, 385], [455, 385], [455, 560], [390, 560], [390, 745], [90, 745]],
                        cocina: [[80, 90], [390, 90], [390, 378], [80, 378]],
                        ingreso: [[388, 655], [545, 655], [545, 755], [505, 755], [505, 860], [430, 860], [430, 755], [388, 755]],
                        cochera: [[545, 58], [980, 58], [980, 375], [920, 375], [920, 864], [640, 864], [640, 375], [545, 375]]
                    },
                    pins: { estar: [252, 682], cocina: [300, 330], ingreso: [476, 690], cochera: [780, 470] }
                },
                ambientes: [
                    ['estar', 'Estar en doble altura', '', [2]],
                    ['cocina', 'Cocina y comedor', '', [3]],
                    ['ingreso', 'Frente e ingreso', '', [0, 1, 9]],
                    ['cochera', 'Cochera', '', [0]]
                ]
            },
            {
                nombre: 'Planta alta',
                render: {
                    src: 'images/uf7/vista-3d-planta-alta.webp', ancho: 1024, alto: 886,
                    zonas: {
                        doble: [[90, 440], [378, 440], [378, 800], [90, 800]],
                        dorm2: [[80, 145], [372, 145], [372, 425], [80, 425]],
                        bano: [[388, 68], [508, 68], [508, 315], [445, 315], [445, 230], [388, 230]],
                        dorm: [[650, 65], [940, 65], [940, 420], [650, 420]],
                        suite: [[512, 68], [645, 68], [645, 350], [512, 350]]
                    },
                    pins: { doble: [225, 571], dorm2: [298, 236], bano: [421, 111], dorm: [818, 231], suite: [580, 205] }
                },
                ambientes: [
                    ['doble', 'Doble altura sobre el estar', '', [2]],
                    ['dorm2', 'Dormitorio 2', '', [7]],
                    ['bano', 'Baño', '', [8]],
                    ['dorm', 'Dormitorio principal', '', [4]],
                    ['suite', 'Baño en suite', '', [5, 6]]
                ]
            }
        ]
    }
};

function dibujarPlanta(uf, svg, piso = 0) {
    const P = PLANTAS[uf];
    if (!P || !svg) return null;
    // casas de dos plantas: se muestra la planta elegida con sus ambientes
    if (P.pisos) Object.assign(P, { render: P.pisos[piso].render, ambientes: P.pisos[piso].ambientes, piso });
    if (P.render) return dibujarRender(P, svg);
    if (P.vector && window.UF10_MUROS) return dibujarVectorial(P, svg);
    if (P.imagen) return dibujarSobrePlano(P, svg);
    return dibujarEsquema(P, svg);
}

/* Vista 3D: el render de fondo con cada ambiente marcado encima para tocar */
function dibujarRender(P, svg) {
    const R = P.render, pts = p => p.map(q => q.join(',')).join(' ');
    let s = '<image href="' + R.src + '" width="' + R.ancho + '" height="' + R.alto + '"/>';
    s += '<g class="hot">' + P.ambientes.filter(a => R.zonas[a[0]]).map(([id, nom]) =>
        '<polygon data-amb="' + id + '" points="' + pts(R.zonas[id]) + '" class="pr-zona" tabindex="0" role="button" aria-label="Ver ' + nom + '"/>').join('') + '</g>';
    s += '<g>' + P.ambientes.filter(a => R.pins[a[0]]).map(([id, nom]) => {
        const [x, y] = R.pins[id], i = P.ambientes.findIndex(a => a[0] === id) + 1;
        return '<g class="pin" data-amb="' + id + '"><circle class="pulse" cx="' + x + '" cy="' + y + '" r="12"/><text x="' + x + '" y="' + (y + 4.5) + '" style="font-size:12px">' + i + '</text></g>' +
            '<text x="' + x + '" y="' + (y + 28) + '" class="pr-nombre">' + nom.toUpperCase() + '</text>';
    }).join('') + '</g>';
    svg.setAttribute('viewBox', '0 0 ' + R.ancho + ' ' + R.alto);
    svg.innerHTML = s;
    return P;
}

/* Plano redibujado en limpio: muros calcados del plano de obra (js/uf10-muros.js), pisos por ambiente,
   ventanas, muebles alineados con cada ambiente y puntos para tocar. */
function dibujarVectorial(P, svg) {
    const Mu = window.UF10_MUROS, k = Mu.escala;
    const pts = p => p.map(q => q.join(',')).join(' ');
    const linea = (x1, y1, x2, y2, c, e) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="' + c + '" style="stroke-width:' + e + 'px"/>';
    // mueble: centro en px, medidas en metros, giro en grados
    const mu = (cx, cy, a, p, giro, c, extra = '') => '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + giro + ')"><rect x="' + (-a * k / 2) + '" y="' + (-p * k / 2) + '" width="' + (a * k) + '" height="' + (p * k) + '" rx="2" class="' + c + '"/>' + extra + '</g>';
    const G = -11.1, GL = -46.5;
    const vetas = '<path d="M0 3.5H34M0 7H34M21 0V3.5M8 3.5V7" stroke="#DCC4A3" stroke-width=".5"/>';
    let s = '<defs>' +
        '<pattern id="pvWood" width="34" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-11)"><rect width="34" height="7" fill="#EAD9C1"/>' + vetas + '</pattern>' +
        '<pattern id="pvWoodL" width="34" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-46.5)"><rect width="34" height="7" fill="#EAD9C1"/>' + vetas + '</pattern>' +
        '<pattern id="pvTile" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(-11)"><rect width="11" height="11" fill="#ECEEEC"/><path d="M11 0V11M0 11H11" stroke="#D3D8D5" stroke-width=".5"/></pattern>' +
        '<pattern id="pvGrass" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#B9C79F"/><circle cx="3" cy="3" r="1" fill="#A6B68B"/><circle cx="7" cy="7" r=".9" fill="#C7D3AF"/></pattern>' +
        '</defs>';
    s += '<rect x="0" y="0" width="' + P.ancho + '" height="' + P.alto + '" fill="url(#pvGrass)"/>';
    s += linea(40, 20, 40, 478, 'pv-limite', 3) + '<text x="28" y="300" class="po-nombre po-muted" transform="rotate(-90 28 300)">VECINO DEL FONDO · OTRO BARRIO</text>';
    s += linea(40, 472, 754, 472, 'pv-limite', 3) + '<text x="250" y="465" class="po-nombre po-muted">MEDIANERA CON EL LOTE 11 · CERCO</text>';
    [[70, 220, 16], [64, 420, 13], [700, 80, 20], [680, 420, 16], [520, 50, 14]].forEach(([x, y, r]) => {
        s += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" class="pc-tree"/><circle cx="' + (x - r * .3) + '" cy="' + (y - r * .3) + '" r="' + (r * .45) + '" class="pc-tree2"/>';
    });
    // pisos de cada ambiente y de los pasillos
    const piso = { calido: 'url(#pvWood)', humedo: 'url(#pvTile)' };
    [[[104, 190], [160, 188], [164, 200], [262, 200], [266, 246], [112, 248]], [[262, 200], [292, 198], [300, 298], [306, 336], [276, 336], [270, 250], [266, 246]]].forEach(p => { s += '<polygon points="' + pts(p) + '" fill="url(#pvWood)"/>'; });
    P.ambientes.forEach(([id, , , , poly, , tono]) => { if (poly && tono !== 'verde') s += '<polygon points="' + pts(poly) + '" fill="' + (id === 'living' ? 'url(#pvWoodL)' : piso[tono]) + '"/>'; });
    P.sinFoto.forEach(([n, poly]) => { s += '<polygon points="' + pts(poly) + '" fill="' + (/Toilette/.test(n) ? 'url(#pvTile)' : /Lavadero/.test(n) ? '#E4DED3' : 'url(#pvWood)') + '"/>'; });
    // muebles
    s += '<g class="pv-muebles">' +
        mu(222, 402, 2.0, 1.6, 0, 'pc-fu', '<rect x="-36" y="-29" width="12" height="58" rx="2" class="pc-fu2"/><rect x="-6" y="-29" width="42" height="58" rx="2" class="pc-bl"/>') +
        mu(190, 372, .45, .45, 0, 'pc-fu') + mu(190, 432, .45, .45, 0, 'pc-fu') +
        mu(196, 150, .9, 1.9, G, 'pc-fu', '<rect x="-16" y="-34" width="32" height="12" rx="2" class="pc-fu2"/><rect x="-16" y="-10" width="32" height="44" rx="2" class="pc-bl"/>') +
        mu(252, 118, 1.0, .55, G, 'pc-fu') +
        mu(398, 104, 3.0, .6, G, 'pc-ct', '<circle cx="-22" cy="0" r="4" class="pc-ln"/><circle cx="-12" cy="0" r="4" class="pc-ln"/><rect x="14" y="-6" width="20" height="12" rx="2" class="pc-fu2"/>') +
        mu(372, 245, 1.6, .9, G, 'pc-fu') + [[-18, -24], [12, -24], [-18, 24], [12, 24]].map(([dx, dy]) => mu(372 + dx, 245 + dy, .42, .38, G, 'pc-fu2')).join('') +
        mu(205, 268, 1.2, .5, G, 'pc-ct', '<ellipse cx="-9" cy="0" rx="6" ry="4" class="pc-fu2"/><ellipse cx="9" cy="0" rx="6" ry="4" class="pc-fu2"/>') +
        mu(242, 300, .4, .6, G, 'pc-fu') + mu(150, 296, .9, 1.1, G, 'pc-fu', '<path d="M-16 -20L16 20M16 -20L-16 20" class="pc-ln"/>') +
        mu(354, 448, .6, .4, 0, 'pc-fu') + mu(399, 446, .35, .5, 0, 'pc-fu') +
        mu(356, 312, 2.4, .55, 0, 'pc-fu2') +
        mu(124, 136, .6, .6, G, 'pc-fu', '<circle r="7" class="pc-fu2"/>') + mu(128, 168, .6, .4, G, 'pc-ct') +
        mu(585, 258, 2.6, 1.8, GL, 'pc-rug') + mu(618, 302, 2.6, .9, GL, 'pc-fu', '<rect x="-47" y="5" width="94" height="11" rx="2" class="pc-fu2"/>') +
        mu(590, 262, 1.1, .6, GL, 'pc-fu') + mu(540, 222, 1.8, .4, GL, 'pc-fu2') + mu(560, 290, .8, .8, GL, 'pc-fu2') +
        '</g>';
    // muros y ventanas del calco
    const VENT = { 0: [[0.25, 0.6]], 2: [[0.3, 0.8]], 5: [[0.2, 0.75]], 6: [[0.68, 0.88]], 10: [[0.25, 0.75]], 11: [[0.15, 0.8]], 12: [[0.2, 0.9]] };
    Mu.exteriores.forEach(([x1, y1, x2, y2, e], i) => {
        s += linea(x1, y1, x2, y2, 'pv-muro', e + 1);
        (VENT[i] || []).forEach(([a, b]) => {
            const p = t => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t], q0 = p(a), q1 = p(b);
            s += linea(q0[0], q0[1], q1[0], q1[1], 'pv-vidrio', e - 3) + linea(q0[0], q0[1], q1[0], q1[1], 'pv-vidrio-l', 1);
        });
    });
    Mu.interiores.forEach(([x1, y1, x2, y2, e]) => { s += linea(x1, y1, x2, y2, 'pv-muro', e); });
    // zonas clicables, rótulos y puntos
    s += '<g class="hot">' + P.ambientes.filter(a => a[4]).map(([id, nom, , , poly]) =>
        '<polygon data-amb="' + id + '" points="' + pts(poly) + '" class="po-amb pv-zona" tabindex="0" role="button" aria-label="Ver ' + nom + '"/>').join('') + '</g>';
    P.sinFoto.forEach(([nom, , p]) => { s += '<text x="' + p[0] + '" y="' + p[1] + '" class="po-nombre po-muted">' + nom.toUpperCase() + '</text>'; });
    s += '<g>' + P.ambientes.map(([id, nom, , , , p], i) =>
        '<g class="pin" data-amb="' + id + '"><circle class="pulse" cx="' + p[0] + '" cy="' + p[1] + '" r="11"/><text x="' + p[0] + '" y="' + (p[1] + 4) + '" style="font-size:11px">' + (i + 1) + '</text></g>' +
        '<text x="' + p[0] + '" y="' + (p[1] + 25) + '" class="po-nombre">' + nom.toUpperCase() + '</text>').join('') + '</g>';
    svg.setAttribute('viewBox', '20 20 ' + (P.ancho - 10) + ' ' + (P.alto - 5));
    svg.innerHTML = s;
    return P;
}

/* Plano de obra original con los ambientes pintados encima y puntos para tocar */
function dibujarSobrePlano(P, svg) {
    const pts = p => p.map(q => q.join(',')).join(' ');
    let s = `<rect width="${P.ancho}" height="${P.alto}" class="po-papel"/>` +
        `<image href="${P.imagen}" width="${P.ancho}" height="${P.alto}" class="po-plano"/>`;
    P.sinFoto.forEach(([, poly]) => { s += `<polygon points="${pts(poly)}" class="po-amb po-neutro"/>`; });
    s += '<g class="hot">' + P.ambientes.filter(a => a[4]).map(([id, nom, , , poly, , tono]) =>
        `<polygon data-amb="${id}" points="${pts(poly)}" class="po-amb po-${tono}" tabindex="0" role="button" aria-label="Ver ${nom}"/>`).join('') + '</g>';
    P.sinFoto.forEach(([nom, , p]) => { s += `<text x="${p[0]}" y="${p[1]}" class="po-nombre po-muted">${nom.toUpperCase()}</text>`; });
    s += '<g>' + P.ambientes.map(([id, nom, , , , p], i) =>
        `<g class="pin" data-amb="${id}"><circle class="pulse" cx="${p[0]}" cy="${p[1]}" r="11"/><text x="${p[0]}" y="${p[1] + 4}" style="font-size:11px">${i + 1}</text></g>` +
        `<text x="${p[0]}" y="${p[1] + 25}" class="po-nombre">${nom.toUpperCase()}</text>`).join('') + '</g>';
    svg.setAttribute('viewBox', `40 20 ${P.ancho - 20} ${P.alto - 10}`);
    svg.innerHTML = s;
    return P;
}

function dibujarEsquema(P, svg) {
    const r = (x1, y1, x2, y2, c, ex = '') => `<rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}" class="${c}" ${ex}/>`;
    const ln = (x1, y1, x2, y2, c) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}"/>`;
    const door = (hx, hy, w, a0, a1) => {
        const R = d => d * Math.PI / 180, ox = hx + w * Math.cos(R(a0)), oy = hy + w * Math.sin(R(a0)), cx = hx + w * Math.cos(R(a1)), cy = hy + w * Math.sin(R(a1));
        return `<path d="M${hx} ${hy}L${ox.toFixed(1)} ${oy.toFixed(1)}" class="pc-dl"/><path d="M${ox.toFixed(1)} ${oy.toFixed(1)}A${w} ${w} 0 0 ${((a1 - a0 + 360) % 360) < 180 ? 1 : 0} ${cx.toFixed(1)} ${cy.toFixed(1)}" class="pc-da"/>`;
    };
    const arbol = (x, y, k = 6) => `<circle cx="${x}" cy="${y}" r="${k}" class="pc-tree"/><circle cx="${x - k * .3}" cy="${y - k * .3}" r="${k * .45}" class="pc-tree2"/>`;
    let s = `<defs>
        <pattern id="pcWood" width="30" height="5" patternUnits="userSpaceOnUse"><rect width="30" height="5" fill="#EAD9C1"/><path d="M0 2.5H30M0 5H30M18 0V2.5M6 2.5V5" stroke="#DCC4A3" stroke-width=".3"/></pattern>
        <pattern id="pcTile" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#ECEEEC"/><path d="M5 0V5M0 5H5" stroke="#D3D8D5" stroke-width=".3"/></pattern>
        <pattern id="pcGrass" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#B9C79F"/><circle cx="2" cy="2" r=".7" fill="#A6B68B"/><circle cx="5" cy="4.5" r=".6" fill="#C7D3AF"/></pattern>
        <pattern id="pcPav" width="12" height="6" patternUnits="userSpaceOnUse"><rect width="12" height="6" fill="#E4DED3"/><path d="M0 6H12M0 3H12M4 0V3M10 3V6" stroke="#D2CABD" stroke-width=".3"/></pattern>
        <pattern id="pcDeck" width="30" height="2.4" patternUnits="userSpaceOnUse"><rect width="30" height="2.4" fill="#C79C74"/><path d="M0 2.4H30" stroke="#A87E58" stroke-width=".3"/></pattern>
    </defs>`;
    // Exterior: la casa va pegada a la medianera del fondo y a la medianera con el lote vecino (con su cerco);
    // el patio queda del lado del living, hacia la calle interna
    s += r(-16, -12, 184, 112, 'pc-grass', 'fill="url(#pcGrass)"');
    s += r(172, -12, 184, 112, 'pc-pav', 'fill="url(#pcPav)"');
    s += ln(172, -12, 172, 112, 'pc-linea');
    s += r(-16, -10, 172, -4, 'pc-medianera');
    s += r(-16, 99, 172, 104, 'pc-medianera');
    s += ln(-16, 106, 172, 106, 'pc-cerco');
    s += arbol(150, 6, 8) + arbol(168, 40, 6) + arbol(166, 82, 7) + arbol(-8, 50, 5);
    s += r(86, 76, 96, 90, 'pc-floor', 'fill="url(#pcDeck)"');
    // Pisos
    s += r(0, 60, 54, 97, 'pc-floor', 'fill="url(#pcWood)"');
    s += r(15, 0, 46, 44, 'pc-floor', 'fill="url(#pcWood)"');
    s += r(0, 44, 30, 60, 'pc-floor', 'fill="url(#pcTile)"');
    s += r(30, 39, 46, 60, 'pc-floor', 'fill="url(#pcWood)"');
    s += r(46, 0, 86, 56, 'pc-floor', 'fill="url(#pcTile)"');
    s += r(0, 0, 15, 44, 'pc-floor', 'fill="url(#pcPav)"');
    s += r(54, 56, 86, 74, 'pc-floor', 'fill="url(#pcWood)"');
    s += r(54, 74, 66, 97, 'pc-floor', 'fill="url(#pcTile)"');
    s += r(66, 74, 86, 97, 'pc-floor', 'fill="url(#pcWood)"');
    // Living: el ala girada del plano, con ventanales al patio y puerta al comedor
    s += `<g transform="translate(94 82) rotate(23)">` +
        r(0, -63.4, 44.9, 0, 'pc-floor', 'fill="url(#pcWood)"') +
        `<path d="M0 0V-63.4H44.9V0Z" class="pc-wall-o"/>` +
        r(43.6, -50, 46.2, -14, 'pc-glass') + r(8, -1.3, 37, 1.3, 'pc-glass') + r(-1.3, -54, 1.3, -45, 'pc-door') +
        r(8, -61.5, 36, -58.5, 'pc-fu2') +
        r(6, -12, 34, -5, 'pc-fu') + r(6, -12, 34, -9.5, 'pc-fu2') + r(31, -30, 38, -5, 'pc-fu') + r(35.5, -30, 38, -5, 'pc-fu2') +
        r(4, -40, 34, -16, 'pc-rug') + `<rect x="12" y="-30" width="14" height="9" rx="1" class="pc-fu"/>` +
        `<rect x="5" y="-34" width="7" height="7" rx="2" class="pc-fu2"/><circle cx="40" cy="-55" r="2.6" class="pc-plant"/>` +
        `</g>`;
    // Muros exteriores y tabiques
    s += `<path d="M0 0H86V78M86 88V97H0V0" class="pc-wall-o"/>`;
    s += `<path d="M15 0V44M0 44H30M30 39V60M15 39H46M46 0V39M46 56H86M0 60H54M54 56V97M54 74H66M66 74V97" class="pc-wall-i"/>`;
    // Aberturas
    s += r(20, -1.5, 40, 1.5, 'pc-glass') + r(52, -1.5, 80, 1.5, 'pc-glass') + r(-1.5, 70, 1.5, 90, 'pc-glass') + r(84.5, 60, 87.5, 70, 'pc-glass');
    s += door(86, 78, 9, 180, 90) + door(54, 60, 7, 0, -90) + door(30, 50, 7, 180, 90) + door(15, 30, 6, 0, 90) + door(30, 39, 7, 90, 0) + door(66, 80, 6, 180, 90);
    // Equipamiento
    s += `<g class="pc-furn">` +
        // cuarto principal: cama doble con el respaldo contra la pared izquierda
        r(1, 68, 22, 86, 'pc-fu') + r(1.8, 69.5, 6, 76.5, 'pc-fu2') + r(1.8, 77.5, 6, 84.5, 'pc-fu2') + r(9, 68, 22, 86, 'pc-bl') +
        r(1, 62.5, 5.5, 66.5, 'pc-fu') + r(1, 87.5, 5.5, 91.5, 'pc-fu') + r(48, 66, 53, 90, 'pc-fu2') + r(30, 70, 40, 84, 'pc-rug') +
        // cocina
        r(47, 1, 85, 7, 'pc-ct') + r(79, 7, 85, 22, 'pc-ct') +
        `<rect x="56" y="2" width="8" height="4" rx=".6" class="pc-fu"/>` + [58, 62].map(x => `<circle cx="${x}" cy="4" r="1.2" class="pc-ln"/>`).join('') +
        `<rect x="70" y="2" width="7" height="4" rx=".6" class="pc-fu"/><rect x="71" y="2.6" width="5" height="2.8" rx=".5" class="pc-fu2"/>` +
        `<rect x="57" y="34" width="18" height="9" rx="1" class="pc-fu"/>` + [61, 71].map(x => `<rect x="${x - 2}" y="29.5" width="4" height="3.5" rx="1" class="pc-fu2"/><rect x="${x - 2}" y="44" width="4" height="3.5" rx="1" class="pc-fu2"/>`).join('') +
        // cuarto de niño: cama de una plaza, escritorio y placard
        r(18, 4, 27, 24, 'pc-fu') + r(19, 5, 26, 8.5, 'pc-fu2') + r(18, 11, 27, 24, 'pc-bl') +
        r(35, 3, 45, 9, 'pc-fu') + `<rect x="38" y="10" width="4" height="4" rx="1" class="pc-fu2"/>` + r(16, 34, 34, 38.5, 'pc-fu2') + r(30, 18, 40, 28, 'pc-rug') +
        // vestidor
        r(56, 57, 85, 61.5, 'pc-fu2') + r(80.5, 61.5, 85, 73, 'pc-fu2') +
        // lavadero (con termotanque)
        r(2, 3, 13, 13, 'pc-fu') + `<circle cx="7.5" cy="8" r="3.4" class="pc-fu2"/>` + r(2, 15, 13, 22, 'pc-ct') + `<ellipse cx="7.5" cy="18.5" rx="3" ry="1.8" class="pc-fu2"/>` + `<circle cx="7.5" cy="38" r="3.2" class="pc-boiler"/>` +
        // baño principal
        r(1, 45, 10, 59, 'pc-fu') + `<path d="M1 45L10 59M10 45L1 59" class="pc-ln"/>` + `<rect x="12" y="57" width="5" height="2" rx=".5" class="pc-fu"/><ellipse cx="14.5" cy="54" rx="2.2" ry="2.6" class="pc-fu"/>` +
        r(19, 45, 29, 50, 'pc-ct') + `<ellipse cx="21.8" cy="47.5" rx="1.8" ry="1.2" class="pc-fu2"/><ellipse cx="26.2" cy="47.5" rx="1.8" ry="1.2" class="pc-fu2"/>` +
        // toilette
        `<rect x="57" y="93" width="5" height="2" rx=".5" class="pc-fu"/><ellipse cx="59.5" cy="90" rx="2.2" ry="2.6" class="pc-fu"/><rect x="62" y="76" width="3.5" height="6" rx=".5" class="pc-fu"/>` +
        `</g>`;
    // Ambientes sin foto: solo rótulo
    P.sinFoto.forEach(([n, z]) => { if (z) s += `<text x="${(z[0] + z[2]) / 2}" y="${(z[1] + z[3]) / 2 + 1}" class="pc-name pc-muted">${n.toUpperCase()}</text>`; });
    s += `<text x="178" y="50" class="pc-street" transform="rotate(90 178 50)">CALLE INTERNA DEL BARRIO</text>`;
    s += `<text x="80" y="-6" class="pc-street pc-medianera-t">MEDIANERA · FONDO DEL TERRENO</text>`;
    s += `<text x="80" y="102.6" class="pc-street pc-medianera-t">MEDIANERA CON EL LOTE 11 · CERCO</text>`;
    // Zonas clicables y puntos
    s += '<g class="hot">' + P.ambientes.map(([id, nom, , , z]) =>
        `<rect data-amb="${id}" x="${z[0]}" y="${z[1]}" width="${z[2] - z[0]}" height="${z[3] - z[1]}" tabindex="0" role="button" aria-label="Ver ${nom}"/>`).join('') + '</g>';
    s += '<g>' + P.ambientes.map(([id, nom, , fotos, , p], i) =>
        `<g class="pin" data-amb="${id}"><circle class="pulse" cx="${p[0]}" cy="${p[1]}" r="4.6"/><text x="${p[0]}" y="${p[1] + 1.2}" style="font-size:3.4px">${i + 1}</text></g>` +
        `<text x="${p[0]}" y="${p[1] + 9}" class="pc-name">${nom.toUpperCase()}</text>`).join('') + '</g>';
    svg.setAttribute('viewBox', P.viewBox);
    svg.innerHTML = s;
    return P;
}
