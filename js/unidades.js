/* Unidades del barrio (barrio-los-ginkgos.html): tarjetas y fichas desplegables armadas con los mismos
   datos que casa.html (CASAS y FOTOS en casas.js, galleries en script.js), así todas quedan iguales. */
(function () {
    const cards = document.getElementById('ufCards'), detalles = document.getElementById('ufDetails');
    if (!cards || !detalles || typeof CASAS === 'undefined') return;
    const zoom = '<div class="gallery-zoom-hint"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> Clic para ampliar</div>';
    // en el listado: las disponibles primero, la vendida al final
    const orden = Object.keys(CASAS).sort((a, b) => (CASAS[b].venta ? 1 : 0) - (CASAS[a].venta ? 1 : 0));

    cards.innerHTML = orden.map(uf => {
        const c = CASAS[uf], n = uf.replace('uf', ''), fotos = galleries[uf] || [];
        return `<div class="ufc${c.venta ? '' : ' ufc-vendida'}" id="card-${uf}" onclick="toggleUF('${uf}', this)">` +
            `<div class="ufc-img"><img loading="lazy" src="${fotos[0]}" alt="UF ${n}"><span class="${c.estado[1]}">${c.estado[0]}</span></div>` +
            `<div class="ufc-body"><div class="ufc-top"><h3>UF ${n}</h3></div>` +
            `<div class="ufc-specs-row">${c.specs.slice(0, 3).map(([v, l]) => `<span>${v} ${l.toLowerCase()}</span>`).join('')}</div>` +
            `<div class="ufc-toggle">Ver detalles <span class="ufc-arrow">↓</span></div></div></div>`;
    }).join('');

    detalles.innerHTML = orden.map(uf => {
        const c = CASAS[uf], n = uf.replace('uf', ''), fotos = galleries[uf] || [], nombres = FOTOS[uf] || [];
        const wa = 'https://wa.me/5491159951188?text=' + encodeURIComponent(`Hola! Me interesa la UF ${n} del Barrio Los Ginkgos. ¿Podrían darme más información?`);
        return `<div class="uf-detail" id="detail-${uf}"><div class="uf-detail-inner${c.venta ? '' : ' ufd-vendida'}">` +
            `<div class="ufd-header"><div><span class="${c.estado[1]}">${c.estado[0]}</span><h3>Unidad Funcional ${n}</h3></div></div>` +
            `<div class="ufd-body"><div class="uf-gallery">` +
            `<div class="gallery-main" data-gal="${uf}" onclick="openLightboxGal('${uf}', currentIndex)"><img loading="lazy" src="${fotos[0]}" alt="UF ${n} ${nombres[0] || ''}" id="mainImg-${uf}">${zoom}</div>` +
            `<div class="gallery-strip">${fotos.map((src, i) => `<img loading="lazy" src="${src}" class="gthumb${i ? '' : ' active'}" data-gal="${uf}" data-i="${i}" alt="${nombres[i] || ''}">`).join('')}</div>` +
            `</div><div class="ufd-info">` +
            `<div class="uf-specs">${c.specs.map(([v, l]) => `<div class="spec"><span class="sv">${v}</span><span class="sl">${l}</span></div>`).join('')}</div>` +
            `<div class="uf-desc">${c.desc.map(p => `<p>${p}</p>`).join('')}</div>` +
            `<div class="uf-tags">${c.tags.map(t => `<span>✓ ${t}</span>`).join('')}</div>` +
            `<a href="casa.html?uf=${uf}" class="btn-outline btn-block">Ver proyecto completo →</a>` +
            (c.venta ? `<a href="${wa}" class="btn-primary btn-block" target="_blank" rel="noopener">Consultar por WhatsApp</a>` : '<span class="btn-no-disponible">Esta unidad ya no está disponible</span>') +
            `</div></div></div></div>`;
    }).join('');

    detalles.addEventListener('click', e => {
        const t = e.target.closest('.gthumb');
        if (t) setMainImage(t.dataset.gal, +t.dataset.i);
    });
})();
