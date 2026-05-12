const galleries = {
    uf10: [
        'images/uf10/casa%20afuera%201.png',
        'images/uf10/casa%20afuera%20lateral.png',
        'images/uf10/cocina%201.png',
        'images/uf10/cocina%202.png',
        'images/uf10/living%201.png',
        'images/uf10/patio%20atras%20L5%20-%20Editado.png',
        'images/uf10/pieza%20principal.png',
        'images/uf10/cuarto%20ppal%202.png',
        'images/uf10/cuarto%20ppal%202%3D1.png',
        'images/uf10/banio1.png',
        'images/uf10/banio2.png',
        'images/uf10/banio3.png',
    ],
    uf7: [
        'images/uf7/frente%20L2%20Q2.png',
        'images/uf7/Planta%20baja%20L2%20Q2.png',
        'images/uf7/Planta%20alta%20L2%20Q2.png',
    ],
    uf8: [
        'images/uf8/frente.png',
        'images/uf8/frente%20izq.png',
        'images/uf8/frente%20con%20luz3.png',
        'images/uf8/plano%20superior%20L3%20Q2.png',
        'images/uf8/planoreal.png',
    ],
    uf4: [
        'images/uf4/frente1.jpeg',
        'images/uf4/livingcomedor1.png',
        'images/uf4/livingcomedor2.png',
        'images/uf4/cocina.png',
        'images/uf4/cuartoppal.png',
        'images/uf4/banio1.png',
        'images/uf4/patio.png',
    ],
};

let activeGallery = 'uf10';
let currentIndex = 0;

// --- Navbar scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

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
});
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => document.getElementById('navMenu').classList.remove('open'));
});

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
function openLightboxGal(gal, idx) {
    const imgs = galleries[gal];
    if (!imgs || imgs.length === 0) return;
    activeGallery = gal;
    currentIndex = idx;
    document.getElementById('lbImg').src = imgs[idx];
    document.getElementById('lbCounter').textContent = `${idx + 1} / ${imgs.length}`;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

// backward compat por si algo llama openLightbox sin gal
function openLightbox(idx) { openLightboxGal(activeGallery, idx); }

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
}

function lightboxNav(dir) {
    const imgs = galleries[activeGallery];
    currentIndex = (currentIndex + dir + imgs.length) % imgs.length;
    document.getElementById('lbImg').src = imgs[currentIndex];
    document.getElementById('lbCounter').textContent = `${currentIndex + 1} / ${imgs.length}`;
}

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
