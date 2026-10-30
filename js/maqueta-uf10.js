/* Maqueta 3D de la UF 10, levantada sobre el plano original.
   Los muros salen del calco de js/uf10-muros.js (píxeles de images/uf10/plano.png) y el plano
   se usa como base dentro de la casa, así la maqueta respeta exactamente la planta. */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const host = document.getElementById('maqueta3d');
if (host && window.UF10_MUROS) iniciar(window.UF10_MUROS);

function iniciar(P) {
    const W = () => host.clientWidth, H = () => host.clientHeight;
    const E = P.escala, CX = 405, CY = 260;                 // centro de la casa en el plano
    const X = x => (x - CX) / E, Z = y => (y - CY) / E;     // píxeles del plano a metros

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W(), H());
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe4e9e4);
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.25;

    const camera = new THREE.PerspectiveCamera(30, W() / H(), 0.5, 200);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0.6, 0, 0.4);
    controls.enableDamping = true; controls.enablePan = false;
    controls.minPolarAngle = 0.12; controls.maxPolarAngle = 1.12;
    controls.minDistance = 10; controls.maxDistance = 60;
    const encuadre = () => { const k = Math.max(1, 1.75 / (W() / H())); camera.position.set(0.6, 20 * k, 0.4 + 15 * k); };
    encuadre(); controls.update();

    scene.add(new THREE.HemisphereLight(0xfdf6ea, 0xb4b39c, 1.1));
    const sol = new THREE.DirectionalLight(0xfff1dc, 2.3);
    sol.position.set(-10, 22, 12); sol.castShadow = true;
    sol.shadow.mapSize.set(2048, 2048);
    Object.assign(sol.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14, near: 1, far: 60 });
    sol.shadow.bias = -0.0004; sol.shadow.radius = 4;
    scene.add(sol);

    /* Materiales */
    const canvasTex = (w, h, draw, rx, ry) => {
        const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
        const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); t.colorSpace = THREE.SRGBColorSpace; return t;
    };
    const pasto = canvasTex(256, 256, (g, w, h) => {
        g.fillStyle = '#88a462'; g.fillRect(0, 0, w, h);
        for (let i = 0; i < 6000; i++) { g.fillStyle = Math.random() < .5 ? 'rgba(70,100,45,.35)' : 'rgba(170,195,120,.3)'; g.fillRect(Math.random() * w, Math.random() * h, 1, 3); }
    }, 18, 14);
    const M = {
        pared: new THREE.MeshStandardMaterial({ color: 0xf4f1ec, roughness: 0.9 }),
        medianera: new THREE.MeshStandardMaterial({ color: 0xc9bfb2, roughness: 0.95 }),
        vidrio: new THREE.MeshPhysicalMaterial({ color: 0xbfd6e2, roughness: 0.05, transparent: true, opacity: 0.45 }),
        marco: new THREE.MeshStandardMaterial({ color: 0x1f1f1f, roughness: 0.5 }),
        pasto: new THREE.MeshStandardMaterial({ map: pasto, roughness: 1 }),
        tela: new THREE.MeshStandardMaterial({ color: 0xd8cfc2, roughness: 1 }),
        tela2: new THREE.MeshStandardMaterial({ color: 0xb9a48c, roughness: 1 }),
        sabana: new THREE.MeshStandardMaterial({ color: 0xf6f3ee, roughness: 1 }),
        manta: new THREE.MeshStandardMaterial({ color: 0x9fae8a, roughness: 1 }),
        madera: new THREE.MeshStandardMaterial({ color: 0xb08559, roughness: 0.7 }),
        mesada: new THREE.MeshStandardMaterial({ color: 0xf5f4f1, roughness: 0.3 }),
        losa: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 }),
        jade: new THREE.MeshStandardMaterial({ color: 0x5e8c7c, roughness: 0.5 }),
        negro: new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.6 }),
        hoja: new THREE.MeshStandardMaterial({ color: 0x6f8f4e, roughness: 1 }),
        hoja2: new THREE.MeshStandardMaterial({ color: 0x89a862, roughness: 1 }),
        tronco: new THREE.MeshStandardMaterial({ color: 0x6b5442, roughness: 1 })
    };

    /* Terreno con pasto y el plano como piso de la casa */
    const suelo = new THREE.Mesh(new THREE.PlaneGeometry(44, 34), M.pasto);
    suelo.rotation.x = -Math.PI / 2; suelo.position.y = -0.02; suelo.receiveShadow = true; scene.add(suelo);
    const huella = [[92, 108], [378, 52], [384, 94], [453, 80], [462, 166], [422, 174], [446, 290], [591, 137], [719, 226], [578, 378], [540, 398], [525, 418], [500, 466], [160, 466]];
    const forma = new THREE.Shape(huella.map(([x, y]) => new THREE.Vector2(X(x), -Z(y))));
    const geo = new THREE.ShapeGeometry(forma);
    const uv = geo.attributes.uv, pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) * E + CX) / 754, 1 - (-pos.getY(i) * E + CY) / 478);
    const planoTex = new THREE.TextureLoader().load('images/uf10/plano.png', () => pedir());
    planoTex.colorSpace = THREE.SRGBColorSpace; planoTex.anisotropy = 8;
    const piso = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: planoTex, color: 0xf2ece2, roughness: 0.9 }));
    piso.rotation.x = -Math.PI / 2; piso.position.y = 0.01; piso.receiveShadow = true; scene.add(piso);

    /* Muros: cajas a lo largo de cada tramo del calco */
    const ALTO = 1.15;
    function tramo(x1, y1, x2, y2, esp, alto, base, mat) {
        const dx = X(x2) - X(x1), dz = Z(y2) - Z(y1), L = Math.hypot(dx, dz);
        if (L < 0.02) return;
        const m = new THREE.Mesh(new THREE.BoxGeometry(L + esp / E, alto, esp / E), mat);
        m.position.set((X(x1) + X(x2)) / 2, base + alto / 2, (Z(y1) + Z(y2)) / 2);
        m.rotation.y = -Math.atan2(dz, dx);
        m.castShadow = m.receiveShadow = true; scene.add(m);
    }
    // Ventanas: [índice del muro exterior, desde, hasta] en fracción del tramo
    const VENTANAS = { 0: [[0.25, 0.6]], 2: [[0.3, 0.8]], 5: [[0.2, 0.75]], 6: [[0.68, 0.88]], 10: [[0.25, 0.75]], 11: [[0.15, 0.8]], 12: [[0.2, 0.9]] };
    P.exteriores.forEach(([x1, y1, x2, y2, e], i) => {
        const lerp = t => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
        let t0 = 0;
        (VENTANAS[i] || []).forEach(([a, b]) => {
            tramo(...lerp(t0), ...lerp(a), e, ALTO, 0, M.pared);
            tramo(...lerp(a), ...lerp(b), e, 0.6, 0, M.pared);
            tramo(...lerp(a), ...lerp(b), e * 0.25, ALTO - 0.6, 0.6, M.vidrio);
            tramo(...lerp(a), ...lerp(b), e * 0.6, 0.04, ALTO - 0.04, M.marco);
            t0 = b;
        });
        tramo(...lerp(t0), x2, y2, e, ALTO, 0, M.pared);
    });
    P.interiores.forEach(([x1, y1, x2, y2, e]) => tramo(x1, y1, x2, y2, e, ALTO, 0, M.pared));

    /* Medianeras y cerco del terreno */
    tramo(60, 92, 470, 12, 14, 2.0, 0, M.medianera);          // fondo
    tramo(60, 480, 740, 480, 12, 1.0, 0, M.medianera);         // lote 11 (más baja para no tapar la casa)
    for (let x = 70; x < 740; x += 40) tramo(x, 492, x + 1, 492, 5, 1.3, 0, M.tronco);
    tramo(60, 492, 740, 492, 2, 1.1, 0, M.tronco);

    /* Muebles alineados con cada ambiente (centro en px del plano, medidas en m, giro del ambiente) */
    const GIRO = -11.1, GIRO_LIV = -46.5;
    function mueble(cx, cy, ancho, prof, alto, mat, giro = GIRO, base = 0) {
        const m = new THREE.Mesh(new RoundedBoxGeometry(ancho, alto, prof, 2, Math.min(0.05, ancho / 4, alto / 4, prof / 4)), mat);
        m.position.set(X(cx), base + alto / 2, Z(cy)); m.rotation.y = -giro * Math.PI / 180;
        m.castShadow = m.receiveShadow = true; scene.add(m); return m;
    }
    // cuarto principal (abajo a la izquierda, pared de abajo derecha)
    mueble(222, 402, 2.0, 1.6, 0.48, M.sabana, 0); mueble(240, 402, 1.3, 1.62, 0.06, M.manta, 0, 0.48);
    mueble(188, 402, 0.12, 1.7, 1.0, M.madera, 0);
    mueble(190, 372, 0.45, 0.45, 0.5, M.madera, 0); mueble(190, 432, 0.45, 0.45, 0.5, M.madera, 0);
    // cuarto de niño
    mueble(196, 150, 0.9, 1.9, 0.42, M.sabana); mueble(198, 162, 0.92, 1.2, 0.06, M.tela2, GIRO, 0.42);
    mueble(250, 120, 1.0, 0.55, 0.74, M.madera);
    // cocina y comedor
    mueble(398, 104, 3.0, 0.6, 0.9, M.madera); mueble(398, 104, 3.0, 0.62, 0.04, M.mesada, GIRO, 0.9);
    mueble(372, 245, 1.6, 0.9, 0.74, M.madera);
    [[350, 228], [390, 222], [354, 268], [394, 262]].forEach(([x, y]) => mueble(x, y, 0.42, 0.42, 0.45, M.negro));
    // baño principal y toilette
    mueble(200, 272, 1.2, 0.5, 0.85, M.jade); mueble(200, 272, 1.2, 0.52, 0.04, M.mesada, GIRO, 0.85);
    mueble(240, 290, 0.4, 0.6, 0.4, M.losa); mueble(375, 445, 0.4, 0.6, 0.4, M.losa, 0);
    // vestidor y lavadero exterior
    mueble(356, 312, 2.4, 0.55, 1.1, M.madera, 0);
    mueble(122, 138, 0.6, 0.6, 0.85, M.losa);
    // living (el ala girada)
    mueble(618, 300, 2.6, 0.9, 0.42, M.tela, GIRO_LIV); mueble(628, 310, 2.6, 0.25, 0.8, M.tela, GIRO_LIV);
    mueble(590, 262, 1.1, 0.6, 0.38, M.madera, GIRO_LIV);
    mueble(585, 258, 2.6, 1.8, 0.01, M.tela2, GIRO_LIV, 0.02);
    mueble(540, 222, 1.8, 0.4, 0.55, M.madera, GIRO_LIV);

    /* Árboles en el patio, del lado del living y de la calle */
    const arbol = (x, y, r, h) => {
        const g = new THREE.Group(); g.position.set(X(x), 0, Z(y));
        const t = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, h, 8), M.tronco); t.position.y = h / 2; t.castShadow = true; g.add(t);
        [[0, h + r * .4, 0, r], [r * .5, h + r * .1, r * .2, r * .75], [-r * .45, h + r * .2, -r * .3, r * .7]].forEach(([a, b, c, rr], i) => {
            const c1 = new THREE.Mesh(new THREE.IcosahedronGeometry(rr, 1), i ? M.hoja2 : M.hoja); c1.position.set(a, b, c); c1.castShadow = true; g.add(c1);
        });
        scene.add(g);
    };
    arbol(700, 90, 1.3, 2.4); arbol(780, 330, 1.2, 2.2); arbol(650, 430, 1.0, 2.0); arbol(520, 60, 0.9, 1.9);

    /* Render con oclusión ambiental en pantallas grandes */
    let composer = null;
    if (W() >= 700) {
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        const ao = new GTAOPass(scene, camera, W(), H());
        ao.updateGtaoMaterial({ radius: 0.45, distanceExponent: 1.2, thickness: 1.2, scale: 1.1, samples: 16 });
        ao.blendIntensity = 0.85;
        composer.addPass(ao); composer.addPass(new OutputPass());
    }
    const dibujar = () => composer ? composer.render() : renderer.render(scene, camera);
    let pedido = false;
    function pedir() { if (!pedido) { pedido = true; requestAnimationFrame(() => { pedido = false; dibujar(); }); } }
    controls.addEventListener('change', pedir);
    const loop = () => { if (controls.update()) dibujar(); requestAnimationFrame(loop); };
    dibujar(); loop();
    new ResizeObserver(() => { renderer.setSize(W(), H()); composer?.setSize(W(), H()); camera.aspect = W() / H(); camera.updateProjectionMatrix(); pedir(); }).observe(host);
    window.addEventListener('orientationchange', () => { encuadre(); controls.update(); pedir(); });
    host.classList.add('listo');
}
