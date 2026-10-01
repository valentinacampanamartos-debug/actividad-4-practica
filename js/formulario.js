document.addEventListener('DOMContentLoaded', () => {
    // Capturamos el formulario usando el ID definido en tu HTML
    const form = document.getElementById('formInscripcion');

    form.addEventListener('submit', async (event) => {
        // Frenamos la recarga automática de la página
        event.preventDefault(); 

        const documento = document.getElementById('documento').value;
        const email = document.getElementById('email').value;

        // Validación 1: Exactamente 8 dígitos numéricos
        const regexDocumento = /^\d{8}$/;
        if (!regexDocumento.test(documento)) {
            alert('Error: El documento debe tener exactamente 8 números.');
            return; 
        }

        // Validación 2: Formato de email válido
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            alert('Error: Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Empaquetamos todos los inputs, incluyendo el archivo adjunto
        const formData = new FormData(form);

        try {
            // Disparamos el POST a la ruta del backend
            const response = await fetch('/inscribir', {
                method: 'POST',
                body: formData // fetch pone automáticamente los headers correctos para archivos
            });

            if (response.ok) {
                alert('¡Inscripción enviada con éxito!');
                form.reset(); // Limpia los campos
            } else {
                alert('Hubo un error en el servidor al procesar la inscripción.');
            }
        } catch (error) {
            console.error('Error al enviar:', error);
            // Esta alerta saltará mientras pruebes localmente sin el servidor encendido
            alert('Error de conexión. Verifica que el servidor backend esté corriendo.');
        }
    });
});