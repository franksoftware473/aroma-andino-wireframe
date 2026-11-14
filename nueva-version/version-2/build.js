// Generador de páginas de Café Aroma Andino (Node.js)
// Uso: node build.js  -> crea inicio, menu, nosotros, reservas y contacto (.html)
const fs = require("fs");
const path = require("path");

const paginas = [
  { archivo: "index.html", clave: "inicio", nombre: "Inicio" },
  { archivo: "menu.html", clave: "menu", nombre: "Menú" },
  { archivo: "nosotros.html", clave: "nosotros", nombre: "Nosotros" },
  { archivo: "reservas.html", clave: "reservas", nombre: "Reservas" },
  { archivo: "contacto.html", clave: "contacto", nombre: "Contacto" },
];

const cabecera = (activa, titulo, descripcion) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${titulo} | Café Aroma Andino</title>
  <meta name="description" content="${descripcion}">
  <link rel="stylesheet" href="vendor/bootstrap.min.css">
  <link rel="stylesheet" href="vendor/bootstrap-icons.min.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
<header>
  <nav class="navbar navbar-expand-lg navbar-dark py-3" aria-label="Navegación principal">
    <div class="container">
      <a class="navbar-brand" href="index.html"><i class="bi bi-cup-hot-fill me-2"></i>Café Aroma Andino</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Abrir menú">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="menuPrincipal">
        <ul class="navbar-nav ms-auto gap-lg-1">
${paginas.map(p => `          <li class="nav-item"><a class="nav-link${p.clave === activa ? " active" : ""}" href="${p.archivo}"${p.clave === activa ? ' aria-current="page"' : ""}>${p.nombre}</a></li>`).join("\n")}
        </ul>
      </div>
    </div>
  </nav>
</header>
<main>
`;

const pie = `</main>
<footer>
  <div class="container">
    <div class="row g-4">
      <div class="col-md-5">
        <h4>Café Aroma Andino</h4>
        <p class="mb-1">Cafetería de especialidad familiar en Bogotá.</p>
        <p class="mb-1"><i class="bi bi-geo-alt me-2"></i>Carrera 7 # 45-20, Chapinero, Bogotá</p>
        <p class="mb-0"><i class="bi bi-clock me-2"></i>Lunes a domingo, 7:00 a. m. – 8:00 p. m.</p>
      </div>
      <div class="col-6 col-md-3">
        <h4>Explorar</h4>
        <ul class="list-unstyled mb-0">
          <li><a href="menu.html">Menú</a></li>
          <li><a href="nosotros.html">Nosotros</a></li>
          <li><a href="reservas.html">Reservas</a></li>
        </ul>
      </div>
      <div class="col-6 col-md-4">
        <h4>Contacto</h4>
        <ul class="list-unstyled mb-0">
          <li><a href="contacto.html">Escríbenos</a></li>
          <li><a href="reservas.html">Reservar mesa</a></li>
          <li class="mt-2"><i class="bi bi-envelope me-2"></i>hola@aromaandino.example</li>
        </ul>
      </div>
    </div>
    <div class="copy text-center">© 2026 Café Aroma Andino · Cliente ficticio para fines académicos · Electiva I: Diseño de aplicaciones web, IBERO</div>
  </div>
</footer>
<script src="vendor/bootstrap.bundle.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>
`;

const productos = [
  { cat: "calientes", icono: "bi-cup-hot", tono: "tono-1", nombre: "Espresso", desc: "Intenso y corto, de granos de Nariño con notas a panela y cacao.", precio: "$ 6.500" },
  { cat: "calientes", icono: "bi-cup-hot-fill", tono: "tono-4", nombre: "Capuchino", desc: "Espresso con leche texturizada y espuma sedosa.", precio: "$ 9.500" },
  { cat: "calientes", icono: "bi-funnel", tono: "tono-2", nombre: "Café filtrado", desc: "Método V60 con café de origen del Huila, de cuerpo limpio y dulce.", precio: "$ 10.500" },
  { cat: "frias", icono: "bi-cup-straw", tono: "tono-3", nombre: "Cold brew andino", desc: "Extracción en frío por 16 horas, servido con hielo y naranja.", precio: "$ 11.000" },
  { cat: "frias", icono: "bi-snow", tono: "tono-1", nombre: "Frappé de café", desc: "Café helado, leche y un toque de caramelo.", precio: "$ 12.500" },
  { cat: "panaderia", icono: "bi-basket2", tono: "tono-2", nombre: "Croissant de almendra", desc: "Horneado cada mañana, con mantequilla y almendra tostada.", precio: "$ 8.500" },
  { cat: "panaderia", icono: "bi-cake2", tono: "tono-4", nombre: "Torta de zanahoria", desc: "Con crema de queso y nueces, receta de la casa.", precio: "$ 9.800" },
  { cat: "brunch", icono: "bi-egg-fried", tono: "tono-3", nombre: "Sándwich andino", desc: "Pan de masa madre, queso campesino, jamón y huevo pochado.", precio: "$ 18.900" },
  { cat: "brunch", icono: "bi-egg", tono: "tono-1", nombre: "Brunch andino", desc: "Huevos al gusto, arepa y fruta de temporada, con bebida caliente.", precio: "$ 24.900" },
];

const fichaProducto = p => `        <div class="col-md-6 col-lg-4 item-menu" data-categoria="${p.cat}">
          <article class="ficha">
            <div class="ficha-img ${p.tono}" role="img" aria-label="Imagen ilustrativa de ${p.nombre}"><i class="bi ${p.icono}"></i></div>
            <div class="ficha-cuerpo">
              <h3>${p.nombre}</h3>
              <p>${p.desc}</p>
              <span class="precio">${p.precio}</span>
            </div>
          </article>
        </div>`;

const favoritos = [productos[0], productos[5], productos[8]];
const fichaFavorito = p => `      <div class="col-md-4">
        <article class="ficha">
          <div class="ficha-img ${p.tono}" role="img" aria-label="Imagen ilustrativa de ${p.nombre}"><i class="bi ${p.icono}"></i></div>
          <div class="ficha-cuerpo">
            <h3>${p.nombre}</h3>
            <p>${p.desc}</p>
            <span class="precio">${p.precio}</span>
          </div>
        </article>
      </div>`;

const equipo = [
  { ini: "LA", color: "#6f4e37", nombre: "Laura Andrade", cargo: "Fundadora y barista líder", desc: "Catadora certificada. Selecciona cada lote directamente con los productores." },
  { ini: "MA", color: "#4f6b4a", nombre: "Mateo Andrade", cargo: "Maestro panadero", desc: "Hornea cada madrugada el pan de masa madre y la repostería de la casa." },
  { ini: "SR", color: "#c68642", nombre: "Sofía Rojas", cargo: "Jefa de sala y reservas", desc: "Atiende las mesas y se asegura de que cada visita sea cálida y tranquila." },
];

const horas = [];
for (let h = 7; h <= 19; h++) { for (const m of ["00", "30"]) { if (h === 19 && m === "30") continue; const sufijo = h < 12 ? "a. m." : "p. m."; const h12 = h > 12 ? h - 12 : h; horas.push(`${h12}:${m} ${sufijo}`); } }

const contenido = {};

contenido.inicio = cabecera("inicio", "Inicio", "Café de origen colombiano, panadería artesanal y brunch en Bogotá. Reserva tu mesa en línea.") + `
<section class="hero">
  <div class="container">
    <div class="row align-items-center gx-lg-5 gy-4">
      <div class="col-lg-6">
        <span class="text-uppercase fw-semibold" style="color: var(--caramelo); letter-spacing: 2px; font-size: .85rem;">Cafetería de especialidad · Bogotá</span>
        <h1 class="mt-2 mb-3">Café de origen colombiano, hecho con calma</h1>
        <p class="lead mb-4">Granos de especialidad, panadería artesanal y un espacio para trabajar, estudiar o conversar.</p>
        <div class="d-flex flex-wrap gap-3">
          <a href="reservas.html" class="btn btn-cafe btn-lg"><i class="bi bi-calendar-check me-2"></i>Reservar mesa</a>
          <a href="menu.html" class="btn btn-outline-cafe btn-lg">Ver menú</a>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="hero-visual" role="img" aria-label="Taza de café humeante">
          <i class="bi bi-cup-hot-fill"></i>
          <span class="badge-origen"><i class="bi bi-geo-alt-fill me-1"></i>Café de Nariño y Huila</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="seccion">
  <div class="container">
    <h2 class="titulo-seccion">Favoritos de la casa</h2>
    <p class="subtitulo-seccion">Lo que más piden nuestros visitantes.</p>
    <div class="row g-4">
${favoritos.map(fichaFavorito).join("\n")}
    </div>
  </div>
</section>

<section class="seccion seccion-alt">
  <div class="container">
    <div class="row align-items-center g-4">
      <div class="col-lg-8">
        <h2 class="titulo-seccion">Nuestra historia</h2>
        <p class="mb-2">Aroma Andino nació en 2019 en una cocina familiar de Bogotá, con una idea sencilla: servir el café que la familia Andrade probaba en las fincas de los Andes colombianos.</p>
        <p class="mb-0">Hoy trabajamos de la mano con pequeños caficultores de Nariño y Huila, y tostamos en pequeños lotes para que cada taza conserve su origen.</p>
      </div>
      <div class="col-lg-4 text-lg-end">
        <a href="nosotros.html" class="btn btn-outline-cafe">Conocer más</a>
      </div>
    </div>
  </div>
</section>
` + pie;

contenido.menu = cabecera("menu", "Menú", "Bebidas calientes y frías, panadería artesanal y brunch de Café Aroma Andino.") + `
<section class="seccion">
  <div class="container">
    <h1 class="titulo-seccion">Nuestro menú</h1>
    <p class="subtitulo-seccion">Elige una categoría para ver los productos disponibles.</p>
    <div class="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Filtrar por categoría">
      <button type="button" class="filtro activo" data-filtro="todo">Todo</button>
      <button type="button" class="filtro" data-filtro="calientes">Bebidas calientes</button>
      <button type="button" class="filtro" data-filtro="frias">Bebidas frías</button>
      <button type="button" class="filtro" data-filtro="panaderia">Panadería</button>
      <button type="button" class="filtro" data-filtro="brunch">Brunch</button>
    </div>
    <div class="row g-4" id="listaMenu">
${productos.map(fichaProducto).join("\n")}
    </div>
    <div class="cta mt-5 d-flex flex-wrap align-items-center justify-content-between gap-3">
      <div>
        <h2 class="h4 mb-1">¿Quieres probarlo en el café?</h2>
        <p class="mb-0">Reserva tu mesa en menos de un minuto.</p>
      </div>
      <a href="reservas.html" class="btn btn-cafe btn-lg">Reservar mesa</a>
    </div>
  </div>
</section>
` + pie;

contenido.nosotros = cabecera("nosotros", "Nosotros", "Conoce la historia, los valores y el equipo de Café Aroma Andino.") + `
<section class="seccion">
  <div class="container">
    <h1 class="titulo-seccion mb-4">Nosotros</h1>
    <div class="row align-items-center gx-lg-5 gy-4">
      <div class="col-lg-6">
        <div class="hero-visual" role="img" aria-label="Ilustración del local"><i class="bi bi-shop"></i><span class="badge-origen">Chapinero, Bogotá</span></div>
      </div>
      <div class="col-lg-6">
        <h2 class="h3" style="font-family: Georgia, serif; color: var(--cafe-oscuro);">Una historia de familia y café</h2>
        <p>Aroma Andino abrió sus puertas en 2019, cuando Laura Andrade decidió llevar a Bogotá el café que su familia cultivaba y compartía en las montañas del sur del país. Lo que empezó como una barra pequeña es hoy un lugar de encuentro para estudiantes, profesionales y vecinos.</p>
        <p>Compramos el grano directamente a pequeños productores de Nariño y Huila, pagamos precios justos y tostamos en lotes pequeños para respetar el origen de cada taza.</p>
        <div class="row g-3 mt-2">
          <div class="col-sm-6"><div class="bloque-info"><strong><i class="bi bi-bullseye me-1"></i>Misión</strong><br>Servir café de origen colombiano en un espacio cálido, que invite a quedarse.</div></div>
          <div class="col-sm-6"><div class="bloque-info"><strong><i class="bi bi-heart me-1"></i>Valores</strong><br>Origen, calma, comercio justo y cercanía con cada visitante.</div></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="seccion seccion-alt">
  <div class="container">
    <h2 class="titulo-seccion">Nuestro equipo</h2>
    <p class="subtitulo-seccion">Las personas detrás de cada taza.</p>
    <div class="row g-4">
${equipo.map(e => `      <div class="col-md-4">
        <article class="ficha text-center p-4">
          <div class="avatar" style="background:${e.color}" aria-hidden="true">${e.ini}</div>
          <h3>${e.nombre}</h3>
          <p class="fw-semibold mb-1" style="color: var(--caramelo);">${e.cargo}</p>
          <p class="mb-0">${e.desc}</p>
        </article>
      </div>`).join("\n")}
    </div>
    <div class="d-flex flex-wrap gap-3 mt-5">
      <a href="contacto.html" class="btn btn-cafe">Escríbenos</a>
      <a href="menu.html" class="btn btn-outline-cafe">Ver menú</a>
    </div>
  </div>
</section>
` + pie;

contenido.reservas = cabecera("reservas", "Reservas", "Reserva tu mesa en Café Aroma Andino y recibe la confirmación por correo electrónico.") + `
<section class="seccion">
  <div class="container">
    <h1 class="titulo-seccion">Reserva tu mesa</h1>
    <p class="subtitulo-seccion">Completa el formulario y recibirás la confirmación por correo electrónico.</p>
    <div class="row gx-lg-5 gy-4">
      <div class="col-lg-6">
        <div id="avisoReserva" class="alert alert-success d-none" role="alert" tabindex="-1"></div>
        <form id="formReserva" novalidate>
          <div class="mb-3">
            <label for="rNombre" class="form-label">Nombre completo</label>
            <input type="text" class="form-control form-control-lg" id="rNombre" placeholder="Escribe tu nombre" required minlength="3" autocomplete="name">
            <div class="invalid-feedback">Escribe tu nombre completo (mínimo 3 letras).</div>
          </div>
          <div class="mb-3">
            <label for="rCorreo" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control form-control-lg" id="rCorreo" placeholder="correo@ejemplo.com" required autocomplete="email">
            <div class="invalid-feedback">Escribe un correo electrónico válido.</div>
          </div>
          <div class="mb-3">
            <label for="rFecha" class="form-label">Fecha</label>
            <input type="date" class="form-control form-control-lg" id="rFecha" required>
            <div class="invalid-feedback">Elige una fecha de hoy en adelante.</div>
          </div>
          <div class="mb-3">
            <label for="rHora" class="form-label">Hora</label>
            <select class="form-select form-select-lg" id="rHora" required>
              <option value="">Seleccionar hora</option>
${horas.map(h => `              <option>${h}</option>`).join("\n")}
            </select>
            <div class="invalid-feedback">Selecciona una hora.</div>
          </div>
          <div class="mb-4">
            <label for="rPersonas" class="form-label">Número de personas</label>
            <select class="form-select form-select-lg" id="rPersonas" required>
              <option value="">Seleccionar</option>
${[1,2,3,4,5,6,7,8].map(n => `              <option value="${n}">${n} ${n === 1 ? "persona" : "personas"}</option>`).join("\n")}
            </select>
            <div class="invalid-feedback">Selecciona cuántas personas asistirán.</div>
          </div>
          <button type="submit" class="btn btn-cafe btn-lg">Confirmar reserva</button>
        </form>
      </div>
      <div class="col-lg-6">
        <div class="bloque-info mb-4">
          <strong><i class="bi bi-info-circle me-1"></i>Información útil</strong>
          <p class="mb-0 mt-1">Las reservas se mantienen 15 minutos. Para grupos de más de 8 personas, contáctanos directamente.</p>
        </div>
        <div class="hero-visual" style="aspect-ratio: 4/3;" role="img" aria-label="Ilustración del espacio"><i class="bi bi-cup-hot-fill"></i><span class="badge-origen">Nuestro espacio</span></div>
        <div id="listaReservas" class="mt-4"></div>
      </div>
    </div>
  </div>
</section>
` + pie;

contenido.contacto = cabecera("contacto", "Contacto", "Escríbenos o visítanos en Chapinero, Bogotá. Dirección, teléfono y correo de Café Aroma Andino.") + `
<section class="seccion">
  <div class="container">
    <h1 class="titulo-seccion">Contacto</h1>
    <p class="subtitulo-seccion">¿Tienes una pregunta o quieres organizar un evento? Escríbenos.</p>
    <div class="row gx-lg-5 gy-4">
      <div class="col-lg-6">
        <div id="avisoContacto" class="alert alert-success d-none" role="alert" tabindex="-1"></div>
        <form id="formContacto" novalidate>
          <div class="mb-3">
            <label for="cNombre" class="form-label">Nombre</label>
            <input type="text" class="form-control form-control-lg" id="cNombre" placeholder="Tu nombre" required minlength="3" autocomplete="name">
            <div class="invalid-feedback">Escribe tu nombre.</div>
          </div>
          <div class="mb-3">
            <label for="cCorreo" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control form-control-lg" id="cCorreo" placeholder="correo@ejemplo.com" required autocomplete="email">
            <div class="invalid-feedback">Escribe un correo electrónico válido.</div>
          </div>
          <div class="mb-4">
            <label for="cMensaje" class="form-label">Mensaje</label>
            <textarea class="form-control form-control-lg" id="cMensaje" rows="5" placeholder="Escribe tu mensaje" required minlength="10"></textarea>
            <div class="invalid-feedback">Cuéntanos un poco más (mínimo 10 caracteres).</div>
          </div>
          <button type="submit" class="btn btn-cafe btn-lg">Enviar mensaje</button>
        </form>
      </div>
      <div class="col-lg-6">
        <iframe class="mapa mb-4" title="Mapa de ubicación de Café Aroma Andino en Chapinero, Bogotá" loading="lazy"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0700%2C4.6350%2C-74.0450%2C4.6520&amp;layer=mapnik"></iframe>
        <div class="bloque-info">
          <strong>Visítanos</strong>
          <ul class="list-unstyled mb-0 mt-2">
            <li><i class="bi bi-geo-alt me-2"></i>Carrera 7 # 45-20, Chapinero, Bogotá</li>
            <li><i class="bi bi-telephone me-2"></i>(601) 555 0142</li>
            <li><i class="bi bi-envelope me-2"></i>hola@aromaandino.example</li>
            <li><i class="bi bi-clock me-2"></i>Lunes a domingo, 7:00 a. m. – 8:00 p. m.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
` + pie;

for (const p of paginas) {
  fs.writeFileSync(path.join(__dirname, p.archivo), contenido[p.clave]);
  console.log("Generada:", p.archivo);
}
