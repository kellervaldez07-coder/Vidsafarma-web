
document.addEventListener('DOMContentLoaded', () => {
    initMenuToggle();
    initDarkMode();
    initSearchValidation();
    initCarritoUI(); 
    // Nota: initAddToCart() fue eliminado porque aquí no agregamos productos.
});

/*
  MENÚ DE NAVEGACIÓN (Toggle)
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
 MODO OSCURO (LocalStorage)
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
  VALIDACIÓN DE BUSCADOR
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
            inputBusqueda.style.border = '2px solid #e74c3c';
        } else if (termino.length < 3) {
            event.preventDefault();
            errorBusqueda.textContent = 'Introduce al menos 3 caracteres.';
            inputBusqueda.style.border = '2px solid #e74c3c';
        }
    });
};

/**
  LÓGICA DEL CARRITO LATERAL (Apertura, Cierre y Eventos)
 */
const initCarritoUI = () => {
    const btnAbrirCarrito = document.getElementById('btnAbrirCarrito');
    const btnCerrarCarrito = document.getElementById('btnCerrarCarrito');
    const carritoLateral = document.getElementById('carritoLateral');
    const overlayCarrito = document.getElementById('overlayCarrito');

    // Abrir Panel
    if (btnAbrirCarrito && carritoLateral) {
        btnAbrirCarrito.addEventListener('click', (e) => {
            e.preventDefault();
            carritoLateral.classList.add('abierto');
            if(overlayCarrito) overlayCarrito.classList.add('activo');
            actualizarListaCarrito(); 
        });
    }

    // Cerrar Panel
    const cerrarPanel = () => {
        if(carritoLateral) carritoLateral.classList.remove('abierto');
        if(overlayCarrito) overlayCarrito.classList.remove('activo');
    };

    if (btnCerrarCarrito) btnCerrarCarrito.addEventListener('click', cerrarPanel);
    if (overlayCarrito) overlayCarrito.addEventListener('click', cerrarPanel);

    // Actualizamos la burbuja al cargar la página
    actualizarBurbujaCarrito();

    // Evento de delegación para eliminar productos desde el sidebar
    const listaCarrito = document.getElementById('listaCarrito');
    if (listaCarrito) {
        listaCarrito.addEventListener('click', (e) => {
            const btnEliminar = e.target.closest('.boton-eliminar-item');
            if (btnEliminar) {
                const idProducto = btnEliminar.dataset.id;
                eliminarDelCarrito(idProducto);
            }
        });
    }
};

/**
 ACTUALIZAR VISTA DEL CARRITO LATERAL (Lectura)
 */
const actualizarListaCarrito = () => {
    const listaCarrito = document.getElementById('listaCarrito');
    const totalPrecioCarrito = document.getElementById('totalPrecioCarrito');
    
    if(!listaCarrito || !totalPrecioCarrito) return;

    let carritoLista = JSON.parse(localStorage.getItem('vidsafarma-carrito-lista')) || [];
    
    if (carritoLista.length === 0) {
        listaCarrito.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
        totalPrecioCarrito.textContent = 'S/. 0.00';
        return;
    }

    listaCarrito.innerHTML = ''; 
    let total = 0;

    carritoLista.forEach(producto => {
        total += producto.precio;
        const itemHTML = `
            <div class="item-carrito">
                <img src="${producto.imagen}" alt="${producto.titulo}" class="img-item-carrito">
                <div class="info-item-carrito">
                    <h4 class="titulo-item-carrito">${producto.titulo}</h4>
                    <span class="precio-item-carrito">S/. ${producto.precio.toFixed(2)}</span>
                </div>
                <button class="boton-eliminar-item" data-id="${producto.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        listaCarrito.insertAdjacentHTML('beforeend', itemHTML);
    });

    totalPrecioCarrito.textContent = `S/. ${total.toFixed(2)}`;
};

/**
 ACTUALIZAR BURBUJA VERDE (Número de items)
 */
const actualizarBurbujaCarrito = () => {
    const contadoresCarrito = document.querySelectorAll('.contador-carrito');
    let carritoLista = JSON.parse(localStorage.getItem('vidsafarma-carrito-lista')) || [];
    
    contadoresCarrito.forEach(contador => {
        contador.textContent = carritoLista.length;
    });
};

/**
  ELIMINAR UN PRODUCTO
 */
const eliminarDelCarrito = (idEliminar) => {
    let carritoLista = JSON.parse(localStorage.getItem('vidsafarma-carrito-lista')) || [];
    carritoLista = carritoLista.filter(producto => producto.id !== idEliminar);
    localStorage.setItem('vidsafarma-carrito-lista', JSON.stringify(carritoLista));
    
    actualizarListaCarrito();
    actualizarBurbujaCarrito();
};