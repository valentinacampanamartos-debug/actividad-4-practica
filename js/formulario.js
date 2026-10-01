// document.addEventListener('DOMContentLoaded', () => {
//     // Capturamos el formulario usando el ID definido en tu HTML
//     const form = document.getElementById('formInscripcion');

//     form.addEventListener('submit', async (event) => {
//         // Frenamos la recarga automática de la página
//         event.preventDefault(); 

//         const documento = document.getElementById('documento').value;
//         const email = document.getElementById('email').value;

//         // Validación 1: Exactamente 8 dígitos numéricos
//         const regexDocumento = /^\d{8}$/;
//         if (!regexDocumento.test(documento)) {
//             alert('Error: El documento debe tener exactamente 8 números.');
//             return; 
//         }

//         // Validación 2: Formato de email válido
//         const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!regexEmail.test(email)) {
//             alert('Error: Por favor, ingresa un correo electrónico válido.');
//             return;
//         }

//         // Empaquetamos todos los inputs, incluyendo el archivo adjunto
//         const formData = new FormData(form);

//         try {
//             // Disparamos el POST a la ruta del backend
//             const response = await fetch('/inscribir', {
//                 method: 'POST',
//                 body: formData // fetch pone automáticamente los headers correctos para archivos
//             });

//             if (response.ok) {
//                 alert('¡Inscripción enviada con éxito!');
//                 form.reset(); // Limpia los campos
//             } else {
//                 alert('Hubo un error en el servidor al procesar la inscripción.');
//             }
//         } catch (error) {
//             console.error('Error al enviar:', error);
//             // Esta alerta saltará mientras pruebes localmente sin el servidor encendido
//             alert('Error de conexión. Verifica que el servidor backend esté corriendo.');
//         }
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formInscripcion');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        // 1. Limpiamos cualquier borde rojo de un intento anterior
        const todosLosInputs = form.querySelectorAll('input');
        todosLosInputs.forEach(input => input.classList.remove('input-error'));

        let hayErroresVacios = false;

        // 2. Validamos que ningún campo obligatorio esté vacío
        todosLosInputs.forEach(input => {
            if (!input.value) {
                input.classList.add('input-error'); // Pinta de rojo
                hayErroresVacios = true;
            }
        });

        if (hayErroresVacios) {
            alert('Por favor, completa todos los campos obligatorios marcados en rojo.');
            return; // Frena el envío
        }

        // 3. Validación específica del Documento (8 dígitos)
        const inputDocumento = document.getElementById('documento');
        const regexDocumento = /^\d{8}$/;
        if (!regexDocumento.test(inputDocumento.value)) {
            inputDocumento.classList.add('input-error'); // Pinta de rojo solo este
            alert('Error: El documento debe tener exactamente 8 números.');
            return; 
        }

        // 4. Validación específica del Email
        const inputEmail = document.getElementById('email');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(inputEmail.value)) {
            inputEmail.classList.add('input-error'); // Pinta de rojo solo este
            alert('Error: Por favor, ingresa un correo electrónico válido.');
            return;
        }

        // Si pasa todas las pruebas, empaquetamos y enviamos
        const formData = new FormData(form);

        try {
            const response = await fetch('/inscribir', {
                method: 'POST',
                body: formData 
            });

            if (response.ok) {
                alert('¡Inscripción enviada con éxito!');
                form.reset(); 
            } else {
                alert('Hubo un error en el servidor al procesar la inscripción.');
            }
        } catch (error) {
            console.error('Error al enviar:', error);
            alert('Error de conexión. Verifica que el servidor backend esté corriendo.');
        }
    });

    // 5. Extra (Opcional pero recomendado): Quitar el rojo apenas el usuario empiece a escribir
    todosLosInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
        });
    });
});