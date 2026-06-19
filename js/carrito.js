// ========================================
// CARRITO DE COMPRAS - VIDSAFARMA
// ========================================

// 1. Estado del carrito (array de objetos)
let carrito = [];

// 2. Función para agregar productos
function agregarAlCarrito(nombre, precio, imagen) {
    // Buscar si el producto ya está en el carrito
    const existe = carrito.find(item => item.nombre === nombre);
    
    if (existe) {
        // Si existe, aumentar cantidad
        existe.cantidad += 1;
    } else {
        // Si no existe, agregar nuevo
        carrito.push({
            nombre: nombre,
            precio: parseFloat(precio),
            imagen: imagen,
            cantidad: 1
        });
    }
    
    // Guardar en localStorage (para que no se pierda al recargar)
    guardarCarrito();
    
    // Actualizar la vista del carrito
    actualizarVistaCarrito();
    
    // Mostrar notificación
    mostrarNotificacion(`✅ ${nombre} agregado al carrito`);
}

// 3. Función para eliminar un producto
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    guardarCarrito();
    actualizarVistaCarrito();
}

// 4. Función para cambiar cantidad
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

// 8. Contar productos (número de items)
function contarProductos() {
    let total = 0;
    carrito.forEach(item => {
        total += item.cantidad;
    });
    return total;
}

// 9. Actualizar la vista del carrito
function actualizarVistaCarrito() {
    const contenedor = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total-carrito');
    const contador = document.getElementById('contador-carrito');
    
    if (!contenedor) return;
    
    // Actualizar contador de la burbuja
    if (contador) {
        contador.textContent = contarProductos();
        contador.style.display = contarProductos() > 0 ? 'flex' : 'none';
    }
    
    // Si el carrito está vacío
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
    
    // Generar HTML de los productos
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
    
    // Actualizar total
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

// 11. Mostrar notificación flotante
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

// 12. Abrir/cerrar panel del carrito
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
    // Aquí se puede redirigir a una página de pago
}

// ========================================
// INICIALIZAR CARRITO AL CARGAR LA PÁGINA
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    cargarCarrito();
    
    // Asegurar que el panel del carrito esté cerrado al inicio
    const panel = document.getElementById('panel-carrito');
    if (panel) {
        panel.classList.remove('abierto');
    }
});