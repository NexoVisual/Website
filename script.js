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

document.getElementById('newsletter-nexo').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue por completo
    
    const boton = document.getElementById('btn-suscribirse');
    const textoOriginal = boton.textContent;
    
    // Cambia el estado del botón mientras procesa
    boton.textContent = 'Suscribiéndote...';
    boton.disabled = true;

    // REEMPLAZA ESTA URL CON LA QUE COPIASTE EN EL PASO 3
    const urlScript = 'https://script.google.com/macros/s/AKfycbwTUYrlUaVUfgvyrHhpzGofqOOdnTVqxAqfqy6efeJphsE3hO2BUw29fhUKmHtCT6B4/exec'; 

    fetch(urlScript, {
        method: 'POST',
        mode: 'no-cors', // Evita problemas de restricciones CORS de forma sencilla
        body: new FormData(this)
    })
    .then(() => {
        alert('¡Te has suscrito al newsletter exitosamente!');
        this.reset(); // Limpia los campos del formulario
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al registrar tu suscripción. Inténtalo de nuevo.');
    })
    .finally(() => {
        // Restaura el botón a su estado original
        boton.textContent = textoOriginal;
        boton.disabled = false;
    });
});

document.getElementById('contacto-nexo').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue o redirija
    
    // Buscamos el botón de enviar dentro de ESTE formulario
    const boton = this.querySelector('button[type="submit"]');
    const textoOriginal = boton.textContent;
    
    // Cambiamos el texto para dar feedback al usuario
    boton.textContent = 'Enviando...';
    boton.disabled = true;

    // Tomamos la URL del action del formulario
    const urlAction = this.action; 

    fetch(urlAction, {
        method: 'POST',
        body: new FormData(this),
        headers: {
            'Accept': 'application/json' // Le dice a FormSubmit que procesaremos la respuesta aquí mismo
        }
    })
    .then(response => {
        if (response.ok) {
            alert('¡Tu mensaje ha sido enviado con éxito! Nos pondremos en contacto pronto.');
            this.reset(); // Limpia el formulario
        } else {
            alert('Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error de red. Inténtalo de nuevo más tarde.');
    })
    .finally(() => {
        // Devolvemos el botón a su estado original
        boton.textContent = textoOriginal;
        boton.disabled = false;
    });
});