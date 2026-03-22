// --- 1. LÓGICA DE LA CUENTA REGRESIVA ---
// Cambia esta fecha por la de tus XV años
const eventDate = new Date("April 10, 2026 17:00:00").getTime();

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

// --- 4. GENERAR ARCHIVO .ICS (AGENDA APPLE / OUTLOOK) ---
function descargarICS() {
    // Datos del evento
    const titulo = "Mis XV Años - Briana";
    
    // Usamos \\n para crear saltos de línea dentro del archivo ICS
    const descripcion = "¡Hola! Estoy muy emocionada de celebrar este día contigo.\\n\\n⛪ MISA: 5:00 p.m.\\n📍 Templo Señor San José Río Viejo\\n🗺️ Mapa: https://maps.app.goo.gl/QorEWqrf56GArzBC8\\n\\n🎉 RECEPCIÓN: 7:00 p.m.\\n📍 Casa Familia: Hernández Mancillas en Río Viejo";
    
    const ubicacion = "Templo Señor San José Río Viejo";
    
    // Formato de fecha: YYYYMMDDTHHMMSS
    const fechaInicio = "20260410T170000"; // 10 de abril de 2026, 17:00 (5:00 p.m.)
    const fechaFin = "20260410T233000";    // 10 de abril de 2026, 23:30 (11:30 p.m.)

    // Estructura del archivo ICS
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NexoVisual//Invitaciones//MX
BEGIN:VEVENT
UID:${Date.now()}@nexovisual.com
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
    
    // Nombre del archivo que se descargará en el celular/computadora
    link.setAttribute('download', 'invitacion-briana.ics');
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function enviarWhatsApp() {
    // 1. Obtener los valores que el usuario escribió
    const nombre = document.getElementById('nombre').value;
    const pases = document.getElementById('pases').value;
    const mensaje = document.getElementById('mensaje').value;

    // 2. Validar que no envíen el formulario vacío
    if (nombre.trim() === '') {
        alert('Por favor, ingresa tu nombre completo.');
        return; // Detiene la función si no hay nombre
    }
    if (pases === '') {
        alert('Por favor, selecciona el número de pases.');
        return; // Detiene la función si no seleccionó pases
    }

    // 3. Configurar el número de teléfono
    // Importante: Debe llevar el código de país (52 para México) sin signos de + ni espacios.
    // Ejemplo: 52 311 123 4567 -> 523111234567
    const telefono = '523891053427'; // ¡Reemplaza esto con el número del cliente!

    // 4. Armar el mensaje con formato (%0A es un salto de línea en URLs)
    let texto = `¡Hola! Confirmo mi asistencia a los XV Años.%0A%0A`;
    texto += `*Nombre:* ${nombre}%0A`;
    texto += `*Asistirán:* ${pases}%0A`;
    
    // Solo agregamos la sección de mensaje si el usuario escribió algo
    if (mensaje.trim() !== '') {
        texto += `*Mensaje:* ${mensaje}`;
    }

    // 5. Crear el link final de WhatsApp y abrirlo en una pestaña nueva
    const url = `https://wa.me/${telefono}?text=${texto}`;
    window.open(url, '_blank');
}