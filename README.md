# CAT — Living Room

Simulador felino 3D para navegador con HTML, CSS, JavaScript y Three.js.

## Windows
1. Descomprime la carpeta.
2. Haz doble clic en `INICIAR_WINDOWS.bat` (requiere Python 3 instalado).
3. Abre `http://localhost:8000` si el navegador no se abre automáticamente.

Alternativa: abre una terminal en esta carpeta y ejecuta `py -m http.server 8000`.

## GitHub Pages
Sube `index.html`, `sw.js` y `manifest.webmanifest` a la raíz del repositorio. En Settings → Pages selecciona Deploy from a branch, `main`, `/(root)`. Abre la URL HTTPS publicada.

## Dependencias
Three.js 0.186.1 y RoundedBoxGeometry se cargan desde jsDelivr. Necesita Internet para la primera carga; el service worker intenta guardar el shell de la app y las dependencias solicitadas para reutilizarlas sin conexión. La disponibilidad offline depende de que la carga inicial se complete y el navegador conserve su caché.

## Controles
- Arrastrar ratón/dedo: orbitar cámara.
- Rueda/pellizco: zoom.
- Clic/toque en el gato: llamar su atención.
- Arrastrar el ovillo: jugar.
- Botones: llamar, acariciar, jugar, alimentar, vida libre y descansar.
- H: ocultar/mostrar interfaz; Espacio: jugar; C: llamar; P: acariciar.

## Limitaciones
El gato es una composición procedural, no un modelo escaneado ni un rig profesional. Los sonidos se sintetizan con Web Audio API. El juego no se ha verificado visualmente en todos los navegadores/GPU.
