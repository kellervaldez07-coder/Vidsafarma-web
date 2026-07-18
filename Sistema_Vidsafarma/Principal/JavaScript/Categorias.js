document.addEventListener('DOMContentLoaded', () => {
    initMenuToggle();
    initDarkMode();
    actualizarContadorHeader(); 
});

/*
 MENÚ DE NAVEGACIÓN toggle
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
   LocalStorage
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


document.addEventListener('mousemove', (e) => {
    // Escuchamos si el mouse entra en el marco protector
    const marco = e.target.closest('.marco-foto');
    
    if (marco) {
        const imagen = marco.querySelector('.img-producto');
        
        if (imagen) {
            // Calculamos coordenadas relativas
            const { left, top, width, height } = marco.getBoundingClientRect(); 
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;

            // Movemos el ancla del zoom hacia el puntero
            imagen.style.transformOrigin = `${x}% ${y}%`;
        }
    }
});

document.addEventListener('mouseout', (e) => {
    const marco = e.target.closest('.marco-foto');
    
    if (marco) {
        // Aseguramos que el mouse realmente salió del marco
        if (!marco.contains(e.relatedTarget)) {
            const imagen = marco.querySelector('.img-producto');
            if (imagen) {
                // Devolvemos el origen al centro al salir
                imagen.style.transformOrigin = 'center center';
            }
        }
    }
});
