// la estructura de paneles con su titulo e id

const configuracionesPaneles= [

    {id:"medicamentos", titulo:"Medicamentos Disponibles"},

    {id:"cuidado",titulo:"Cuidado Personal"},

    {id:"bebe", titulo:"Cuidado Bebé"},

    {id:"vitaminas", titulo:"Vitaminas y Suplementos"},

    {id:"equipos",  titulo:"Equipos Médicos"},

    {id:"proteccion",  titulo:"Higiene y Proteción"}

]

function renderizarProductosVidsafarma(){

    // seleccionamos el contenedor donde dejamos vacio

    const contenedorPrincipal=document.querySelector('.contenedor-paneles-productos');

    if(!contenedorPrincipal)

        return;

    let htmlCompleto='';

    // recorremos secuencia de cada panel configurado

    configuracionesPaneles.forEach(panel =>{

        // filtramos los productos de la data que pertenece a la categoria

        const productosDeEstaCategoria=data.filter(producto => producto.categoria===panel.id);

        let htmlTarjetas='';

        //creamos la estructura par acada tarjeta de producto

        productosDeEstaCategoria.forEach(prod => {

            htmlTarjetas +=`

               <div class="item-prod-mini tarjeta-producto" id="producto-${prod.id}">

                 <div class="marco-foto">
                     <img src="../DataProductosContenedor/Imagenes/${prod.categoria}/${prod.imagen}" alt="${prod.nombre}" class="img-prod-real img-producto">
                 </div>

                 <h4 class="nombre-producto">${prod.nombre}</h4>

                 <p class="precio-rebajado">s/. ${prod.precio.toFixed(2)}</p>

                 <button class="boton-agregar" data-nombre="${prod.nombre}" data-precio="${prod.precio}" data-imagen="../DataProductosContenedor/Imagenes/${prod.categoria}/${prod.imagen}">Agregar</button>

               </div>  

            `;

        })

        //unimos el panel  de la categoria con sus tarjetas

        htmlCompleto+=`

              <div class="panel-productos" id="panel-${panel.id}">

                  <h2 class="titulo-panel">${panel.titulo}</h2>

                  <div class="grid-10-productos">

                      ${htmlTarjetas}

                  </div>

              </div>  

        `;

    });

    // ponermos el arbol html estructurado en una sola en e l contenedor principal

    contenedorPrincipal.innerHTML=htmlCompleto;

}

// aquí cargamos primero el html de categorias antes de que ese ejecute el js

document.addEventListener('DOMContentLoaded', () => {

    renderizarProductosVidsafarma();

});


// EVENT LISTENERS PARA BOTONES "AGREGAR"


document.addEventListener('DOMContentLoaded', function() {
    // Delegación de eventos para los botones "Agregar"
    document.addEventListener('click', function(e) {
        const boton = e.target.closest('.boton-agregar');
        if (boton) {
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            const imagen = boton.dataset.imagen;
            
            if (nombre && precio && imagen) {
                agregarAlCarrito(nombre, precio, imagen);
            }
        }
    });
});