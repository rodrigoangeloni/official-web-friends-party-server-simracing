// DuraciÃ³n de los compuestos de neumÃ¡ticos (en vueltas)
let duracionNeumaticos = {};

// Mostrar mensaje temporal con estilos personalizados
function mostrarMensajeTemporal(mensaje, tipo = 'info') {
    const colores = {
        info: { background: '#d4edda', color: '#155724' }, // Ã‰xito/InformaciÃ³n
        warning: { background: '#fff3cd', color: '#856404' }, // Advertencia
        tip: { background: '#f8f9fa', color: '#000000' } // Consejo
    };

    const mensajeTemporal = document.createElement('div');
    mensajeTemporal.textContent = mensaje;
    mensajeTemporal.style.backgroundColor = colores[tipo].background;
    mensajeTemporal.style.color = colores[tipo].color;
    mensajeTemporal.style.padding = '10px';
    mensajeTemporal.style.borderRadius = '4px';
    mensajeTemporal.style.position = 'fixed';
    mensajeTemporal.style.top = '50%';
    mensajeTemporal.style.left = '50%';
    mensajeTemporal.style.transform = 'translate(-50%, -50%)';
    mensajeTemporal.style.zIndex = '1000';

    document.body.appendChild(mensajeTemporal);

    setTimeout(() => {
        mensajeTemporal.remove();
    }, 3000); // Tiempo de visualizaciÃ³n en milisegundos
}

//Mensaje de bienvenida al cargar la pÃ¡gina
window.onload = function() {
    mostrarMensajeTemporal("Â¡Bienvenido a la calculadora de estrategias! Ingresa tus datos de carrera para empezar.", 'info');
};

// Limpiar el formulario con un mensaje adicional
function limpiarFormulario() {
    document.getElementById('calculadoraForm').reset();
    document.getElementById('compuestosContainer').innerHTML = '';
    document.getElementById('resultados').style.display = 'none';
    document.getElementById('detallesParadas').innerHTML = '';
    document.getElementById('paradasContainer').style.display = 'none';
    
    //Mensaje de limpieza
    mostrarMensajeTemporal("Formulario limpiado correctamente. Ingresa nuevos datos para comenzar.", 'tip');
}

// Guardar compuestos y actualizar opciones de compuesto inicial
function guardarCompuestos() {
    const numCompuestos = parseInt(document.getElementById('numCompuestos').value);
    duracionNeumaticos = {};
    const compuestoInicialSelect = document.getElementById('compuestoInicial');
    compuestoInicialSelect.innerHTML = ''; // Limpiar opciones existentes

    let compuestosGuardados = []; // Array para guardar los compuestos

    for (let i = 1; i <= numCompuestos; i++) {
        const tipo = document.getElementById(`tipoCompuesto${i}`).value;
        const duracion = parseInt(document.getElementById(`duracionCompuesto${i}`).value);
        duracionNeumaticos[tipo] = duracion;

        compuestosGuardados.push(tipo); // Agregar el tipo al array de compuestos guardados

        // Agregar opciÃ³n al select de compuesto inicial
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = tipo;
        compuestoInicialSelect.appendChild(option);
    }

    mostrarMensajeTemporal("Compuestos guardados. Ahora puedes calcular la estrategia.");
}

// Calcular estrategia
function calcular() {
    // ValidaciÃ³n de campos
    const duracionCarrera = parseFloat(document.getElementById('duracionCarrera').value);
    const tiempoVuelta = parseFloat(document.getElementById('tiempoVuelta').value);
    const consumoVuelta = parseFloat(document.getElementById('consumoVuelta').value);
    const vueltaExtra = parseInt(document.getElementById('vueltaExtra').value);
    const compuestoInicial = document.getElementById('compuestoInicial').value;
    const paradasBoxes = parseInt(document.getElementById('paradasBoxes').value);

    // Verificar campos obligatorios
    if (isNaN(duracionCarrera) || duracionCarrera <= 0) {
        mostrarMensajeTemporal("Por favor, ingrese una duraciÃ³n de carrera vÃ¡lida", 'warning');
        return;
    }
    if (isNaN(tiempoVuelta) || tiempoVuelta <= 0) {
        mostrarMensajeTemporal("Por favor, ingrese un tiempo por vuelta vÃ¡lido", 'warning');
        return;
    }
    if (isNaN(consumoVuelta) || consumoVuelta <= 0) {
        mostrarMensajeTemporal("Por favor, ingrese un consumo por vuelta vÃ¡lido", 'warning');
        return;
    }
    if (isNaN(vueltaExtra)) {
        mostrarMensajeTemporal("Por favor, seleccione si hay vuelta extra", 'warning');
        return;
    }
    if (!compuestoInicial) {
        mostrarMensajeTemporal("Por favor, seleccione un compuesto inicial", 'warning');
        return;
    }
    if (Object.keys(duracionNeumaticos).length === 0) {
        mostrarMensajeTemporal("Por favor, guarde los compuestos antes de calcular", 'warning');
        return;
    }

    // Si todas las validaciones pasan, continuar con los cÃ¡lculos
    const totalVueltas = Math.floor(duracionCarrera / tiempoVuelta) + vueltaExtra;
    const combustibleTotal = totalVueltas * consumoVuelta;
    const duracionInicial = duracionNeumaticos[compuestoInicial];

    let estrategiaSugerida = "";
    let detallesParadas = "";

    // LÃ³gica para calcular la estrategia de paradas en boxes
    if (paradasBoxes === 1) {
        const compuestosDisponibles = Object.entries(duracionNeumaticos)
            .sort((a, b) => a[1] - b[1]); // Ordenar por duraciÃ³n ascendente (mÃ¡s rÃ¡pidos primero)
        let vueltasRestantes = totalVueltas;
        let estrategia = [];
        let detalles = [];
        let vueltaActual = 0;

        // Calcular estrategia inicial con combustible Ã³ptimo
        const vueltasInicial = Math.min(duracionInicial, vueltasRestantes);
        const combustibleInicial = vueltasInicial * consumoVuelta;
        estrategia.push(`Inicio: ${compuestoInicial} (${vueltasInicial} vueltas)`);
        detalles.push(`Inicio:
            Combustible inicial: ${combustibleInicial.toFixed(1)}L para ${vueltasInicial} vueltas`);
        vueltasRestantes -= vueltasInicial;
        vueltaActual += vueltasInicial;

        let paradaNum = 1;
        while (vueltasRestantes > 0) {
            // Encontrar el mejor compuesto que se ajuste mejor a las vueltas restantes
            let mejorCompuesto = null;
            let mejorDuracion = 0;
            let vueltasOptimas = 0;
            let menorDiferencia = Infinity;

            // Evaluar cada compuesto para encontrar el que mejor se ajuste a las vueltas restantes
            for (const [compuesto, duracion] of compuestosDisponibles) {
                const diferencia = Math.abs(duracion - vueltasRestantes);
                
                // Si encontramos un compuesto que se ajusta mejor a las vueltas restantes
                if (diferencia < menorDiferencia) {
                    mejorCompuesto = compuesto;
                    mejorDuracion = duracion;
                    vueltasOptimas = Math.min(duracion, vueltasRestantes);
                    menorDiferencia = diferencia;
                }
            }

            if (mejorCompuesto) {
                // Calcular combustible exacto necesario para este stint
                const combustibleNecesario = vueltasOptimas * consumoVuelta;

                estrategia.push(`Parada ${paradaNum}: ${mejorCompuesto} (${vueltasOptimas} vueltas)`);
                detalles.push(`Parada ${paradaNum}:
                    Vuelta ${vueltaActual}
                    Cambio a ${mejorCompuesto}
                    Combustible: ${combustibleNecesario.toFixed(1)}L para ${vueltasOptimas} vueltas`);

                vueltasRestantes -= vueltasOptimas;
                vueltaActual += vueltasOptimas;
                paradaNum++;
            } else {
                estrategiaSugerida = "Error: No se puede completar la carrera con los compuestos disponibles.";
                break;
            }
        }

        if (vueltasRestantes === 0) {
            estrategiaSugerida = `Estrategia Ã³ptima (${paradaNum-1} paradas):\n${estrategia.join(" â†’ ")}`;
            detallesParadas = detalles.join("\n");
            mostrarMensajeTemporal(`Estrategia calculada con ${paradaNum-1} paradas optimizando combustible`, 'info');
        }
    } else {
        // Si no se permiten paradas, verificar si es posible completar la carrera
        if (duracionInicial < totalVueltas) {
            estrategiaSugerida = `Advertencia: Se necesitan ${Math.ceil(totalVueltas/duracionInicial)} paradas mÃ­nimas para completar la carrera con el compuesto.`;
            mostrarMensajeTemporal("Se requieren paradas adicionales", 'warning');
        } else {
            estrategiaSugerida = `Estrategia sin paradas: ${compuestoInicial} para ${totalVueltas} vueltas`;
        }
    }

    // Mostrar resultados
    document.getElementById('totalVueltas').textContent = totalVueltas;
    document.getElementById('combustibleTotal').textContent = combustibleTotal.toFixed(2);
    document.getElementById('neumaticosIniciales').textContent = `Compuesto: ${compuestoInicial}, DuraciÃ³n: ${duracionInicial} vueltas`;
    document.getElementById('detallesParadasResultado').textContent = detallesParadas;
    document.getElementById('estrategiaSugerida').textContent = estrategiaSugerida;
    document.getElementById('resultados').style.display = 'block';
}

//Mensaje adicional en la secciÃ³n de resultados
function mostrarResultados() {
    const contenedorResultados = document.getElementById('resultados');
    
    //Mensaje educativo antes de los resultados
    const mensajeEducacion = document.createElement('div');
    mensajeEducacion.className = 'bg-gray-900 p-4 rounded-lg mb-6';
    mensajeEducacion.textContent = "Recuerda: Cuanto mÃ¡s datos reales ingreses (vueltas con diferentes neumÃ¡ticos y combustible), mejor serÃ¡ la precisiÃ³n de la estrategia.";
    
    contenedorResultados.appendChild(mensajeEducacion);
}


// Event Listeners
document.getElementById('paradasBoxes').addEventListener('change', function() {
    const paradasContainer = document.getElementById('paradasContainer');
    paradasContainer.style.display = this.value === "1" ? 'block' : 'none';

    // Si se habilitan las paradas, ocultar el campo de nÃºmero de paradas
    if (this.value === "1") {
        document.getElementById('numParadas').style.display = 'none';
    } else {
        document.getElementById('numParadas').style.display = 'block';
    }
});

document.getElementById('numCompuestos').addEventListener('input', function() {
    const numCompuestos = parseInt(this.value);
    const container = document.getElementById('compuestosContainer');
    container.innerHTML = '';

    // Limpiar el select de compuesto inicial
    const compuestoInicialSelect = document.getElementById('compuestoInicial');
    compuestoInicialSelect.innerHTML = '';

    for (let i = 1; i <= numCompuestos; i++) {
        container.innerHTML += `
            <div class="mb-4">
                <h3 class="text-xl mb-2">Compuesto ${i}</h3>
                <label for="tipoCompuesto${i}">Tipo:</label>
                <select id="tipoCompuesto${i}" class="w-full p-2 border rounded-md bg-gray-900" required>
                    <option value="SS">Super Soft</option>
                    <option value="S">Soft</option>
                    <option value="M">Medium</option>
                    <option value="H">Hard</option>
                </select>
                <label for="duracionCompuesto${i}">DuraciÃ³n (vueltas):</label>
                <input type="number" id="duracionCompuesto${i}" class="w-full p-2 border rounded-md bg-gray-900" required>
            </div>
        `;
    }

 // Agregar botÃ³n para guardar compuestos
    const guardarButton = document.createElement('button');
    guardarButton.textContent = 'Guardar Compuestos';
    guardarButton.type = 'button';
    guardarButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4';
    guardarButton.addEventListener('click', guardarCompuestos);
    container.appendChild(guardarButton);
});
