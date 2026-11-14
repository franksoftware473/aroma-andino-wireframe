# Café Aroma Andino — Actividad 4 (Electiva I: Diseño de aplicaciones web)

Sitio web de 5 páginas (Inicio, Menú, Nosotros, Reservas, Contacto) programado a partir del wireframe de la Actividad 2.
Tecnologías: HTML5, CSS3, JavaScript, Bootstrap 5.3 y Bootstrap Icons. Node.js se usa para generar las páginas (`build.js`).

## Estructura
- `index.html`, `menu.html`, `nosotros.html`, `reservas.html`, `contacto.html`: páginas generadas con `node build.js`
- `build.js`: plantilla compartida (encabezado y pie) + contenido de cada página
- `css/styles.css`: paleta cálida (café, caramelo, crema, verde), tipografía y componentes propios
- `js/main.js`: filtros del menú, validación y confirmación de reservas y de contacto (guarda en `localStorage`)
- `vendor/`: Bootstrap e iconos copiados desde `node_modules` (el sitio funciona sin internet, salvo el mapa)

## Cómo ejecutarlo
1. `npm install` (solo si quieres regenerar `vendor/`).
2. Edita el contenido en `build.js` y ejecuta `node build.js`.
3. Abre `index.html` en el navegador.

## Publicar gratis en GitHub Pages
Ya tienes cuenta y usaste Pages en la Actividad 2.
1. Crea el repositorio `cafe-aroma-andino` en GitHub (público).
2. En esta carpeta: `git init`, `git add .`, `git commit -m "Sitio Café Aroma Andino"`,
   `git branch -M main`, `git remote add origin https://github.com/franksoftware473/cafe-aroma-andino.git`, `git push -u origin main`.
3. En GitHub: Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
4. En 1–2 minutos el sitio queda en `https://franksoftware473.github.io/cafe-aroma-andino/`. Ese es el enlace a entregar.
Alternativas gratuitas: Netlify (arrastrar la carpeta) o Cloudflare Pages.

## Guion sugerido para el video (4–6 min)
1. (0:30) Presentación: nombre, materia, cliente ficticio y objetivo del sitio (reservas en línea).
2. (0:45) Del wireframe al sitio: mostrar la Actividad 2 y cómo se conservó la estructura (encabezado, retículas, pie de página).
3. (1:30) Código: carpeta del proyecto, Bootstrap (grid, navbar, formularios), `styles.css` (paleta) y `build.js` (por qué se usa Node.js).
4. (1:00) JavaScript: filtros del menú y validación de los formularios.
5. (1:00) Recorrido del sitio publicado: las 5 páginas, probar una reserva y la vista en celular.
6. (0:30) Hosting: cómo se publicó en GitHub Pages y conclusiones.

## Antes de entregar
- Los precios, la dirección, el teléfono y los nombres del equipo son **ficticios** (el cliente es imaginario); cámbialos si tu grupo definió otros.
- Si el grupo tiene fotos propias del local o de los productos, ponlas en `img/` y reemplaza los bloques ilustrados.
- Agrega los nombres de los integrantes del grupo en el pie de página (`build.js`).
