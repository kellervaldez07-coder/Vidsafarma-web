// ========================================
// CARRITO DE COMPRAS - VIDSAFARMA
// ========================================

// 1. Estado del carrito
let carrito = [];

// 2. Agregar productos
function agregarAlCarrito(nombre, precio, imagen) {
    const existe = carrito.find(item => item.nombre === nombre);
    
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({
            nombre: nombre,
            precio: parseFloat(precio),
            imagen: imagen,
            cantidad: 1
        });
    }
    
    guardarCarrito();
    actualizarVistaCarrito();
    mostrarNotificacion(`✅ ${nombre} agregado al carrito`);
}

// 3. Eliminar producto
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    guardarCarrito();
    actualizarVistaCarrito();
}

// 4. Cambiar cantidad
function cambiarCantidad(nombre, accion) {
    const item = carrito.find(item => item.nombre === nombre);
    if (item) {
        if (accion === 'aumentar') {
            item.cantidad += 1;
        } else if (accion === 'disminuir') {
            item.cantidad -= 1;
            if (item.cantidad <= 0) {
                eliminarDelCarrito(nombre);
                return;
            }
        }
        guardarCarrito();
        actualizarVistaCarrito();
    }
}

// 5. Guardar en localStorage
function guardarCarrito() {
    localStorage.setItem('carritoVidsafarma', JSON.stringify(carrito));
}

// 6. Cargar desde localStorage
function cargarCarrito() {
    const datos = localStorage.getItem('carritoVidsafarma');
    if (datos) {
        carrito = JSON.parse(datos);
    } else {
        carrito = [];
    }
    actualizarVistaCarrito();
}

// 7. Calcular total
function calcularTotal() {
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });
    return total.toFixed(2);
}

// 8. Contar productos
function contarProductos() {
    let total = 0;
    carrito.forEach(item => {
        total += item.cantidad;
    });
    return total;
}

// 9. Actualizar vista del carrito
function actualizarVistaCarrito() {
    const contenedor = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total-carrito');
    const contador = document.getElementById('contadorCarrito');
    
    if (!contenedor) return;
    
    if (contador) {
        contador.textContent = contarProductos();
        contador.style.display = contarProductos() > 0 ? 'inline' : 'none';
    }
    
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Tu carrito está vacío</p>
                <span>¡Empieza a agregar productos!</span>
            </div>
        `;
        if (totalElement) totalElement.textContent = 'S/ 0.00';
        return;
    }
    
    let html = '';
    carrito.forEach(item => {
        html += `
            <div class="carrito-item">
                <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-img">
                <div class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p class="carrito-item-precio">S/ ${item.precio.toFixed(2)}</p>
                    <div class="carrito-item-cantidad">
                        <button onclick="cambiarCantidad('${item.nombre}', 'disminuir')">−</button>
                        <span>${item.cantidad}</span>
                        <button onclick="cambiarCantidad('${item.nombre}', 'aumentar')">+</button>
                    </div>
                </div>
                <button class="carrito-item-eliminar" onclick="eliminarDelCarrito('${item.nombre}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
    
    if (totalElement) {
        totalElement.textContent = `S/ ${calcularTotal()}`;
    }
}

// 10. Vaciar carrito
function vaciarCarrito() {
    if (carrito.length === 0) return;
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
        carrito = [];
        guardarCarrito();
        actualizarVistaCarrito();
        mostrarNotificacion('🗑️ Carrito vaciado');
    }
}

// 11. Mostrar notificación
function mostrarNotificacion(mensaje) {
    const notificacion = document.getElementById('notificacion-carrito');
    if (notificacion) {
        notificacion.textContent = mensaje;
        notificacion.style.display = 'block';
        setTimeout(() => {
            notificacion.style.display = 'none';
        }, 2500);
    }
}

// 12. Abrir/cerrar carrito
function toggleCarrito() {
    const panel = document.getElementById('panel-carrito');
    if (panel) {
        panel.classList.toggle('abierto');
    }
}

// 13. Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarNotificacion('⚠️ El carrito está vacío');
        return;
    }
    alert(`✅ ¡Gracias por tu compra!\nTotal: S/ ${calcularTotal()}\n\nLos productos han sido agregados a tu pedido.`);
}

// INICIALIZAR
document.addEventListener('DOMContentLoaded', function() {
    cargarCarrito();
    const panel = document.getElementById('panel-carrito');
    if (panel) {
        panel.classList.remove('abierto');
    }
});