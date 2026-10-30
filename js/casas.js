/* Datos de cada casa de Barrio Los Ginkgos para la página casa.html?uf=...
   Las fotos salen de `galleries` (script.js). Ninguna casa muestra planos: la distribución va en la Vista 3D. */
const CASAS = {
    uf10: {
        lote: 10, estado: ['A la venta · Terminada', 'badge-disponible'],
        resumen: 'Casa terminada de dos dormitorios, lista para mudarse.',
        specs: [['122 m²', 'Construcción'], ['580 m²', 'Terreno'], ['2', 'Dormitorios'], ['1', 'Baño + toilette']],
        desc: [
            'El ingreso se destaca por su <strong>palier de recepción</strong> y una imponente puerta de madera que anticipa la calidad del proyecto. El living-comedor es amplio y cuenta con ventanales de aluminio negro A30 con DVH, garantizando excelente aislamiento térmico y acústico.',
            'La <strong>cocina-comedor diario</strong> combina funcionalidad y estética: muebles bajo mesada en tono paraíso, mesadas de cuarzo blanco y revestimiento tipo subway blanco. Equipada con horno eléctrico embutido, anafe vitrocerámico y bacha Johnson de acero.',
            'El <strong>baño principal</strong> incorpora antebaño, vanitory flotante en verde jade, mesada de cuarzo blanco y grifería de diseño con detalles en negro. Un segundo dormitorio versátil y toilette de cortesía completan el área privada.'
        ],
        tags: ['Patio', 'Quincho', 'Ventanales DVH', 'Cocina equipada', 'A estrenar', '100% terminada'],
        planos: [],   // la planta va en la sección Recorrido
        venta: true
    },
    uf8: {
        lote: 8, estado: ['A la venta · En obra 80%', 'badge-disponible'],
        resumen: 'Casa de dos dormitorios con suite, semicubierto y lavadero, en obra al 80%.',
        specs: [['~100 m²', 'Construcción'], ['450 m²', 'Terreno'], ['2', 'Dormitorios'], ['Suite', 'Dorm. principal']],
        desc: [
            'Vivienda de ~100 m² en una planta, pensada para la <strong>luz y la amplitud</strong>. El ingreso lleva a un living-comedor integrado, con ventanales de aluminio negro A30 con DVH que miran al jardín.',
            'La <strong>cocina en L</strong> se abre al comedor: muebles de madera, mesada blanca, revestimiento subway blanco y salida directa al <strong>semicubierto</strong>, donde está el lavadero.',
            'El área privada incluye <strong>dormitorio principal en suite</strong> con vestidor y baño propio, un segundo dormitorio y un baño completo con ducha a ras del piso. Pisos de porcelanato en toda la casa.'
        ],
        tags: ['Suite con vestidor', 'Cocina en L', 'Semicubierto', 'Lavadero', 'DVH aluminio negro', 'Jardín'],
        planos: [], venta: true
    },
    uf7: {
        lote: 7, estado: ['A la venta · En proyecto', 'badge-disponible'],
        resumen: 'Casa en dos plantas con estar en doble altura, suite y cochera. Proyecto y plano listos, próximo inicio.',
        specs: [['2', 'Plantas'], ['Doble', 'Altura'], ['2', 'Dormitorios'], ['2 + toilette', 'Baños']],
        desc: [
            'Vivienda contemporánea en <strong>dos plantas</strong>. Se entra por un ingreso cubierto junto a la escalera, con cochera al costado.',
            'En planta baja, el <strong>estar en doble altura</strong> se abre a la cocina-comedor. La cocina tiene <strong>isla con desayunador</strong>, muebles de madera, mesada blanca y revestimiento subway, y se completa con lavadero, despensa y toilette.',
            'En planta alta están el <strong>dormitorio principal en suite</strong>, con placares y baño con doble bacha y bañera, un segundo dormitorio con placard y un baño completo con ducha. Desde el pasillo se ve el estar en doble altura.',
            'El proyecto admite personalización según requerimientos del comprador.'
        ],
        tags: ['Doble altura', 'Suite', 'Cocina con isla', 'Lavadero y despensa', 'Toilette en PB', 'Cochera', 'Personalizable'],
        planos: [], venta: true
    },
    uf4: {
        lote: 4, estado: ['Vendida', 'badge-vendida'],
        resumen: 'Casa minimalista en una planta, con galería y parrilla. Ya entregada.',
        specs: [['131 m²', 'Construcción'], ['623 m²', 'Terreno'], ['3', 'Dormitorios'], ['4', 'Cocheras']],
        desc: [
            'Casa estilo minimalista en una sola planta con espacio guarda coches, palier de entrada con <strong>puerta pivotante</strong>, ambiente abierto con sala de estar, living, comedor y cocina con isla.',
            'Pisos de porcelanato con <strong>loza radiante</strong>. Cocina con muebles bajo mesada y alacena en olmo finlandés con mesada en negro brasil. Amplia suite, 2 dormitorios adicionales con placard.',
            'Galería cubierta con parrilla y <strong>300 m² de fondo libre</strong>.'
        ],
        tags: ['Loza radiante', 'Cocina con isla', 'Suite', 'Galería con parrilla', '300 m² fondo libre'],
        planos: [], venta: false
    }
};

/* Nombre de cada foto (mismo orden que `galleries` en script.js) */
const FOTOS = {
    uf10: ['Fachada', 'Exterior', 'Cocina', 'Cocina', 'Living', 'Patio', 'Dormitorio', 'Dormitorio principal', 'Escritorio', 'Baño', 'Baño · vanitory', 'Baño completo'],
    uf7: ['Frente', 'Frente de noche', 'Estar en doble altura', 'Cocina', 'Dormitorio principal', 'Baño en suite', 'Baño en suite', 'Dormitorio 2', 'Baño', 'Lateral'],
    uf8: ['Frente', 'Living', 'Cocina', 'Dormitorio principal', 'Baño en suite', 'Baño', 'Semicubierto', 'Lavadero'],
    uf4: ['Fachada', 'Living comedor', 'Living comedor', 'Cocina', 'Dormitorio principal', 'Baño', 'Patio']
};
