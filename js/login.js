function validarLogin() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let errorDiv = document.getElementById('errorMsg');

    // Credenciales válidas
    if (email === "admin@correo.com" && password === "1234") {
        // Redirigir a la página principal
        window.location.href = "Index.html";
    } else {
        errorDiv.style.display = "block";
        // Dentro de tu función validarLogin(), reemplaza la línea del errorDiv.textContent por esta:
        errorDiv.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Correo o contraseña incorrectos. Intenta de nuevo.';
        
        // Limpiar campo contraseña
        document.getElementById('password').value = "";
        
        // Ocultar error después de 3 segundos
        setTimeout(function() {
            errorDiv.style.display = "none";
        }, 3000);
    }
}

// Permitir presionar Enter para enviar
document.getElementById('email').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') validarLogin();
});

document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') validarLogin();
});