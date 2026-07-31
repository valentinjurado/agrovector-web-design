// ==========================================
// 1. SWIPERS (Carruseles)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Swiper de Capacitaciones
  const swiper = new Swiper('.carrousel-img-container', {
    slidesPerView: 1,
    spaceBetween: 12,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // Swiper de Productos
  const swiperProductos = new Swiper('.productos-grid', {
      slidesPerView: 3,     
      spaceBetween: 8,      
      grabCursor: true,
      centerInsufficientSlides: true,
  });
});

// ==========================================
// 2. MENÚ DESPLEGABLE MÓVIL (Hamburguesa)
// ==========================================
const botonMenu = document.querySelector('.menu-desplegable');
const menuLinks = document.querySelector('.nav-links'); // Declarado UNA sola vez

// Abrir/Cerrar menú con la hamburguesa
if (botonMenu && menuLinks) {
    botonMenu.addEventListener('click', function(){
      menuLinks.classList.toggle('activo');
    });
}

// ==========================================
// 3. SUBMENÚ DE PRODUCTOS
// ==========================================
const linkToggle = document.querySelector('.link-toggle');
const itemSubMenu = document.querySelector('.item-submenu');
const todosLosLinks = document.querySelectorAll('.nav-links a');

if (linkToggle && itemSubMenu) {
    // 1. Abrir submenú en el celular al hacer click en "Productos >"
    linkToggle.addEventListener('click', function(e) {
        if (window.innerWidth < 1024) {
            e.preventDefault(); // Evita que la pantalla salte hacia arriba
            itemSubMenu.classList.toggle('abierto'); 
        }
    });
}

// 2. Cierre inteligente del menú
todosLosLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Chequeamos si el link que tocaron NO es el de "Productos >"
        if (!e.target.classList.contains('link-toggle')) {
            if (menuLinks) {
                menuLinks.classList.remove('activo'); // Cierra la barra beige
            }
            if (itemSubMenu) {
                itemSubMenu.classList.remove('abierto'); // Cierra el submenú blanco
            }
        }
    });
});

// ==========================================
// 4. HEADER INTELIGENTE (Ocultar al scrollear)
// ==========================================
let ubicacionActual = window.scrollY;
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', function(){
      let desplazamientoActual = window.scrollY;

      // Zona segura arriba del todo
      if (desplazamientoActual <= 100) {
            header.classList.remove('hidden-header');
            ubicacionActual = desplazamientoActual;
            return;
      }

      // Detectar si sube o baja
      if(ubicacionActual >= desplazamientoActual){
        header.classList.remove('hidden-header'); // Sube: muestra
      } else {
        header.classList.add('hidden-header');    // Baja: oculta
      }

      ubicacionActual = desplazamientoActual;
    });
}