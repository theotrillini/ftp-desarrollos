# FTP Desarrollos - Sitio Web

Página web moderna y cálida para FTP Desarrollos, desarrolladora inmobiliaria especializada en casas para el sector medio.

## 🎨 Características

- **Diseño cálido y acogedor** con paleta de colores naturales
- **Totalmente responsive** - funciona en móviles, tablets y desktop
- **Animaciones suaves** y efectos de scroll
- **Secciones incluidas:**
  - Hero con llamada a la acción
  - Características destacadas
  - Galería de proyectos
  - Sobre nosotros con estadísticas
  - Testimonios de clientes
  - Formulario de contacto
  - Footer completo

## 🚀 Cómo usar

### Opción 1: Abrir directamente
Simplemente abre el archivo `index.html` en tu navegador.

### Opción 2: Servidor local (recomendado para desarrollo)

Con Python:
```bash
cd ftp-desarrollos
python3 -m http.server 8000
```

Con Node.js:
```bash
cd ftp-desarrollos
npx serve
```

Luego abre http://localhost:8000 en tu navegador.

## 📝 Personalización

### Cambiar imágenes
Las imágenes actuales son placeholders de Unsplash. Para usar tus propias fotos:

1. Guarda tus imágenes en la carpeta `img/`
2. Reemplaza las URLs en `index.html`:
   - Busca `https://images.unsplash.com/...`
   - Reemplaza con `img/tu-imagen.jpg`

### Modificar colores
Los colores están definidos como variables CSS en `css/styles.css`:

```css
:root {
    --color-primary: #8B6B47;      /* Color principal */
    --color-accent: #D4A574;       /* Color de acento */
    --color-bg: #FFF8F0;           /* Fondo */
    /* ... más colores */
}
```

### Cambiar textos
Todos los textos están en español en `index.html`. Busca y reemplaza:
- Títulos de proyectos
- Descripciones
- Información de contacto
- Testimonios

### Actualizar información de contacto
En la sección de contacto (línea ~380 de index.html):
- Teléfono/WhatsApp
- Email
- Dirección
- Horarios

## 📁 Estructura del proyecto

```
ftp-desarrollos/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   └── script.js       # JavaScript para interactividad
├── img/                # Carpeta para imágenes (crear)
└── README.md           # Este archivo
```

## 🔧 Funcionalidades JavaScript

- **Menú móvil** responsive con animación
- **Scroll suave** al hacer clic en enlaces de navegación
- **Animaciones** al hacer scroll (fade-in)
- **Efecto parallax** en el hero
- **Contador animado** en estadísticas
- **Formulario de contacto** con validación y mensaje de éxito

## 🌐 Integración con backend (próximo paso)

El formulario de contacto actualmente muestra un mensaje de éxito. Para conectarlo con un backend:

1. **Usar un servicio como Formspree o EmailJS** (más fácil)
2. **Crear tu propio backend** con Node.js/Express o PHP
3. **Integrar con WhatsApp** usando la API de WhatsApp Business

Ejemplo con Formspree:
```html
<form action="https://formspree.io/f/TU_ID" method="POST">
```

## 📱 Redes sociales

No olvides agregar tus enlaces de redes sociales en el footer:
- Facebook
- Instagram
- LinkedIn

## ✨ Mejoras sugeridas

- [ ] Agregar galería de fotos real de proyectos
- [ ] Integrar Google Maps con ubicaciones
- [ ] Agregar sistema de reserva de visitas
- [ ] Crear página de blog para novedades
- [ ] Implementar chatbot o WhatsApp widget
- [ ] Agregar calculadora de cuotas
- [ ] Sistema de comparación de propiedades

## 📞 Soporte

Para dudas o modificaciones, consulta la documentación de:
- HTML: https://developer.mozilla.org/es/docs/Web/HTML
- CSS: https://developer.mozilla.org/es/docs/Web/CSS
- JavaScript: https://developer.mozilla.org/es/docs/Web/JavaScript

## 📄 Licencia

Creado para FTP Desarrollos - Todos los derechos reservados.
