/* Vidsafarma - Módulo Principal (Inicio y Categorías) */

document.addEventListener('DOMContentLoaded', () => {
    initMenuToggle();
    initDarkMode();
   

});

/* MENÚ DE NAVEGACIÓN toggle */
const initMenuToggle = () => {
    const btnMenu = document.getElementById('btnMenu');
    const navegacionPrincipal = document.getElementById('navegacionPrincipal');

    if (!btnMenu || !navegacionPrincipal) return;

    btnMenu.addEventListener('click', () => {
        navegacionPrincipal.classList.toggle('activo');
        
        const icono = btnMenu.querySelector('i');
        if (navegacionPrincipal.classList.contains('activo')) {
            icono.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icono.classList.replace('fa-xmark', 'fa-bars');
        }
    });
};

/* MODO OSCURO (LocalStorage) */
const initDarkMode = () => {
    const btnDarkMode = document.getElementById('btnDarkMode');
    if (!btnDarkMode) return;

    const icono = btnDarkMode.querySelector('i');
    const temaGuardado = localStorage.getItem('vidsafarma-tema');

    if (temaGuardado === 'dark') {
        document.body.classList.add('dark-mode');
        icono.classList.replace('fa-moon', 'fa-sun');
    }

    btnDarkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('vidsafarma-tema', 'dark');
            icono.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('vidsafarma-tema', 'light');
            icono.classList.replace('fa-sun', 'fa-moon');
        }
    });
};




