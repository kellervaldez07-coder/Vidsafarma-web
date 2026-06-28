/*  LIBRO DE RECLAMACIONES */
document.addEventListener('DOMContentLoaded', () => {
    mostrarFechaActual();
    initDropdownsUbicacion();
    initValidacionFormulario();
});

/*  MOSTRAR FECHA Y HORA ACTUAL */
const mostrarFechaActual = () => {
    const contenedorFecha = document.getElementById('fecha-actual');
    if (!contenedorFecha) return;

    const hoy = new Date();
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    contenedorFecha.textContent = `Fecha de registro: ${hoy.toLocaleDateString('es-PE', opcionesFecha)}`;
};

/*  BASE DE DATOS LOCAL PARA UBICACIONES*/
const datosUbicacion = {
    "Lambayeque": {
        "Chiclayo": ["Chiclayo", "José Leonardo Ortiz", "La Victoria", "Pimentel", 
            "Monsefú", "Reque","Cayaltí","Chongoyape","Lagunas","Nueva Arica","Picsi"],
        "Lambayeque": ["Lambayeque", "Íllimo", "Mochumí", "Mórrope", "Motupe"],
        "Ferreñafe": ["Ferreñafe", "Inkawuasi", "Pueblo Nuevo","Pitipo","Mnuel Antonio Mesones Muro","Kañaris"]
    },
    "La Libertad": {
        "Trujillo": ["Trujillo", "Víctor Larco Herrera", "Huanchaco", "El Porvenir", 
            "La Esperanza", "Laredo","Moche","Simbal","Florencia de Mora","Salaverry"],
        "Ascope": ["Ascope", "Chicama", "Paiján", "Casa Grande"],
        "Pacasmayo": ["San Pedro de Lloc", "Pacasmayo", "Guadalupe",""],
        "Chepen":["Chepén","Pacanga","Pueblo Nuevo"],
        "Otuzco":["Otuzco","Charal","La Cuesta","Salpo","Sinisicap"],
        "Virú":["Virú","Chao","Guadalupito"]
    },
    "Piura": {
        "Piura": ["Piura", "Castilla", "Catacaos", "La Arena"],
        "Sullana": ["Sullana", "Bellavista", "Marcavelica"],
        "Talara": ["Pariñas", "El Alto", "Máncora"]
    }
};

/* LÓGICA DE LOS DESPLEGABLES ENCADENADOS */
const initDropdownsUbicacion = () => {
    const selectDepartamento = document.getElementById('departamento');
    const selectProvincia = document.getElementById('provincia');
    const selectDistrito = document.getElementById('distrito');

    if (!selectDepartamento || !selectProvincia || !selectDistrito) return;

    for (let departamento in datosUbicacion) {
        let opcion = document.createElement('option');
        opcion.value = departamento;
        opcion.textContent = departamento;
        selectDepartamento.appendChild(opcion);
    }

    
    selectDepartamento.addEventListener('change', function() {
        // Resetear Provincia y Distrito
        selectProvincia.innerHTML = '<option value="">Seleccione Provincia</option>';
        selectDistrito.innerHTML = '<option value="">Seleccione Distrito</option>';
        selectDistrito.disabled = true;

        const departamentoSeleccionado = this.value;

        if (departamentoSeleccionado !== "") {
            selectProvincia.disabled = false;
            const provincias = datosUbicacion[departamentoSeleccionado];
            
            for (let provincia in provincias) {
                let opcion = document.createElement('option');
                opcion.value = provincia;
                opcion.textContent = provincia;
                selectProvincia.appendChild(opcion);
            }
        } else {
            selectProvincia.disabled = true;
        }
    });

    // Al cambiar Provincia
    selectProvincia.addEventListener('change', function() {
        // Resetear Distrito
        selectDistrito.innerHTML = '<option value="">Seleccione Distrito</option>';
        
        const departamentoSeleccionado = selectDepartamento.value;
        const provinciaSeleccionada = this.value;

        if (provinciaSeleccionada !== "") {
            selectDistrito.disabled = false;
            const distritos = datosUbicacion[departamentoSeleccionado][provinciaSeleccionada];
            
            distritos.forEach(distrito => {
                let opcion = document.createElement('option');
                opcion.value = distrito;
                opcion.textContent = distrito;
                selectDistrito.appendChild(opcion);
            });
        } else {
            selectDistrito.disabled = true;
        }
    });
};

/* 4. VALIDACIÓN FINAL DEL FORMULARIO */
const initValidacionFormulario = () => {
    const formReclamo = document.getElementById('formReclamo');
    
    if (!formReclamo) return;

    formReclamo.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que se recargue la página automáticamente
        
        
        const numeroReclamo = Math.floor(Math.random() * 90000) + 10000; // Número aleatorio de 5 dígitos
        
        alert(` Reclamo procesado exitosamente.\n\nSu código de seguimiento es: VDS-${numeroReclamo}\n\nNuestro equipo se pondrá en contacto con usted en la brevedad posible.`);
        
        // Limpiamos el formulario después de enviar
        formReclamo.reset();
        
        // Volvemos a bloquear los dropdowns
        document.getElementById('provincia').disabled = true;
        document.getElementById('distrito').disabled = true;
    });
};