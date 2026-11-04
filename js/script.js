const galleries = {
    uf10: [
        'images/uf10/frente-hd.webp',
        'images/uf10/casa%20afuera%20lateral.webp',
        'images/uf10/cocina%201.webp',
        'images/uf10/cocina%202.webp',
        'images/uf10/living%201.webp',
        'images/uf10/patio%20atras%20L5%20-%20Editado.webp',
        'images/uf10/pieza%20principal.webp',
        'images/uf10/cuarto%20ppal%202.webp',
        'images/uf10/cuarto%20ppal%202%3D1.webp',
        'images/uf10/banio1.webp',
        'images/uf10/banio2.webp',
        'images/uf10/banio3.webp',
    ],
    uf7: [
        'images/uf7/frente-dia.webp',
        'images/uf7/frente-noche.webp',
        'images/uf7/estar.webp',
        'images/uf7/cocina.webp',
        'images/uf7/dormitorio-principal.webp',
        'images/uf7/bano-suite.webp',
        'images/uf7/bano-suite-2.webp',
        'images/uf7/dormitorio-2.webp',
        'images/uf7/bano.webp',
        'images/uf7/lateral.webp',
    ],
    uf8: [
        'images/uf8/frente-hd.webp',
        'images/uf8/living.jpg',
        'images/uf8/cocina.jpg',
        'images/uf8/dormitorio-principal.jpg',
        'images/uf8/bano-a.jpg',
        'images/uf8/bano-b.jpg',
        'images/uf8/semicubierto.jpg',
        'images/uf8/lavadero.jpg',
    ],
    uf4: [
        'images/uf4/frente1.webp',
        'images/uf4/livingcomedor1.webp',
        'images/uf4/livingcomedor2.webp',
        'images/uf4/cocina.webp',
        'images/uf4/cuartoppal.webp',
        'images/uf4/banio1.webp',
        'images/uf4/patio.webp',
    ],
};

let activeGallery = 'uf10';
let currentIndex = 0;

// --- Navbar scroll ---
const navbar = document.getElementById('navbar');
// el menú queda claro al bajar, y también mientras está abierto el menú del celular o la barra de Proyectos
const pintarNav = () => navbar.classList.toggle('scrolled', window.scrollY > 50
    || !!document.querySelector('#navMenu.open, #navDrop.open'));
window.addEventListener('scroll', pintarNav);

// --- Hero parallax ---
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
    if (heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
});

// --- Hero slideshow ---
const slides = document.querySelectorAll('.hero-slide');
if (slides.length > 0) {
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000);
}

// --- Hamburger ---
document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('open');
    pintarNav();
});
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => { document.getElementById('navMenu').classList.remove('open'); pintarNav(); });
});

// --- Menú "Proyectos": barra ancha que se abre con clic; al elegir un proyecto aparecen sus unidades ---
const navDrop = document.getElementById('navDrop');
if (navDrop) {
    const btn = navDrop.querySelector('.nav-drop-btn');
    const proyectos = navDrop.querySelectorAll('.nm-proyecto');
    const barra = navDrop.querySelector('.nav-mega-in');
    // con un proyecto elegido la lista se corre a la izquierda y aparecen sus unidades
    const elegir = p => {
        proyectos.forEach(x => {
            const si = x === p;
            x.setAttribute('aria-expanded', si);
            document.getElementById(x.getAttribute('aria-controls')).hidden = !si;
        });
        barra.classList.toggle('con-unidades', !!p);
    };
    const abrir = si => {
        navDrop.classList.toggle('open', si);
        btn.setAttribute('aria-expanded', si);
        pintarNav();
        if (!si) elegir(null);
    };
    btn.addEventListener('click', e => { e.stopPropagation(); abrir(!navDrop.classList.contains('open')); });
    proyectos.forEach(p => p.addEventListener('click', () => elegir(p.getAttribute('aria-expanded') === 'true' ? null : p)));
    document.addEventListener('click', e => { if (!navDrop.contains(e.target)) abrir(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') abrir(false); });
    navDrop.querySelectorAll('a').forEach(a => a.addEventListener('click', () => abrir(false)));
    // marca la casa que se está viendo
    const uf = new URLSearchParams(location.search).get('uf');
    if (uf) navDrop.querySelector(`[data-uf="${uf}"]`)?.setAttribute('aria-current', 'page');
}

// --- Toggle UF detail panels ---
function toggleUF(ufId, cardEl) {
    const detail = document.getElementById('detail-' + ufId);
    const isOpen = detail.classList.contains('open');

    // Cerrar todos
    document.querySelectorAll('.uf-detail').forEach(d => {
        d.style.maxHeight = null;
        d.classList.remove('open');
    });
    document.querySelectorAll('.ufc').forEach(c => c.classList.remove('active'));

    if (!isOpen) {
        detail.style.maxHeight = detail.scrollHeight + 'px';
        detail.classList.add('open');
        cardEl.classList.add('active');
        activeGallery = ufId;
        currentIndex = 0;

        setTimeout(() => {
            detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 320);
    }
}

// --- Desde el estado de lotes: abre la ficha de la unidad ---
function verUF(ufId) {
    const card = document.getElementById('card-' + ufId);
    const detail = document.getElementById('detail-' + ufId);
    if (!card || !detail) return;
    if (!detail.classList.contains('open')) toggleUF(ufId, card);
    else detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Thumbnails (todas las galerías) ---
document.querySelectorAll('.gthumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const gal = thumb.dataset.gal;
        const idx = parseInt(thumb.dataset.i);
        setMainImage(gal, idx);
    });
});

function setMainImage(gal, idx) {
    currentIndex = idx;
    const mainImg = document.getElementById('mainImg-' + gal);
    if (mainImg) mainImg.src = galleries[gal][idx];
    document.querySelectorAll(`.gthumb[data-gal="${gal}"]`).forEach((t, i) => {
        t.classList.toggle('active', i === idx);
    });
}

// --- Lightbox ---
const ufNombre = gal => 'UF ' + gal.replace('uf', '').split('-')[0];
const fotoNombre = (gal, i) => document.querySelector(`.gthumb[data-gal="${gal}"][data-i="${i}"]`)?.alt
    || (typeof FOTOS !== 'undefined' && FOTOS[gal] && FOTOS[gal][i]) || '';

function renderLightbox() {
    const imgs = galleries[activeGallery];
    document.getElementById('lbImg').src = imgs[currentIndex];
    document.getElementById('lbImg').alt = fotoNombre(activeGallery, currentIndex);
    document.getElementById('lbCounter').textContent = `${currentIndex + 1} / ${imgs.length}`;
    const cap = document.getElementById('lbCaption');
    if (cap) cap.innerHTML = `${ufNombre(activeGallery)}<span>${fotoNombre(activeGallery, currentIndex)}</span>`;
    document.querySelectorAll('#lbStrip img').forEach((t, i) => t.classList.toggle('on', i === currentIndex));
}

function openLightboxGal(gal, idx) {
    const imgs = galleries[gal];
    if (!imgs || imgs.length === 0) return;
    activeGallery = gal;
    currentIndex = idx;
    const strip = document.getElementById('lbStrip');
    if (strip) strip.innerHTML = imgs.map((src, i) => `<img src="${src}" alt="${fotoNombre(gal, i)}" data-i="${i}" loading="lazy">`).join('');
    renderLightbox();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.getElementById('lbStrip')?.addEventListener('click', e => {
    const i = e.target.dataset?.i;
    if (i != null) { currentIndex = +i; renderLightbox(); }
});

// backward compat por si algo llama openLightbox sin gal
function openLightbox(idx) { openLightboxGal(activeGallery, idx); }

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}

function lightboxNav(dir) {
    const imgs = galleries[activeGallery];
    currentIndex = (currentIndex + dir + imgs.length) % imgs.length;
    renderLightbox();
}

// Deslizar en el celular
let lbX0 = null;
document.getElementById('lbImg')?.addEventListener('touchstart', e => { lbX0 = e.touches[0].clientX; }, { passive: true });
document.getElementById('lbImg')?.addEventListener('touchend', e => {
    if (lbX0 == null) return;
    const dx = e.changedTouches[0].clientX - lbX0;
    if (Math.abs(dx) > 40) lightboxNav(dx < 0 ? 1 : -1);
    lbX0 = null;
});

document.getElementById('lightbox')?.addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
});

document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox')?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
});

// --- Scroll animations ---
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// --- Formulario ---
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = this;
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
    })
    .then(() => {
        btn.textContent = '¡Consulta enviada!';
        form.reset();
        setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3000);
    })
    .catch(() => {
        btn.textContent = 'Error al enviar. Intentá de nuevo.';
        btn.disabled = false;
    });
});

// --- WhatsApp flotante: se oculta mientras se ve Contacto, que ya tiene el número a mano ---
const waFloat = document.querySelector('.wa-float'), contacto = document.getElementById('contacto');
if (waFloat && contacto) {
    const revisar = () => {
        const r = contacto.getBoundingClientRect();
        waFloat.classList.toggle('oculto', r.top < innerHeight * 0.75 && r.bottom > innerHeight * 0.25);
    };
    addEventListener('scroll', revisar, { passive: true });
    addEventListener('resize', revisar);
    revisar();
}
