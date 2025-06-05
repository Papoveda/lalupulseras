// --- Carrusel de Colecciones ---
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
coleccionSlider?.addEventListener('mouseenter', stopColeccionAuto);
coleccionSlider?.addEventListener('mouseleave', startColeccionAuto);
showColeccionSlide(coleccionIndex);
startColeccionAuto();

// --- Slider de productos destacados ---
const destacadosSlider = document.querySelector('.destacados-items');
const destacadoCards = document.querySelectorAll('.destacado');
const destacadosLeft = document.querySelector('.destacados-arrow.left');
const destacadosRight = document.querySelector('.destacados-arrow.right');
let destacadoIndex = 0;
const productosPorVista = window.innerWidth < 700 ? 2 : 4;
function showDestacados(idx) {
  destacadosSlider.scrollTo({
    left: idx * destacadoCards[0].offsetWidth + idx * 20,
    behavior: "smooth"
  });
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

// --- Slider de Reseñas ---
const reseñas = document.querySelectorAll('.reseña');
let reseñaIndex = 0;
function showReseña(idx) {
  reseñas.forEach((r, i) => r.classList.toggle('activa', i === idx));
}
function nextReseña() {
  reseñaIndex = (reseñaIndex + 1) % reseñas.length;
  showReseña(reseñaIndex);
}
showReseña(reseñaIndex);
setInterval(nextReseña, 4500);
