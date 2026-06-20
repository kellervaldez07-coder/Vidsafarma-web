document.addEventListener('DOMContentLoaded', () => {
    

});

/* 
    LÓGICA DE LA SECCIÓN DE ENVÍOS
    */

// Función para abrir y cerrar cada acordeón de información
function toggleEnvios(elemento) {
    const itemEnvios = elemento.parentElement;
    itemEnvios.classList.toggle('abierto');
}

// Función para cambiar de categoría (Zonas, Tiempos, Tarifas...)
function mostrarCategoriaEnvios(idCategoria, boton) {
    // Ocultar todos los grupos
    document.querySelectorAll('.grupo-envios').forEach(grupo => {
        grupo.style.display = 'none';
    });
    
    // Quitar la clase 'activo' del menú lateral
    document.querySelectorAll('.btn-cat-envios').forEach(btn => {
        btn.classList.remove('activo');
    });
    
    // Mostrar el grupo correcto y pintar el botón seleccionado
    document.getElementById('envios-' + idCategoria).style.display = 'block';
    boton.classList.add('activo');
}