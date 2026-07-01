document.addEventListener('DOMContentLoaded', () => {
    const inputBusqueda = document.getElementById('inputBusqueda');
    const modalResultados = document.getElementById('modalResultados');
    const listaCoincidencias = document.getElementById('listaCoincidencias');
    const botonBuscar = document.querySelector('.boton-buscar');
    const mensajeError = document.getElementById('errorBusqueda');
 /* Función par ahacer el scroll  */
    const enfocarProducto = (id) => {
        const tarjetaProducto = document.getElementById(`producto-${id}`);
        
        if (!tarjetaProducto) {
            console.warn(`Elemento no encontrado: producto-${id}`);
            return;
        }

        tarjetaProducto.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        const sombraOriginal = tarjetaProducto.style.boxShadow;
        tarjetaProducto.style.transition = 'box-shadow 0.3s ease';
        tarjetaProducto.style.boxShadow = '0 0 20px rgb(255, 247, 0)';
        
        setTimeout(() => {
            tarjetaProducto.style.boxShadow = sombraOriginal;
        }, 2000);
    };
     /* Validando el botón de búsqueda*/ 
    if (botonBuscar) {
        botonBuscar.addEventListener('click', (e) => {
            e.preventDefault(); 
            const texto = inputBusqueda.value.trim();

            if (texto.length === 0) {
                if (mensajeError) {
                    mensajeError.textContent = 'Campo no válido, está vacío.';
                    mensajeError.style.display = 'block';
                }
                if (modalResultados) modalResultados.classList.add('oculto');
            } else {
                if (mensajeError) mensajeError.style.display = 'none';
            }
        });
    }
     /* Logica de búsqueday dar click en los resultados de coincidencias*/
    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', (e) => {
            if (mensajeError) mensajeError.style.display = 'none';

            const texto = e.target.value.toLowerCase().trim();
            if (listaCoincidencias) listaCoincidencias.innerHTML = '';

            if (texto.length === 0) {
                if (modalResultados) modalResultados.classList.add('oculto');
                return;
            }

            const coincidencias = typeof data !== 'undefined' ? data.filter(producto => 
                producto.nombre.toLowerCase().includes(texto)
            ) : [];

            if (coincidencias.length > 0) {
                if (modalResultados) modalResultados.classList.remove('oculto');
                
                coincidencias.forEach(producto => {
                    const li = document.createElement('li');
                    li.textContent = producto.nombre;
                    
                    li.addEventListener('click', () => {
                        inputBusqueda.value = producto.nombre;
                        if (modalResultados) modalResultados.classList.add('oculto');

                        /* se verifica en qu epágina estamos */
                        /* Se busca si el contenedor de las tarjetas existe es decir si estamos en Categorias.html */

                        const isCategoriasPage = document.querySelector('.cuadricula-selectores-cat') !== null;

                        if (isCategoriasPage) {
                            const radioCategoria = document.getElementById(`cat-${producto.categoria}`);
                            if (radioCategoria) radioCategoria.checked = true;
                              /* se da el tiempo al DOM pueda mostrar la pestaña */
                            setTimeout(() => {
                                enfocarProducto(producto.id);
                            }, 150);
                        } else {
                            /* Si estamos en otra pagina diferenete a la de Categorias  lorederigimos y pasamos el id por la url */
                            window.location.href = `../Html/Categorias.html?idProducto=${producto.id}&categoria=${producto.categoria}`;
                        }
                    });

                    if (listaCoincidencias) listaCoincidencias.appendChild(li);
                });
            } else {
                if (modalResultados) modalResultados.classList.add('oculto');
            }
        });
    }

    document.addEventListener('click', (e) => {
        const contenedorBuscador = document.getElementById('formBusqueda');
        if (contenedorBuscador && modalResultados) {
            if (!contenedorBuscador.contains(e.target) && !modalResultados.contains(e.target)) {
                modalResultados.classList.add('oculto');
            }
        }
    });
     // leer lo sparametros de l aurl
    const parametrosURL = new URLSearchParams(window.location.search);
    const idProductoBuscado = parametrosURL.get('idProducto');
    const categoriaBuscada = parametrosURL.get('categoria');
     // si la URL trae un producto de otra página
    if (idProductoBuscado && categoriaBuscada) {
        // activamos la pagina correcta donde estan los productos
        const radioCategoria = document.getElementById(`cat-${categoriaBuscada}`);
        if (radioCategoria) {
            radioCategoria.checked = true;
        }
         // se da un tiewmpo para que el renderProductos muestre la tarjeta del prodcuto correspondiente
        setTimeout(() => {
            enfocarProducto(idProductoBuscado);
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 300); 
    }
});