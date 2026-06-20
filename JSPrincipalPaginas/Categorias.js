/**
 /* Vidsafarma - Módulo Principal de JavaScript (main.js)
  

 */

document.addEventListener('DOMContentLoaded', () => {
    initMenuToggle();
    initDarkMode();
    initSearchValidation();
    initCarritoUI();
    initAddToCart(); 
});

/**
 * 1. MENÚ DE NAVEGACIÓN (Toggle)
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

/**
 *  (LocalStorage)
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

/**
 * 3. VALIDACIÓN DE BUSCADOR
 */
const initSearchValidation = () => {
    const formBusqueda = document.querySelector('.barra-busqueda');
    if (!formBusqueda) return;

    const inputBusqueda = formBusqueda.querySelector('.campo-busqueda');
    let errorBusqueda = formBusqueda.nextElementSibling;
    
    if (!errorBusqueda || !errorBusqueda.classList.contains('mensaje-error')) {
        errorBusqueda = document.createElement('div');
        errorBusqueda.className = 'mensaje-error';
        errorBusqueda.style.position = 'absolute';
        errorBusqueda.style.top = '100%';
        errorBusqueda.style.left = '10px';
        errorBusqueda.style.marginTop = '4px';
        formBusqueda.parentNode.insertBefore(errorBusqueda, formBusqueda.nextSibling);
    }

    formBusqueda.addEventListener('submit', (event) => {
        const termino = inputBusqueda.value.trim();
        errorBusqueda.textContent = '';
        inputBusqueda.style.border = '';

        if (termino === '') {
            event.preventDefault();
            errorBusqueda.textContent = 'El campo de búsqueda no puede estar vacío.';
            inputBusqueda.style.border = '2px solid var(--campo-invalido';
        } else if (termino.length < 3) {
            event.preventDefault();
            errorBusqueda.textContent = 'El campo de búsqueda no púerde estar vacío´.';
            inputBusqueda.style.border = '2px solid var(--campo-invalido)';
        }
    });
};

