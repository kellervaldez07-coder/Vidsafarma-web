document.addEventListener('DOMContentLoaded', () => {
    
});

/* 
    LÓGICA DE LA SECCIÓN DE DEVOLUCIONES
  */

// Función para abrir y cerrar cada acordeón de información
function toggleDevoluciones(elemento) {
    const itemDevoluciones = elemento.parentElement;
    itemDevoluciones.classList.toggle('abierto');
}

// Función para cambiar de categorias de las devoluciones 
function mostrarCategoriaDevoluciones(idCategoria, boton) {
    // Ocultar todos los grupos
    document.querySelectorAll('.grupo-devoluciones').forEach(grupo => {
        grupo.style.display = 'none';
    });
    
    // Quitar la clase activo el menú lateral
    document.querySelectorAll('.btn-cat-devoluciones').forEach(btn => {
        btn.classList.remove('activo');
    });
    
    // Mostrar el grupo correcto y pintar el botón seleccionado
    document.getElementById('devoluciones-' + idCategoria).style.display = 'block';
    boton.classList.add('activo');
}