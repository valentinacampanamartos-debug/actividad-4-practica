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

    // Función auxiliar para mostrar mensaje de error en un campo específico
    function mostrarError(input, mensaje) {
        input.classList.add('input-error');
        
        // Busca el contenedor de error dentro del mismo grupo-input
        const grupo = input.closest('.grupo-input');
        const errorSmall = grupo.querySelector('.error-texto');
        if (errorSmall) {
            errorSmall.textContent = mensaje;
            errorSmall.classList.add('mensaje-error');
        }
    }

    // Función auxiliar para limpiar todos los errores de la pantalla
    function limpiarErrores() {
        form.querySelectorAll('input').forEach(input => {
            input.classList.remove('input-error');
        });
        form.querySelectorAll('.error-texto').forEach(small => {
            small.textContent = '';
            small.classList.remove('mensaje-error');
        });
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        limpiarErrores();

        let hayError = false;

        // 1. Validar campos vacíos
        form.querySelectorAll('input').forEach(input => {
            if (!input.value.trim()) {
                mostrarError(input, 'Este campo es obligatorio.');
                hayError = true;
            }
        });

        // 2. Validaciones de formato específico solo si el campo no está vacío
        const inputDocumento = document.getElementById('documento');
        const regexDocumento = /^\d{8}$/;
        if (inputDocumento.value && !regexDocumento.test(inputDocumento.value)) {
            mostrarError(inputDocumento, 'El documento debe tener exactamente 8 números.');
            hayError = true;
        }

        const inputEmail = document.getElementById('email');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (inputEmail.value && !regexEmail.test(inputEmail.value)) {
            mostrarError(inputEmail, 'Ingresa un correo electrónico válido (ej: nombre@dominio.com).');
            hayError = true;
        }

        const inputCelular = document.getElementById('celular');
        const regexCelular = /^\d{9,10}$/;
        if (inputCelular.value && !regexCelular.test(inputCelular.value)) {
            mostrarError(inputCelular, 'El celular debe tener entre 9 y 10 dígitos.');
            hayError = true;
        }

        // Si se detectó algún error, se detiene el proceso de envío
        if (hayError) {
            return;
        }

        // Guardado local si todo es correcto
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

    // Limpia el mensaje y el borde rojo dinámicamente apenas el usuario empieza a corregir
    form.querySelectorAll('input').forEach(input => {
        const limpiarCampo = () => {
            input.classList.remove('input-error');
            const grupo = input.closest('.grupo-input');
            const errorSmall = grupo.querySelector('.error-texto');
            if (errorSmall) {
                errorSmall.textContent = '';
                errorSmall.classList.remove('mensaje-error');
            }
        };

        input.addEventListener('input', limpiarCampo);
        input.addEventListener('change', limpiarCampo);
    });
});