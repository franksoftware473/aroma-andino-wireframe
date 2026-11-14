// Café Aroma Andino · comportamiento del sitio
(function () {
  "use strict";

  // ---- Utilidades de almacenamiento (localStorage con respaldo) ----
  function leer(clave) {
    try { return JSON.parse(localStorage.getItem(clave)) || []; } catch (e) { return []; }
  }
  function guardar(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* sin almacenamiento */ }
  }
  function escapar(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---- Menú: filtros por categoría ----
  var botones = document.querySelectorAll(".filtro");
  if (botones.length) {
    botones.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filtro");
        botones.forEach(function (b) { b.classList.toggle("activo", b === btn); });
        document.querySelectorAll(".item-menu").forEach(function (item) {
          var visible = f === "todo" || item.getAttribute("data-categoria") === f;
          item.classList.toggle("oculto", !visible);
        });
      });
    });
  }

  // ---- Reservas ----
  var formReserva = document.getElementById("formReserva");
  if (formReserva) {
    var fecha = document.getElementById("rFecha");
    var hoy = new Date();
    var iso = hoy.getFullYear() + "-" + String(hoy.getMonth() + 1).padStart(2, "0") + "-" + String(hoy.getDate()).padStart(2, "0");
    fecha.min = iso;

    var aviso = document.getElementById("avisoReserva");
    var lista = document.getElementById("listaReservas");

    function pintarReservas() {
      var reservas = leer("aroma_reservas");
      if (!reservas.length) { lista.innerHTML = ""; return; }
      lista.innerHTML = '<h2 class="h5 mb-3">Tus reservas en este navegador</h2>' + reservas.slice(-3).reverse().map(function (r) {
        return '<div class="bloque-info mb-2"><strong>' + escapar(r.fecha) + " · " + escapar(r.hora) + "</strong><br>" +
          escapar(r.nombre) + " — " + escapar(r.personas) + (Number(r.personas) === 1 ? " persona" : " personas") + "</div>";
      }).join("");
    }
    pintarReservas();

    formReserva.addEventListener("submit", function (e) {
      e.preventDefault();
      formReserva.classList.add("was-validated");
      if (!formReserva.checkValidity()) return;
      var r = {
        nombre: document.getElementById("rNombre").value.trim(),
        correo: document.getElementById("rCorreo").value.trim(),
        fecha: fecha.value,
        hora: document.getElementById("rHora").value,
        personas: document.getElementById("rPersonas").value
      };
      var todas = leer("aroma_reservas");
      todas.push(r);
      guardar("aroma_reservas", todas);
      aviso.innerHTML = "<strong>¡Reserva confirmada!</strong> " + escapar(r.nombre) + ", te esperamos el " + escapar(r.fecha) +
        " a las " + escapar(r.hora) + " para " + escapar(r.personas) + (Number(r.personas) === 1 ? " persona" : " personas") + ".";
      aviso.classList.remove("d-none");
      aviso.focus();
      formReserva.reset();
      formReserva.classList.remove("was-validated");
      pintarReservas();
    });
  }

  // ---- Contacto ----
  var formContacto = document.getElementById("formContacto");
  if (formContacto) {
    var avisoC = document.getElementById("avisoContacto");
    formContacto.addEventListener("submit", function (e) {
      e.preventDefault();
      formContacto.classList.add("was-validated");
      if (!formContacto.checkValidity()) return;
      var msgs = leer("aroma_mensajes");
      msgs.push({
        nombre: document.getElementById("cNombre").value.trim(),
        correo: document.getElementById("cCorreo").value.trim(),
        mensaje: document.getElementById("cMensaje").value.trim()
      });
      guardar("aroma_mensajes", msgs);
      avisoC.innerHTML = "<strong>¡Mensaje enviado!</strong> Gracias por escribirnos, " + escapar(document.getElementById("cNombre").value.trim()) + ". Te responderemos pronto.";
      avisoC.classList.remove("d-none");
      avisoC.focus();
      formContacto.reset();
      formContacto.classList.remove("was-validated");
    });
  }
})();
