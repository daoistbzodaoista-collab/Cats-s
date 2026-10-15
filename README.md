# CAT — Living Room (Android + modo sin conexión)

Simulador felino 3D para navegador. Está hecho con HTML5, JavaScript y Three.js. Esta edición incluye un service worker que guarda la página y las dos dependencias JavaScript necesarias para volver a jugar sin Internet.

## Importante: primera carga

**No se puede preparar la caché sin conexión desde cero si nunca hubo Internet.** Para usarlo offline en Chrome Android, primero hay que publicar el proyecto en una dirección HTTPS y abrirlo una vez conectado. Después hay que esperar a que termine la caché y recargar la página todavía conectado. Entonces se puede activar el modo avión y abrirlo de nuevo desde Chrome.

El navegador no permite instalar un service worker desde `file://` ni desde una dirección HTTP cualquiera; necesita HTTPS (GitHub Pages sirve).

## Publicarlo gratis desde Android usando GitHub Pages

1. Con Internet, abre https://github.com/ y crea una cuenta o inicia sesión.
2. Crea un repositorio nuevo, por ejemplo `cat-living-room`. Si aparece la opción de visibilidad, elige **Public**.
3. En el repositorio, usa **Add file → Upload files** y sube estos cuatro archivos desde la carpeta del proyecto: `index.html`, `sw.js`, `manifest.webmanifest` y `README.md`. No subas solo el ZIP: hay que subir los archivos extraídos.
4. Abre **Settings → Pages**.
5. En **Build and deployment**, elige **Deploy from a branch**; selecciona la rama `main` y la carpeta `/ (root)`, y guarda.
6. Espera a que GitHub Pages publique el sitio. La dirección será parecida a `https://TU-USUARIO.github.io/cat-living-room/` (usa la URL exacta que muestre GitHub).
7. Abre esa URL en Chrome Android con Internet. Espera a que termine de cargar el gato y la habitación.
8. Espera unos segundos más y recarga la página una vez mientras sigues conectado. El service worker se instala en segundo plano y almacena `index.html`, Three.js y `RoundedBoxGeometry`.
9. En Chrome, abre el menú ⋮ → **Añadir a pantalla de inicio** si quieres un acceso directo. Es opcional; no es necesario para el modo sin conexión.
10. Activa el modo avión y vuelve a abrir la misma dirección desde Chrome o desde el acceso directo. Si no funciona a la primera, vuelve a conectarte, abre la página y espera a que finalice la carga antes de probar otra vez.

## Uso local en PC

El service worker también funciona en `localhost`:

- Windows: `py -m http.server 8000`
- macOS/Linux: `python3 -m http.server 8000`

Abre `http://localhost:8000` en el ordenador. En la primera visita necesita Internet para descargar y almacenar las dependencias.

## Controles

- Arrastrar un dedo: girar la cámara.
- Pellizcar con dos dedos: zoom.
- Tocar al gato: llamar su atención.
- Arrastrar el ovillo: moverlo para que lo persiga.
- **Llamar**, **Acariciar**, **Jugar**, **Dar comida**, **Descansar** y **Vida libre**: acciones del panel.
- Botón `◈`: alterna calidad gráfica.
- Botón `⌗`: oculta o muestra la interfaz.

## Dependencias y limitaciones

- Three.js 0.186.1 desde jsDelivr, almacenado en caché para uso posterior offline.
- `RoundedBoxGeometry` de los ejemplos de Three.js, también almacenado en caché.
- No usa modelos ni imágenes externos; el escenario y el gato son geometría procedural.
- Los sonidos se sintetizan con Web Audio; no son grabaciones reales.
- El modo sin conexión depende de que Chrome no borre los datos del sitio. Borrar datos de navegación/caché puede exigir conectarse otra vez.
- El gato es procedural, no un modelo fotorrealista escaneado. El rendimiento depende del GPU y del soporte WebGL del teléfono.
