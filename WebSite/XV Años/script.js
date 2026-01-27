// --- 1. LÓGICA DE LA CUENTA REGRESIVA ---
// Cambia esta fecha por la de tus XV años
const eventDate = new Date("May 16, 2026 17:00:00").getTime();

const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Verificamos que los elementos existan antes de escribir en ellos
    if(document.getElementById("days")) {
        document.getElementById("days").innerText = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    if (distance < 0) {
        clearInterval(countdownInterval);
        const countdownEl = document.getElementById("countdown");
        if(countdownEl) countdownEl.innerHTML = "<h3>¡El gran día ha llegado!</h3>";
    }
}, 1000);

// --- 2. ANIMACIÓN AL HACER SCROLL (Reveal) ---
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            // Opcional: si quieres que desaparezcan al subir, deja esta línea.
            // Si quieres que se queden visibles una vez aparecen, bórrala.
            reveals[i].classList.remove('active');
        }
    }
}

// Disparar una vez al cargar para mostrar elementos visibles desde el inicio
reveal(); 

// --- 3. REPRODUCTOR DE MÚSICA ---
var music = document.getElementById("bgMusic");
var icon = document.getElementById("musicIcon");

function toggleMusic() {
    if (music.paused) {
        music.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        music.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

// --- 4. GENERAR ARCHIVO .ICS (AGENDA) ---
function descargarICS() {
    // Datos del evento
    const titulo = "Mis XV Años - Alicia";
    const descripcion = "¡Hola! Estoy muy emocionada de celebrar este día contigo.";
    const ubicacion = "Santuario de los Remedios, Cholula";
    const fechaInicio = "20260516T170000"; 
    const fechaFin = "20260517T020000";    // Termina al día siguiente a las 2 AM

    // Estructura del archivo ICS
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AliciaXV//MX
BEGIN:VEVENT
UID:${Date.now()}@aliciaxv.com
DTSTAMP:${fechaInicio}Z
DTSTART:${fechaInicio}
DTEND:${fechaFin}
SUMMARY:${titulo}
DESCRIPTION:${descripcion}
LOCATION:${ubicacion}
END:VEVENT
END:VCALENDAR`;

    // Crear un blob (archivo temporal)
   const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'invitacion-alicia.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}