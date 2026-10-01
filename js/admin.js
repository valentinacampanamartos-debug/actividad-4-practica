document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MODO OSCURO ---
    const btnModoOscuro = document.getElementById('btnModoOscuro');
    btnModoOscuro.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            btnModoOscuro.textContent = '☀️️ Modo Claro';
        } else {
            btnModoOscuro.textContent = '🌙 Modo Oscuro';
        }
    });

    // --- 2. LOGIN Y AUTENTICACIÓN ---
    const formLogin = document.getElementById('formLogin');
    const loginSection = document.getElementById('loginSection');
    const adminSection = document.getElementById('adminSection');
    const errorLogin = document.getElementById('errorLogin');

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        // Aquí definimos el usuario y contraseña del grupo
        if (usuario === 'veinticinco' && password === 'cinco_555') { 
            loginSection.style.display = 'none';   // Oculta el login
            adminSection.style.display = 'block';  // Muestra el panel
            cargarInscriptos();                    // Trae los datos para la tabla
        } else {
            errorLogin.textContent = 'Usuario o contraseña incorrectos.';
        }
    });

    // --- 3. GESTIÓN DE LA TABLA Y FILTROS ---
    const btnActualizar = document.getElementById('btnActualizarLista');
    const filtroTexto = document.getElementById('filtroTexto');
    
    btnActualizar.addEventListener('click', cargarInscriptos);
    filtroTexto.addEventListener('input', filtrarTabla);

    let inscriptosData = []; // Variable global para guardar los datos temporalmente y poder filtrarlos

    async function cargarInscriptos() {
        try {
            // Intenta hacer la petición GET al servidor real
            const response = await fetch('/'); 
            if (response.ok) {
                inscriptosData = await response.json();
                renderizarTabla(inscriptosData);
            } else {
                throw new Error('Servidor no disponible');
            }
        } catch (error) {
            console.log('Mostrando datos de prueba porque el servidor local no está encendido.');
            // DATOS DE PRUEBA (Para que puedas ver el diseño funcionando)
            inscriptosData = [
                { id: 1, apellido: 'Pérez', nombre: 'Juan', documento: '12345678', email: 'juan@test.com', celular: '11223344', empresa: 'Tech S.A.', cargo: 'Desarrollador' },
                { id: 2, apellido: 'Gómez', nombre: 'Ana', documento: '87654321', email: 'ana@test.com', celular: '55667788', empresa: 'Diseño Web', cargo: 'UX/UI' }
            ];
            renderizarTabla(inscriptosData);
        }
    }

    function renderizarTabla(datos) {
        const cuerpoTabla = document.getElementById('cuerpoTabla');
        const totalInscriptos = document.getElementById('totalInscriptos');
        cuerpoTabla.innerHTML = ''; // Limpia la tabla antes de volver a dibujar
        
        // Actualiza el contador
        totalInscriptos.textContent = datos.length;

        // Dibuja cada fila
        datos.forEach(persona => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${persona.apellido}, ${persona.nombre}</td>
                <td>${persona.documento}</td>
                <td>${persona.email}</td>
                <td>${persona.celular}</td>
                <td>${persona.empresa} / ${persona.cargo}</td>
                <td>
                    <button class="acciones-btn" onclick="editarPersona(${persona.id})">✏️ Editar</button>
                    <button class="acciones-btn btn-eliminar" onclick="eliminarPersona(${persona.id})">🗑️ Borrar</button>
                </td>
            `;
            cuerpoTabla.appendChild(fila);
        });
    }

    function filtrarTabla() {
        const textoBusqueda = filtroTexto.value.toLowerCase();
        // Filtra buscando coincidencias en apellido, nombre, documento o email
        const filtrados = inscriptosData.filter(p => 
            p.apellido.toLowerCase().includes(textoBusqueda) ||
            p.nombre.toLowerCase().includes(textoBusqueda) ||
            p.documento.includes(textoBusqueda) ||
            p.email.toLowerCase().includes(textoBusqueda)
        );
        renderizarTabla(filtrados);
    }

    // --- 4. ACCIONES DE LOS BOTONES ---
    window.editarPersona = async (id) => {
        alert('Preparando petición PUT a /actualizar/' + id);
        // Aquí tu compañero armará el fetch PUT
    };

    window.eliminarPersona = async (id) => {
        if (confirm('¿Estás seguro de eliminar este inscripto?')) {
            alert('Preparando petición DELETE a /eliminar/' + id);
            // Aquí tu compañero armará el fetch DELETE
        }
    };
});