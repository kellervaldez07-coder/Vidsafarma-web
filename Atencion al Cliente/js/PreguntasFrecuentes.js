document.addEventListener('DOMContentLoaded', () => {
    
    
});

/* 
    LÓGICA DE PREGUNTAS FRECUENTES 
   
    */

// Función para abrir y cerrar cada acordeón de preguntas
function toggleFaq(elemento) {
    const itemFaq = elemento.parentElement;
    itemFaq.classList.toggle('abierto');
}

/* Función para cambiar de categorias de preguntas frecunetes */
function mostrarCategoriaFaq(idCategoria, boton) {
    // Ocultar todos los grupos de preguntas
    document.querySelectorAll('.grupo-faq').forEach(grupo => {
        grupo.style.display = 'none';
    });
    
    // Quitar la clase activodel menú lateral
    document.querySelectorAll('.btn-cat-faq').forEach(btn => {
        btn.classList.remove('activo');
    });
    
    // Mostrar el grupo correcto y pintar el botón seleccionado
    document.getElementById('faq-' + idCategoria).style.display = 'block';
    boton.classList.add('activo');
}