/* Página de una casa de Los Ginkgos: casa.html?uf=uf10 (también uf8, uf7, uf4). */
(function () {
    const uf = new URLSearchParams(location.search).get('uf');
    const c = CASAS[uf];
    if (!c) { location.replace('barrio-los-ginkgos.html#lotes'); return; }
    const $ = id => document.getElementById(id);
    const n = uf.replace('uf', '');
    const fotos = galleries[uf] || [];
    const nombres = FOTOS[uf] || [];

    document.title = `UF ${n} · Lote ${c.lote} | Barrio Los Ginkgos | FTP Desarrollos`;
    const wa = 'https://wa.me/5491159951188?text=' + encodeURIComponent(`Hola! Me interesa la UF ${n} del Barrio Los Ginkgos. ¿Podrían darme más información?`);
    ['navWa', 'ciWa', 'waFloat'].forEach(id => { $(id).href = wa; });

    /* Portada y datos */
    $('heroBg').style.backgroundImage = `url('${fotos[0]}')`;
    $('heroTag').textContent = `Barrio Los Ginkgos · Lote ${c.lote}`;
    $('heroTitle').innerHTML = `UF ${n}`;
    $('heroSub').innerHTML = `<span class="${c.estado[1]}">${c.estado[0]}</span> ${c.resumen}`;
    $('facts').innerHTML = c.specs.map(([v, l]) => `<div><dt>${l}</dt><dd>${v}</dd></div>`).join('') + `<div><dt>Estado</dt><dd class="dd-txt">${c.estado[0]}</dd></div>`;
    $('casaTitle').innerHTML = `Unidad Funcional <em>${n}</em>`;
    $('casaDesc').innerHTML = c.desc.map(p => `<p>${p}</p>`).join('');
    $('casaTags').innerHTML = c.tags.map(t => `<span>✓ ${t}</span>`).join('');
    $('formUnit').value = uf;
    $('formTitle').textContent = c.venta ? `Consultá por la UF ${n}` : 'Consultá por casas disponibles';

    /* Recorrido por la planta ilustrada: cada ambiente abre sus fotos */
    const planta = typeof PLANTAS !== 'undefined' && PLANTAS[uf] ? dibujarPlanta(uf, $('plantaCasa')) : null;
    if (planta) {
        $('recorrido').hidden = false;
        // render vertical (más alto que ancho): la imagen va en una columna más angosta
        if (planta.render && planta.render.alto > planta.render.ancho) $('recorrido').classList.add('vertical');
        $('navPlanta').hidden = false;
        $('heroBtn').href = '#recorrido'; $('heroBtn').textContent = 'Recorrer la casa';
        $('heroBtnPlanta')?.removeAttribute('hidden');
        const amb = id => planta.ambientes.find(a => a[0] === id);
        const preview = id => {
            const [, nom, med, fs] = amb(id);
            $('pvImg').src = fotos[fs[0]]; $('pvImg').alt = nom; $('pvImg').dataset.amb = id;
            $('pvT').textContent = nom;
            $('pvS').textContent = [med, fs.length + (fs.length > 1 ? ' fotos' : ' foto')].filter(Boolean).join(' · ');
            $('plantaCasa').querySelectorAll('.hot [data-amb]').forEach(r => r.classList.toggle('on', r.dataset.amb === id));
            $('ambList').querySelectorAll('li').forEach(li => li.classList.toggle('on', li.dataset.amb === id));
        };
        const abrir = id => { preview(id); openLightboxGal(uf, amb(id)[3][0]); };
        const lista = () => {
            $('ambList').innerHTML = planta.ambientes.map(([id, nom, , fs], i) =>
                `<li data-amb="${id}" tabindex="0"><b>${i + 1}</b><span>${nom}</span><em>${fs.length} ${fs.length > 1 ? 'fotos' : 'foto'}</em></li>`).join('');
            preview(planta.ambientes[0][0]);
        };
        // casas de dos plantas: pestañas para pasar de una a otra
        if (planta.pisos) {
            const tabs = $('pisoTabs');
            tabs.hidden = false;
            planta.pisos.forEach(p => { new Image().src = p.render.src; });   // que el cambio de planta no parpadee
            tabs.innerHTML = planta.pisos.map((p, i) => `<button type="button" role="tab" data-i="${i}" aria-selected="${i === 0}">${p.nombre}</button>`).join('');
            tabs.addEventListener('click', e => {
                const b = e.target.closest('[data-i]'); if (!b) return;
                dibujarPlanta(uf, $('plantaCasa'), +b.dataset.i); lista();
                tabs.querySelectorAll('button').forEach(x => x.setAttribute('aria-selected', x === b ? 'true' : 'false'));
            });
        }
        const pick = e => { const t = e.target.closest('[data-amb]'); return t && t.dataset.amb; };
        [$('plantaCasa'), $('ambList')].forEach(el => {
            el.addEventListener('mouseover', e => { const id = pick(e); if (id) preview(id); });
            el.addEventListener('focusin', e => { const id = pick(e); if (id) preview(id); });
            el.addEventListener('click', e => { const id = pick(e); if (id) abrir(id); });
            el.addEventListener('keydown', e => { const id = pick(e); if (id && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); abrir(id); } });
        });
        $('pvImg').addEventListener('click', () => abrir($('pvImg').dataset.amb));
        lista();
    }

    /* Planos: los propios de la casa o los que están dentro de la galería */
    let planos = c.planos === 'gal'
        ? fotos.map((src, i) => [src, nombres[i], i]).filter(p => /plan/i.test(p[1]))
        : c.planos.map(([src, cap]) => [src, cap, null]);
    if (!planos.length) {
        $('planos').hidden = true; $('navPlanos').hidden = true;
    } else {
        galleries[uf + '-planos'] = planos.map(p => p[0]);
        FOTOS[uf + '-planos'] = planos.map(p => p[1]);
        let k = 0;
        const verPlano = i => {
            k = i; $('planoImg').src = planos[i][0]; $('planoImg').alt = planos[i][1]; $('planoCap').textContent = `UF ${n} · ${planos[i][1]}`;
            $('planoTabs').querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-selected', j === i ? 'true' : 'false'));
        };
        $('planoTabs').innerHTML = planos.length > 1 ? planos.map((p, i) => `<button type="button" role="tab" data-i="${i}">${p[1]}</button>`).join('') : '';
        $('planoTabs').addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) verPlano(+b.dataset.i); });
        const ampliar = () => openLightboxGal(uf + '-planos', k);
        $('planoZoom').addEventListener('click', ampliar);
        $('planoImg').addEventListener('click', ampliar);
        verPlano(0);
    }

    /* Fotos */
    // los planos tienen su propia sección: acá van solo las fotos (el índice sigue siendo el de la galería)
    const grid = $('fotosGrid');
    const soloFotos = fotos.map((src, i) => [src, i]).filter(([, i]) => !(c.planos === 'gal' && /plan/i.test(nombres[i] || '')));
    // 3 o 4 columnas según cuál llene las filas (la primera foto ocupa 2 x 2); si sobra lugar, la última se estira
    const nf = soloFotos.length, cols = nf === 1 ? 1 : (nf + 3) % 3 === 0 ? 3 : 4, sobra = nf === 1 ? 0 : (cols - (nf + 3) % cols) % cols;
    grid.innerHTML = soloFotos.map(([src, i], k) =>
        `<figure tabindex="0" role="button" data-i="${i}" class="${k === 0 ? 'wide' : ''}${k === nf - 1 && sobra ? ' sp' + (sobra + 1) : ''}"><img src="${src}" alt="${nombres[i] || ''}" loading="lazy"><figcaption>${nombres[i] || ''}</figcaption></figure>`).join('');
    grid.classList.add('c' + cols);
    grid.addEventListener('click', e => { const f = e.target.closest('figure'); if (f) openLightboxGal(uf, +f.dataset.i); });
    grid.addEventListener('keydown', e => { const f = e.target.closest('figure'); if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLightboxGal(uf, +f.dataset.i); } });

    /* Otras casas */
    $('otras').innerHTML = Object.keys(CASAS).filter(k => k !== uf).map(k => {
        const o = CASAS[k];
        return `<a href="casa.html?uf=${k}" class="otra"><img src="${galleries[k][0]}" alt="" loading="lazy"><div><span class="${o.estado[1]}">${o.estado[0]}</span><b>UF ${k.replace('uf', '')}</b><small>Lote ${o.lote}</small></div></a>`;
    }).join('');

    /* Ubicación: el plano del barrio marca este lote */
    $('masterplan').dataset.lote = c.lote;
})();
