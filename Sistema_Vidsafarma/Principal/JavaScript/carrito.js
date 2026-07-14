// ========================================
// CARRITO DE COMPRAS - VIDSAFARMA
// ========================================

// 1. Estado del carrito
let carrito = [];

// 2. Agregar productos (función global para que pueda ser llamada desde otros archivos)
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

// 3. Eliminar producto (función global)
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    guardarCarrito();
    actualizarVistaCarrito();
}

// 4. Cambiar cantidad (función global)
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

// 7. Calcular subtotal (sin IGV)
function calcularSubtotal() {
    let subtotal = 0;
    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });
    return subtotal;
}

// 8. Contar productos
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
    const subtotalElement = document.getElementById('subtotal-carrito');
    const igvElement = document.getElementById('igv-carrito');
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
        if (subtotalElement) subtotalElement.textContent = 'S/ 0.00';
        if (igvElement) igvElement.textContent = 'S/ 0.00';
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
                        <button class="btn-disminuir" data-nombre="${item.nombre}">−</button>
                        <span>${item.cantidad}</span>
                        <button class="btn-aumentar" data-nombre="${item.nombre}">+</button>
                    </div>
                </div>
                <button class="btn-eliminar-item" data-nombre="${item.nombre}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
    
    // Agregar event listeners a los botones del carrito
    contenedor.querySelectorAll('.btn-aumentar').forEach(btn => {
        btn.addEventListener('click', function() {
            cambiarCantidad(this.dataset.nombre, 'aumentar');
        });
    });
    
    contenedor.querySelectorAll('.btn-disminuir').forEach(btn => {
        btn.addEventListener('click', function() {
            cambiarCantidad(this.dataset.nombre, 'disminuir');
        });
    });
    
    contenedor.querySelectorAll('.btn-eliminar-item').forEach(btn => {
        btn.addEventListener('click', function() {
            eliminarDelCarrito(this.dataset.nombre);
        });
    });
    
    const subtotal = calcularSubtotal();
    const igv = subtotal * 0.18;
    const total = subtotal + igv;
    
    if (subtotalElement) {
        subtotalElement.textContent = `S/ ${subtotal.toFixed(2)}`;
    }
    if (igvElement) {
        igvElement.textContent = `S/ ${igv.toFixed(2)}`;
    }
    if (totalElement) {
        totalElement.textContent = `S/ ${total.toFixed(2)}`;
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

// 12. Abrir/cerrar carrito (función global para que pueda ser llamada desde otros archivos)
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
    
    const subtotal = calcularSubtotal();
    const igv = subtotal * 0.18;
    const total = subtotal + igv;
    
    alert(`✅ ¡Gracias por tu compra!\n\n` +
          `📋 Resumen de tu pedido:\n` +
          `━━━━━━━━━━━━━━━━━━━━━━\n` +
          `Subtotal:     S/ ${subtotal.toFixed(2)}\n` +
          `IGV (18%):    S/ ${igv.toFixed(2)}\n` +
          `━━━━━━━━━━━━━━━━━━━━━━\n` +
          `TOTAL:        S/ ${total.toFixed(2)}\n` +
          `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `Los productos han sido agregados a tu pedido.`);
}

// ========================================
// EVENT LISTENERS CON addEventListener
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito
    cargarCarrito();
    
    // Asegurar que el panel del carrito esté cerrado al inicio
    const panel = document.getElementById('panel-carrito');
    if (panel) {
        panel.classList.remove('abierto');
    }
    
    // ========================================
    // 1. Botón para abrir/cerrar carrito
    // ========================================
    const btnAbrirCarrito = document.getElementById('btnAbrirCarrito');
    if (btnAbrirCarrito) {
        btnAbrirCarrito.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCarrito();
        });
    }
    
    // ========================================
    // 2. Botón para cerrar carrito
    // ========================================
    const btnCerrarCarrito = document.querySelector('.cerrar-carrito');
    if (btnCerrarCarrito) {
        btnCerrarCarrito.addEventListener('click', function() {
            toggleCarrito();
        });
    }
    
    // ========================================
    // 3. Overlay para cerrar carrito
    // ========================================
    const overlay = document.getElementById('overlay-carrito');
    if (overlay) {
        overlay.addEventListener('click', function() {
            toggleCarrito();
        });
    }
    
    // ========================================
    // 4. Botones de acciones del carrito
    // ========================================
    const btnVaciar = document.querySelector('.btn-vaciar');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', vaciarCarrito);
    }
    
    const btnFinalizar = document.querySelector('.btn-finalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', finalizarCompra);
    }
});