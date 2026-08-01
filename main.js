document.addEventListener('DOMContentLoaded', () => {

    // ==========================
    // 1. SWIPERS (Carruseles)
    // ==========================
    const carrouselContainer = document.querySelector('.carrousel-img-container');
    if (carrouselContainer) {
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
    }

    const productosGrid = document.querySelector('.productos-grid');
    if (productosGrid) {
        const swiperProductos = new Swiper('.productos-grid', {
            slidesPerView: 3,     
            spaceBetween: 8,      
            grabCursor: true,
            centerInsufficientSlides: true,
        });
    }

    // ===========================
    // 2. MENÚ DESPLEGABLE MÓVIL 
    // ===========================
    const botonMenu = document.querySelector('.menu-desplegable');
    const menuLinks = document.querySelector('.nav-links'); 

    if (botonMenu && menuLinks) {
        botonMenu.addEventListener('click', function(){
            menuLinks.classList.toggle('activo');
        });
    }

    // =========================
    // 3. SUBMENÚ DE PRODUCTOS
    // =========================
    const linkToggle = document.querySelector('.link-toggle');
    const itemSubMenu = document.querySelector('.item-submenu');
    const todosLosLinks = document.querySelectorAll('.nav-links a');

    if (linkToggle && itemSubMenu) {
        linkToggle.addEventListener('click', function(e) {
            if (window.innerWidth < 1024) {
                e.preventDefault(); 
                itemSubMenu.classList.toggle('abierto'); 
            }
        });
    }

    todosLosLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!e.target.classList.contains('link-toggle')) {
                if (menuLinks) menuLinks.classList.remove('activo'); 
                if (itemSubMenu) itemSubMenu.classList.remove('abierto'); 
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

            if (desplazamientoActual <= 100) {
                header.classList.remove('hidden-header');
                ubicacionActual = desplazamientoActual;
                return;
            }

            if(ubicacionActual >= desplazamientoActual){
                header.classList.remove('hidden-header'); 
            } else {
                header.classList.add('hidden-header');    
            }
            ubicacionActual = desplazamientoActual;
        });
    }

    // ==========================================
    // 5. INTERACCIONES DE IMÁGENES (Sección 3)
    // ==========================================
    const listItems = document.querySelectorAll('.list-item');
    const images = document.querySelectorAll('.showcase-img');

    if (listItems.length > 0 && images.length > 0) {
        let indexActualInteractivo = 0; 
        let intervaloInteractivo; 

        function changeImage(index) {
            images.forEach(img => img.classList.remove('active'));
            
            const targetImage = document.getElementById('img-' + index);
            if (targetImage) {
                targetImage.classList.add('active');
            }
            
            listItems.forEach((item, i) => {
                if(i == parseInt(index)) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
            
            
            indexActualInteractivo = parseInt(index);
        }

   
        function iniciarAutoPlayInteractivo() {
            intervaloInteractivo = setInterval(() => {
               
                
                    indexActualInteractivo++;
                    
                   
                    if (indexActualInteractivo >= listItems.length) {
                        indexActualInteractivo = 0;
                    }
                    
                    changeImage(indexActualInteractivo);
                
            }, 10000); 
        }

        
        function reiniciarAutoPlayInteractivo() {
            clearInterval(intervaloInteractivo);
            iniciarAutoPlayInteractivo();
        }

        listItems.forEach((item) => {
            const index = item.getAttribute('data-index');

            item.addEventListener('mouseenter', () => {
                changeImage(index);
                reiniciarAutoPlayInteractivo(); 
            });

            item.addEventListener('click', () => {
                changeImage(index);
                reiniciarAutoPlayInteractivo();
            });
        });

    
        iniciarAutoPlayInteractivo();
    }

    // =========================
    // 6. SLIDER DE SERVICIOS 
    // =========================
    const tarjetasServicios = document.querySelectorAll('.card-servicio');
    const dotsServicios = document.querySelectorAll('.dot');
    
    if (tarjetasServicios.length > 0) {
        const totalTarjetas = tarjetasServicios.length; 
        let indexActualServ = 0;
        let intervaloAutoPlayServ;

        function actualizarSliderServ() {
            tarjetasServicios.forEach((tarjeta, index) => {
                if (index === indexActualServ) {
                    tarjeta.classList.add('active-card');
                } else {
                    tarjeta.classList.remove('active-card');
                }
            });

            dotsServicios.forEach((dot, index) => {
                if (index === indexActualServ) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        window.moverSlider = function(direccion) {
            indexActualServ += direccion;
            
            if (indexActualServ < 0) {
                indexActualServ = totalTarjetas - 1;
            } else if (indexActualServ >= totalTarjetas) {
                indexActualServ = 0;
            }
            
            actualizarSliderServ();
            reiniciarAutoPlayServ(); 
        }

        function iniciarAutoPlayServ() {
            intervaloAutoPlayServ = setInterval(() => {
                if (window.innerWidth <= 1023) {
                    window.moverSlider(1);
                }
            }, 4000); 
        }

        function reiniciarAutoPlayServ() {
            clearInterval(intervaloAutoPlayServ);
            iniciarAutoPlayServ();
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1023) {
                indexActualServ = 0; 
            }
            actualizarSliderServ();
        });

        iniciarAutoPlayServ();
    }
});