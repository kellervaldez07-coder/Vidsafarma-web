document.addEventListener("DOMContentLoaded", function() {
    const fechaElemento = document.getElementById('fecha-actual');
    
    if (fechaElemento) {
        const ahora = new Date();
        
        // Formateamos manualmente para asegurar que fecha y hora se vean siempre
        const fecha = ahora.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const hora = ahora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false });
        
        fechaElemento.innerHTML = `<strong>Fecha: ${fecha} ${hora}</strong>`;
    }
});