/* UF 10: muros calcados sobre el plano original (images/uf10/plano.png, 754 x 478 px).
   Cada muro es [x1, y1, x2, y2, espesor] en píxeles del plano; las aberturas se marcan aparte.
   Escala aproximada: 36 px = 1 m. */
window.UF10_MUROS = {
    escala: 36,
    exteriores: [
        [92, 108, 378, 52, 12],      // fondo (medianera)
        [378, 52, 384, 94, 10],      // nicho del fondo
        [384, 94, 453, 80, 10],      // fondo de la cocina
        [453, 80, 462, 166, 10],     // lateral de la cocina
        [462, 166, 422, 174, 10],    // quiebre
        [422, 174, 446, 290, 10],    // lateral del comedor
        [92, 108, 160, 466, 12],     // lateral izquierdo
        [160, 466, 432, 466, 12],    // medianera con el lote 11
        [432, 466, 516, 466, 12],    // medianera hasta la puerta de entrada
        [446, 290, 591, 137, 12],    // living: lado largo interior
        [591, 137, 719, 226, 12],    // living: fondo
        [719, 226, 578, 378, 12],    // living: lado largo con ventanales
        [578, 378, 540, 398, 10],    // living: frente
        [540, 398, 525, 418, 8],     // acceso
        [525, 418, 516, 429, 8]      // hueco de la entrada (la puerta va de 429 a 466)
    ],
    interiores: [
        [150, 100, 166, 245, 9],     // lavadero | cuarto de niño
        [278, 72, 296, 214, 9],      // cuarto de niño | cocina (abajo queda la puerta al pasillo)
        [116, 245, 276, 245, 7],     // baño arriba: pegado al cuarto de niño y al lavadero, sin pasillo en el medio
        [271, 272, 278, 315, 7],     // baño | pasillo (la puerta, de 245 a 272, da al pasillo)
        [138, 334, 276, 334, 8],     // cuarto principal arriba (la puerta, de 276 a 306, da al pasillo del baño)
        [306, 300, 306, 308, 8],     // vestidor izquierda (la puerta, de 308 a 334, da al pasillo)
        [306, 300, 405, 300, 9],     // vestidor arriba
        [405, 290, 412, 380, 10],    // vestidor | palier
        [330, 384, 406, 384, 7],     // toilette arriba (1,99 m de ancho)
        [330, 382, 330, 466, 7],     // toilette | cuarto principal
        [408, 416, 410, 466, 14],    // toilette | palier (se entra por arriba a la derecha)
        [392, 416, 408, 416, 6],     // espaldar del lavatorio
        [345, 428, 377, 428, 4],     // tabique del pasillito
        [306, 334, 330, 334, 8],     // cuarto principal | vestidor (no se comunican)
        [330, 334, 330, 382, 7]      // cuarto principal | vestidor y toilette
    ]
};
