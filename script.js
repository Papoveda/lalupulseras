document.addEventListener("DOMContentLoaded", function() {
  // Carrusel de Colecciones
  const coleccionSlider = document.querySelector('.coleccion-slider');
  const coleccionSlides = document.querySelectorAll('.coleccion-slide');
  const coleccionLeft = document.querySelector('.coleccion-arrow.left');
  const coleccionRight = document.querySelector('.coleccion-arrow.right');
  let coleccionIndex = 0;
  let coleccionInterval;

  function showColeccionSlide(idx) {
    coleccionSlider.style.transform = `translateX(-${idx * 100}vw)`;
  }
  function nextColeccionSlide() {
    coleccionIndex = (coleccionIndex + 1) % coleccionSlides.length;
    showColeccionSlide(coleccionIndex);
  }
  function prevColeccionSlide() {
    coleccionIndex = (coleccionIndex - 1 + coleccionSlides.length) % coleccionSlides.length;
    showColeccionSlide(coleccionIndex);
  }
  if (coleccionLeft && coleccionRight) {
    coleccionLeft.onclick = prevColeccionSlide;
    coleccionRight.onclick = nextColeccionSlide;
  }
  function startColeccionAuto() {
    coleccionInterval = setInterval(nextColeccionSlide, 4000);
  }
  function stopColeccionAuto() {
    clearInterval(coleccionInterval);
  }
  if (coleccionSlider) {
    coleccionSlider.addEventListener('mouseenter', stopColeccionAuto);
    coleccionSlider.addEventListener('mouseleave', startColeccionAuto);
    showColeccionSlide(coleccionIndex);
    startColeccionAuto();
  }

  // Slider de productos destacados
  const destacadosSlider = document.querySelector('.destacados-items');
  const destacadoCards = document.querySelectorAll('.destacado');
  const destacadosLeft = document.querySelector('.destacados-arrow.left');
  const destacadosRight = document.querySelector('.destacados-arrow.right');
  let destacadoIndex = 0;
  let productosPorVista = 4;
  function updateProductosPorVista() {
    productosPorVista = window.innerWidth < 700 ? 2 : 4;
  }
  updateProductosPorVista();
  window.addEventListener('resize', updateProductosPorVista);

  function showDestacados(idx) {
    if (destacadosSlider && destacadoCards.length > 0) {
      destacadosSlider.scrollTo({
        left: idx * destacadoCards[0].offsetWidth + idx * 20,
        behavior: "smooth"
      });
    }
  }
  function nextDestacado() {
    if (destacadoIndex < destacadoCards.length - productosPorVista) {
      destacadoIndex++;
      showDestacados(destacadoIndex);
    }
  }
  function prevDestacado() {
    if (destacadoIndex > 0) {
      destacadoIndex--;
      showDestacados(destacadoIndex);
    }
  }
  if (destacadosLeft && destacadosRight) {
    destacadosLeft.onclick = prevDestacado;
    destacadosRight.onclick = nextDestacado;
  }

  // Slider de Reseñas
  const reseñas = document.querySelectorAll('.reseña');
  let reseñaIndex = 0;
  function showReseña(idx) {
    reseñas.forEach((r, i) => r.classList.toggle('activa', i === idx));
  }
  function nextReseña() {
    reseñaIndex = (reseñaIndex + 1) % reseñas.length;
    showReseña(reseñaIndex);
  }
  if (reseñas.length > 0) {
    showReseña(reseñaIndex);
    setInterval(nextReseña, 4500);
  }

  // Cambiar bandera al elegir idioma y ocultar la opción seleccionada
  const banderaPrincipal = document.getElementById("bandera-principal");
  const idiomaOpciones = document.querySelectorAll(".idioma-opcion");
  const idiomaDropdown = document.querySelector('.idioma-dropdown');
  const idiomaBtn = document.getElementById('idioma-btn-principal');

  // Función para ocultar la opción seleccionada
 function ocultarIdiomaSeleccionado() {
  idiomaOpciones.forEach(function(btn) {
    // Compara solo el nombre del archivo SVG de la bandera
    const btnSrc = btn.getAttribute("data-bandera");
    if (banderaPrincipal && btnSrc) {
      const banderaActual = banderaPrincipal.src.split('/').pop();
      const banderaBtn = btnSrc.split('/').pop();
      if (banderaActual === banderaBtn) {
        btn.style.display = 'none';
      } else {
        btn.style.display = '';
      }
    }
  });
}

  // Inicialmente oculta la opción activa
  ocultarIdiomaSeleccionado();

  // Al hacer click en una opción, cambia la bandera y oculta la seleccionada
  idiomaOpciones.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      const nuevaBandera = btn.getAttribute("data-bandera");
      if(banderaPrincipal && nuevaBandera) {
        banderaPrincipal.src = nuevaBandera;
        ocultarIdiomaSeleccionado();
      }
      // Opcional: cerrar el menú después de seleccionar
      if (idiomaDropdown.classList.contains('active')) {
        idiomaDropdown.classList.remove('active');
      }
    });
  });

  // Al abrir el menú, actualiza las opciones visibles
  if (idiomaBtn && idiomaDropdown) {
    idiomaBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      idiomaDropdown.classList.toggle('active');
      if (idiomaDropdown.classList.contains('active')) {
        ocultarIdiomaSeleccionado();
      }
    });
    document.addEventListener('click', function(e) {
      if (idiomaDropdown.classList.contains('active')) {
        idiomaDropdown.classList.remove('active');
      }
    });
    idiomaDropdown.querySelector('.dropdown-content').addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // Menu hamburguesa: cerrar menú al hacer click en un link o icono (UX extra)
  const navToggle = document.getElementById("nav-toggle");
  const navMenuLinks = document.querySelectorAll('.navbar-menu a, .navbar-actions .icon-btn');
  navMenuLinks.forEach(link => {
    link.addEventListener("click", () => {
      if(window.innerWidth < 800 && navToggle && navToggle.checked) {
        navToggle.checked = false;
      }
    });
 *

