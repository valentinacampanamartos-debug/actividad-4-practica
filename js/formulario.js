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

        const todosLosInputs = form.querySelectorAll('input');
        
        // 1. Limpiamos marcas de error anteriores
        todosLosInputs.forEach(input => input.classList.remove('input-error'));

        let hayError = false;

        // 2. Validar que no haya campos vacíos (incluyendo el archivo)
        todosLosInputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('input-error');
                hayError = true;
            }
        });

        // 3. Validar Documento (exactamente 8 dígitos)
        const inputDocumento = document.getElementById('documento');
        const regexDocumento = /^\d{8}$/;
        if (inputDocumento.value && !regexDocumento.test(inputDocumento.value)) {
            inputDocumento.classList.add('input-error');
            hayError = true;
        }

        // 4. Validar Email
        const inputEmail = document.getElementById('email');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (inputEmail.value && !regexEmail.test(inputEmail.value)) {
            inputEmail.classList.add('input-error');
            hayError = true;
        }

        // 5. Validar Celular (entre 9 y 10 dígitos)
        const inputCelular = document.getElementById('celular');
        const regexCelular = /^\d{9,10}$/;
        if (inputCelular.value && !regexCelular.test(inputCelular.value)) {
            inputCelular.classList.add('input-error');
            hayError = true;
        }

        // Si se detectó CUALQUIER error, mostramos la alerta y frenamos
        if (hayError) {
            alert('Por favor, revisa los campos marcados en rojo.');
            return;
        }

        // --- SI TODO ESTÁ CORRECTO, GUARDA EN LOCALSTORAGE PARA EL ADMIN ---
        const nuevoInscripto = {
            id: Date.now(),
            apellido: document.getElementById('apellido').value,
            nombre: document.getElementById('nombre').value,
            documento: inputDocumento.value,
            email: inputEmail.value,
            celular: inputCelular.value,
            empresa: document.getElementById('empresa').value,
            cargo: document.getElementById('cargo').value
        };

        let listaInscriptos = JSON.parse(localStorage.getItem('inscriptosLocales')) || [];
        listaInscriptos.push(nuevoInscripto);
        localStorage.setItem('inscriptosLocales', JSON.stringify(listaInscriptos));

        alert('¡Inscripción realizada con éxito!');
        form.reset();
    });

    // Quita el borde rojo en tiempo real cuando el usuario empieza a corregir
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
        });
        input.addEventListener('change', () => { // Para el input de tipo file
            input.classList.remove('input-error');
        });
    });
});