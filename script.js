const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li a");
const header = document.querySelector("header");
let lastScrollTop = 0;
const scrollThreshold = 100; // Distancia en px antes de activar el efecto (aprox. la altura del menú)

// --- LÓGICA DEL MENÚ HAMBURGUESA ---

// Abrir / Cerrar menú al tocar el icono
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Cerrar menú automáticamente al dar click en un enlace
links.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

// --- LÓGICA SMART HEADER CON UMBRAL ---

window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop < 0) return; // Evitar rebote en móviles

    // SOLO activamos la lógica si hemos bajado más que el umbral (100px)
    if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop && !navLinks.classList.contains("active")) {
            // Scroll hacia abajo (y pasado el umbral) -> Ocultar header
            header.classList.add("header-hidden");
        } else {
            // Scroll hacia arriba -> Mostrar header
            header.classList.remove("header-hidden");
        }
    } else {
        // Si estamos en la parte superior (0 a 100px), SIEMPRE mostrar el header
        header.classList.remove("header-hidden");
    }
    
    lastScrollTop = scrollTop;
});