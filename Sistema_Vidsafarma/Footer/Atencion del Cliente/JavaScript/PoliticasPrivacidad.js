document.addEventListener('DOMContentLoaded', () => {
    
   
});

/* 
    LÓGICA DE LA SECCIÓN DE PRIVACIDAD
    */

function togglePrivacidad(elemento) {
    const itemPrivacidad = elemento.parentElement;
    itemPrivacidad.classList.toggle('abierto');
}

function mostrarCategoriaPrivacidad(idCategoria, boton) {
    document.querySelectorAll('.grupo-privacidad').forEach(grupo => {
        grupo.style.display = 'none';
    });
    
    document.querySelectorAll('.btn-cat-privacidad').forEach(btn => {
        btn.classList.remove('activo');
    });
    
    document.getElementById('privacidad-' + idCategoria).style.display = 'block';
    boton.classList.add('activo');
}