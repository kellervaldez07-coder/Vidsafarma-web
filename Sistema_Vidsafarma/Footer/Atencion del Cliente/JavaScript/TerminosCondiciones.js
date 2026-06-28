document.addEventListener('DOMContentLoaded', () => {
    
   
});
/* 
       LÓGICA DEL BUSCADOR 
        */
    const formBusqueda = document.getElementById('formBusqueda');
    const errorBusqueda = document.getElementById('errorBusqueda');
    const inputBusqueda = document.getElementById('inputBusqueda');

    if (formBusqueda && errorBusqueda) {
        formBusqueda.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página intente recargar
            
            // Verificamos si el usuario escribió algo
            if (inputBusqueda.value.trim() === "") {
                // Mensaje si le dan clic al botón sin escribir nada
                errorBusqueda.textContent = "Por favor, ingresa un término de búsqueda.";
            } else {
                // Mensaje si escribieron algo (simulando que está en desarrollo)
                errorBusqueda.textContent = "La función de búsqueda no está disponible en este momento.";
            }

            // El mensaje rojo desaparecerá automáticamente después de 4 segundos
            setTimeout(() => {
                errorBusqueda.textContent = "";
            }, 4000);
        });
    }

/* 
   2. LÓGICA DE LA SECCIÓN DE TÉRMINOS
    */

function toggleTerminos(elemento) {
    const itemTerminos = elemento.parentElement;
    itemTerminos.classList.toggle('abierto');
}

function mostrarCategoriaTerminos(idCategoria, boton) {
    document.querySelectorAll('.grupo-terminos').forEach(grupo => {
        grupo.style.display = 'none';
    });
    
    document.querySelectorAll('.btn-cat-terminos').forEach(btn => {
        btn.classList.remove('activo');
    });
    
    document.getElementById('terminos-' + idCategoria).style.display = 'block';
    boton.classList.add('activo');
}