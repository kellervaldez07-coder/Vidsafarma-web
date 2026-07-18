document.addEventListener('DOMContentLoaded', () => {
    initMenuToggle();
    initDarkMode();
    
    initPriceFilter();
    

    
});
/*
 Menú de navegación interactivo (Toggle)
 */
const initMenuToggle = () => {
    const btnMenu = document.getElementById('btnMenu');
    const navegacionPrincipal = document.getElementById('navegacionPrincipal');

    if (!btnMenu || !navegacionPrincipal) return;

    btnMenu.addEventListener('click', () => {
        navegacionPrincipal.classList.toggle('activo');
        const icono = btnMenu.querySelector('i');
        if (navegacionPrincipal.classList.contains('activo')) {
            icono.classList.remove('fa-bars');
            icono.classList.add('fa-xmark');
        } else {
            icono.classList.remove('fa-xmark');
            icono.classList.add('fa-bars');
        }
    });
};

/*
 Modo Oscuro
 */
const initDarkMode = () => {
    const btnDarkMode = document.getElementById('btnDarkMode');
    if (!btnDarkMode) return;

    const icono = btnDarkMode.querySelector('i');
    const temaGuardado = localStorage.getItem('vidsafarma-tema');

    if (temaGuardado === 'dark') {
        document.body.classList.add('dark-mode');
        icono.classList.remove('fa-moon');
        icono.classList.add('fa-sun');
    }

    btnDarkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('vidsafarma-tema', 'dark');
            icono.classList.remove('fa-moon');
            icono.classList.add('fa-sun');
        } else {
            localStorage.setItem('vidsafarma-tema', 'light');
            icono.classList.remove('fa-sun');
            icono.classList.add('fa-moon');
        }
    });
};

/*
  Filtro de Precios 
 */
const initPriceFilter = () => {
    const selectOrdenar = document.getElementById('ordenarPrecio');
    const contenedorOfertas = document.querySelector('.cuadricula-ofertas');

    if (!selectOrdenar || !contenedorOfertas) return;

    const ordenOriginal = Array.from(contenedorOfertas.querySelectorAll('.tarjeta-promo'));

    selectOrdenar.addEventListener('change', (e) => {
        const valorFiltro = e.target.value;
        
        if (valorFiltro === 'defecto') {
            contenedorOfertas.innerHTML = '';
            ordenOriginal.forEach(producto => contenedorOfertas.appendChild(producto));
            return; 
        }

        let productos = Array.from(contenedorOfertas.querySelectorAll('.tarjeta-promo'));

        productos.sort((a, b) => {
            const elementoA = a.querySelector('.precio-rebajado');
            const elementoB = b.querySelector('.precio-rebajado');
            
            const textoA = elementoA ? elementoA.textContent : '0';
            const textoB = elementoB ? elementoB.textContent : '0';
            
            const matchA = textoA.match(/\d+(\.\d+)?/);
            const matchB = textoB.match(/\d+(\.\d+)?/);

            const precioA = matchA ? parseFloat(matchA[0]) : 0;
            const precioB = matchB ? parseFloat(matchB[0]) : 0;

            if (valorFiltro === 'menor') return precioA - precioB; 
            if (valorFiltro === 'mayor') return precioB - precioA; 
            return 0;
        });

        contenedorOfertas.innerHTML = '';
        productos.forEach(producto => {
            contenedorOfertas.appendChild(producto);
        });
    });
};

// Creamos el efecto zoom a los productos en oferta

const cajasPromo = document.querySelectorAll('.caja-imagen-promo');

cajasPromo.forEach(caja =>{
    const imagen = caja.querySelector('.imagen-promo');

    // Escuchamos el movimiento del mouse
    caja.addEventListener('mousemove',(e) => {
        // Aqui calculamos las coordenadas del mouse relativas a la caja

        const{ left, top, width, height } = caja.getBoundingClientRect();
        const x = ((e.clientX-left) / width)*100;
        const y = ((e.clientY-top) / height)*100;

        //Se mueve el origen de la trasnformacion hacia el mouse

        imagen.style.transformOrigin = `${x}% ${y}%`;
    });

    // cuando el mouse sale de la imagen vuelve a su normalidad
    caja.addEventListener('mouseleave',() =>{
        imagen.style.transformOrigin = 'center center';
    });
});
