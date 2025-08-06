// ========================================
// CALCULADORA DE ESTRATEGIA DE CARRERA
// Friends Party Server SimRacing
// ========================================


// Variables globales
let datosCompuestos = [];
let estrategiaCalculada = null;

// Mostrar notificaciones al usuario
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-md`;
    
    const colores = {
        'success': 'bg-green-600 text-white border-green-500',
        'warning': 'bg-yellow-600 text-white border-yellow-500',
        'error': 'bg-red-600 text-white border-red-500',
        'info': 'bg-blue-600 text-white border-blue-500'
    };
    
    notificacion.className += ` ${colores[tipo]}`;
    notificacion.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">${tipo === 'success' ? '✅' : tipo === 'warning' ? '⚠️' : tipo === 'error' ? '❌' : 'ℹ️'}</span>
            <span>${mensaje}</span>
        </div>
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.remove();
    }, 4000);
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    mostrarNotificacion('¡Bienvenido a la calculadora de estrategia de carrera! Ingresa tus datos reales para obtener la mejor estrategia.', 'info');
    inicializarCalculadora();
});

// Inicializar la calculadora
function inicializarCalculadora() {
    // Agregar event listeners para los campos del formulario
    document.getElementById('duracionCarrera')?.addEventListener('input', validarCampos);
    document.getElementById('tiempoVuelta')?.addEventListener('input', validarCampos);
    document.getElementById('consumoVuelta')?.addEventListener('input', validarCampos);
    document.getElementById('numCompuestos')?.addEventListener('change', generarCamposCompuestos);
    
    // Precargar valores típicos para ayudar al usuario
    precargarValoresDefault();
    
    // Generar campos iniciales con 2 compuestos por defecto
    generarCamposCompuestos();
}

// Mostrar nota importante para el usuario
function precargarValoresDefault() {
    const nota = document.createElement('div');
    nota.className = 'neon-card neon-border-blue mb-6';
    nota.innerHTML = `
        <h3 class="neon-text-blue text-xl font-bold mb-4">� NOTA IMPORTANTE</h3>
        <p class="text-gray-300 text-sm leading-relaxed">
            <strong class="text-yellow-400">Para obtener los mejores resultados, ingresa datos reales de tu simulador.</strong> 
            Cuanto más vueltas realices con diferentes condiciones (combustible y neumáticos), mejor será la precisión de la estrategia.
        </p>
    `;
    
    const formulario = document.querySelector('.neon-card');
    if (formulario) {
        formulario.parentNode.insertBefore(nota, formulario);
    }
}

// Generar campos para configurar compuestos de neumáticos
function generarCamposCompuestos() {
    const numCompuestos = parseInt(document.getElementById('numCompuestos')?.value) || 0;
    const container = document.getElementById('compuestosContainer');
    
    if (!container) return;
    
    container.innerHTML = '';
    datosCompuestos = [];
    
    // Configuración de iconos de neumáticos
    const iconosNeumaticos = {
        'SS': '/assets/images/img-neumaticos/SS.png',
        'S': '/assets/images/img-neumaticos/S.png',
        'M': '/assets/images/img-neumaticos/M.png',
        'H': '/assets/images/img-neumaticos/H.png',
        'I': '/assets/images/img-neumaticos/I.png',
        'W': '/assets/images/img-neumaticos/W.png'
    };
    
    for (let i = 1; i <= numCompuestos; i++) {
        const compuestoDiv = document.createElement('div');
        compuestoDiv.className = 'neon-card neon-border-racing mb-4';
        compuestoDiv.innerHTML = `
            <h4 class="neon-text-racing text-lg font-bold mb-3">🏎️ COMPUESTO ${i}</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-bold mb-2">Tipo de Compuesto:</label>
                    <select id="tipoCompuesto${i}" class="w-full p-2 bg-gray-800 border border-gray-600 rounded" onchange="actualizarIconoNeumatico(${i})">
                        <option value="SS">🔴 Super Soft (SS)</option>
                        <option value="S">🔴 Soft (S)</option>
                        <option value="M" selected>🟡 Medium (M)</option>
                        <option value="H">⚪ Hard (H)</option>
                        <option value="I">🔵 Intermediate (I)</option>
                        <option value="W">🟢 Wet (W)</option>
                    </select>
                    <div class="mt-2 flex items-center">
                        <img id="iconoNeumatico${i}" src="${iconosNeumaticos['M']}" alt="Neumático" class="w-8 h-8 mr-2">
                        <span id="descripcionNeumatico${i}" class="text-xs text-gray-400">Balanceado - uso general</span>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-bold mb-2">Duración Real (vueltas):</label>
                    <input type="number" id="duracionCompuesto${i}" min="1" max="50" 
                           placeholder="Ej: 15" class="w-full p-2 bg-gray-800 border border-gray-600 rounded">
                    <span class="text-xs text-gray-400">Basado en tus pruebas</span>
                </div>
                <div>
                    <label class="block text-sm font-bold mb-2">Velocidad Relativa (%):</label>
                    <input type="number" id="velocidadCompuesto${i}" min="90" max="105" value="100"
                           placeholder="Ej: 98" class="w-full p-2 bg-gray-800 border border-gray-600 rounded">
                    <span class="text-xs text-gray-400">100% = más rápido</span>
                </div>
            </div>
        `;
        container.appendChild(compuestoDiv);
    }
    
    // Agregar botón para guardar compuestos
    if (numCompuestos > 0) {
        const botonGuardar = document.createElement('button');
        botonGuardar.type = 'button';
        botonGuardar.className = 'racing-button w-full mt-4';
        botonGuardar.textContent = 'GUARDAR COMPUESTOS Y CONTINUAR';
        botonGuardar.onclick = guardarCompuestos;
        container.appendChild(botonGuardar);
        
        mostrarNotificacion(`Se generaron ${numCompuestos} campos de compuestos. Completa los datos y guarda.`, 'info');
    }
}

// Actualizar icono de neumático cuando cambia el tipo
function actualizarIconoNeumatico(numeroCompuesto) {
    const selectTipo = document.getElementById(`tipoCompuesto${numeroCompuesto}`);
    const iconoImg = document.getElementById(`iconoNeumatico${numeroCompuesto}`);
    const descripcionSpan = document.getElementById(`descripcionNeumatico${numeroCompuesto}`);
    
    const iconosNeumaticos = {
        'SS': '/assets/images/img-neumaticos/SS.png',
        'S': '/assets/images/img-neumaticos/S.png',
        'M': '/assets/images/img-neumaticos/M.png',
        'H': '/assets/images/img-neumaticos/H.png',
        'I': '/assets/images/img-neumaticos/I.png',
        'W': '/assets/images/img-neumaticos/W.png'
    };
    
    const descripcionesNeumaticos = {
        'SS': 'Muy rápido - baja duración',
        'S': 'Rápido - duración media',
        'M': 'Balanceado - uso general',
        'H': 'Durable - menor velocidad',
        'I': 'Pista húmeda - adherencia media',
        'W': 'Lluvia intensa - máxima adherencia'
    };
    
    const tipoSeleccionado = selectTipo.value;
    
    if (iconoImg) {
        iconoImg.src = iconosNeumaticos[tipoSeleccionado];
        iconoImg.alt = `Neumático ${tipoSeleccionado}`;
    }
    
    if (descripcionSpan) {
        descripcionSpan.textContent = descripcionesNeumaticos[tipoSeleccionado];
    }
}

// Validar que todos los campos necesarios estén completados
function validarCampos() {
    const duracion = parseFloat(document.getElementById('duracionCarrera')?.value);
    const tiempoVuelta = parseFloat(document.getElementById('tiempoVuelta')?.value);
    const consumo = parseFloat(document.getElementById('consumoVuelta')?.value);
    
    const botonCalcular = document.getElementById('calcularEstrategia');
    if (botonCalcular) {
        if (duracion > 0 && tiempoVuelta > 0 && consumo > 0 && datosCompuestos.length > 0) {
            botonCalcular.disabled = false;
            botonCalcular.className = botonCalcular.className.replace(' opacity-50', '');
        } else {
            botonCalcular.disabled = true;
            if (!botonCalcular.className.includes('opacity-50')) {
                botonCalcular.className += ' opacity-50';
            }
        }
    }
}

// Guardar los datos de compuestos ingresados por el usuario
function guardarCompuestos() {
    const numCompuestos = parseInt(document.getElementById('numCompuestos')?.value) || 0;
    datosCompuestos = [];
    
    for (let i = 1; i <= numCompuestos; i++) {
        const tipo = document.getElementById(`tipoCompuesto${i}`)?.value;
        const duracion = parseInt(document.getElementById(`duracionCompuesto${i}`)?.value);
        const velocidad = parseInt(document.getElementById(`velocidadCompuesto${i}`)?.value);
        
        if (!tipo || !duracion || !velocidad) {
            mostrarNotificacion(`Por favor completa todos los datos del compuesto ${i}`, 'warning');
            return;
        }
        
        datosCompuestos.push({
            tipo: tipo,
            duracion: duracion,
            velocidadRelativa: velocidad
        });
    }
    
    // Actualizar selector de compuesto inicial
    actualizarSelectorCompuestoInicial();
    mostrarNotificacion('✅ Compuestos guardados correctamente. Ya puedes calcular tu estrategia.', 'success');
    
    // Validar campos después de guardar compuestos
    validarCampos();
}

// Actualizar el selector de compuesto inicial
function actualizarSelectorCompuestoInicial() {
    const selector = document.getElementById('compuestoInicial');
    if (!selector) return;
    
    selector.innerHTML = '<option value="">Selecciona compuesto inicial</option>';
    
    datosCompuestos.forEach((compuesto, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${compuesto.tipo} (${compuesto.duracion} vueltas, ${compuesto.velocidadRelativa}% velocidad)`;
        selector.appendChild(option);
    });
}

// Calcular la estrategia óptima de carrera
function calcularEstrategia() {
    // Validar campos obligatorios
    const duracionCarrera = parseFloat(document.getElementById('duracionCarrera')?.value);
    const tiempoVuelta = parseFloat(document.getElementById('tiempoVuelta')?.value);
    const consumoVuelta = parseFloat(document.getElementById('consumoVuelta')?.value);
    const vueltaExtra = document.getElementById('vueltaExtra')?.value === 'si';
    const compuestoInicialIndex = parseInt(document.getElementById('compuestoInicial')?.value);
    const permitePaadas = document.getElementById('paradasBoxes')?.value === 'si';
    
    if (!validarDatosEntrada(duracionCarrera, tiempoVuelta, consumoVuelta, compuestoInicialIndex)) {
        return;
    }
    
    // Calcular datos básicos de la carrera
    const vueltas = Math.floor((duracionCarrera * 60) / (tiempoVuelta * 60)) + (vueltaExtra ? 1 : 0);
    const combustibleTotal = vueltas * consumoVuelta;
    const compuestoInicial = datosCompuestos[compuestoInicialIndex];
    
    // Calcular estrategia
    let estrategia;
    if (permitePaadas) {
        estrategia = calcularEstrategiaConParadas(vueltas, combustibleTotal, consumoVuelta, compuestoInicial);
    } else {
        estrategia = calcularEstrategiaSinParadas(vueltas, combustibleTotal, compuestoInicial);
    }
    
    // Mostrar resultados
    mostrarResultados(estrategia, vueltas, combustibleTotal);
}

// Validar que todos los datos de entrada sean correctos
function validarDatosEntrada(duracion, tiempo, consumo, compuestoIndex) {
    if (!duracion || duracion <= 0) {
        mostrarNotificacion('Por favor ingresa una duración de carrera válida', 'error');
        return false;
    }
    
    if (!tiempo || tiempo <= 0) {
        mostrarNotificacion('Por favor ingresa un tiempo por vuelta válido', 'error');
        return false;
    }
    
    if (!consumo || consumo <= 0) {
        mostrarNotificacion('Por favor ingresa un consumo de combustible válido', 'error');
        return false;
    }
    
    if (datosCompuestos.length === 0) {
        mostrarNotificacion('Por favor configura y guarda al menos un compuesto de neumáticos', 'error');
        return false;
    }
    
    if (isNaN(compuestoIndex) || compuestoIndex < 0) {
        mostrarNotificacion('Por favor selecciona un compuesto inicial', 'error');
        return false;
    }
    
    return true;
}

// Calcular estrategia con paradas en boxes
function calcularEstrategiaConParadas(vueltas, combustibleTotal, consumoPorVuelta, compuestoInicial) {
    let mejorEstrategia = null;
    let menorTiempoTotal = Infinity;
    
    // Probar diferentes números de paradas (1 a 3)
    for (let numParadas = 1; numParadas <= Math.min(3, datosCompuestos.length); numParadas++) {
        const estrategia = optimizarParadas(vueltas, consumoPorVuelta, compuestoInicial, numParadas);
        
        if (estrategia && estrategia.tiempoTotal < menorTiempoTotal) {
            menorTiempoTotal = estrategia.tiempoTotal;
            mejorEstrategia = estrategia;
        }
    }
    
    return mejorEstrategia;
}

// Optimizar la estrategia para un número específico de paradas
function optimizarParadas(vueltas, consumoPorVuelta, compuestoInicial, numParadas) {
    const tiempoPorParada = 25; // segundos perdidos por parada en boxes
    const stints = [];
    let vueltasRestantes = vueltas;
    let tiempoTotal = 0;
    let vueltaActual = 1;
    
    // Primer stint con compuesto inicial
    const vueltasStint1 = Math.floor(vueltasRestantes / (numParadas + 1));
    const combustibleStint1 = vueltasStint1 * consumoPorVuelta;
    
    stints.push({
        stint: 1,
        vueltaInicio: vueltaActual,
        vueltaFin: vueltaActual + vueltasStint1 - 1,
        compuesto: compuestoInicial.tipo,
        vueltas: vueltasStint1,
        combustible: combustibleStint1,
        tiempoPromedio: calcularTiempoPromedio(compuestoInicial, vueltasStint1)
    });
    
    tiempoTotal += vueltasStint1 * stints[0].tiempoPromedio;
    vueltasRestantes -= vueltasStint1;
    vueltaActual += vueltasStint1;
    
    // Stints adicionales con paradas
    for (let i = 2; i <= numParadas + 1; i++) {
        const esUltimoStint = i === numParadas + 1;
        const vueltasStint = esUltimoStint ? vueltasRestantes : Math.floor(vueltasRestantes / (numParadas + 2 - i));
        
        // Seleccionar mejor compuesto para este stint
        const mejorCompuesto = seleccionarMejorCompuesto(vueltasStint, esUltimoStint);
        const combustibleStint = vueltasStint * consumoPorVuelta;
        
        stints.push({
            stint: i,
            vueltaInicio: vueltaActual,
            vueltaFin: vueltaActual + vueltasStint - 1,
            compuesto: mejorCompuesto.tipo,
            vueltas: vueltasStint,
            combustible: combustibleStint,
            tiempoPromedio: calcularTiempoPromedio(mejorCompuesto, vueltasStint)
        });
        
        tiempoTotal += vueltasStint * stints[i-1].tiempoPromedio;
        tiempoTotal += tiempoPorParada; // Tiempo perdido en boxes
        
        vueltasRestantes -= vueltasStint;
        vueltaActual += vueltasStint;
    }
    
    return {
        stints: stints,
        tiempoTotal: tiempoTotal,
        numParadas: numParadas,
        combustibleTotal: stints.reduce((total, stint) => total + stint.combustible, 0)
    };
}

// Calcular estrategia sin paradas en boxes
function calcularEstrategiaSinParadas(vueltas, combustibleTotal, compuestoInicial) {
    if (compuestoInicial.duracion < vueltas) {
        return {
            error: true,
            mensaje: `El compuesto ${compuestoInicial.tipo} solo dura ${compuestoInicial.duracion} vueltas, pero la carrera es de ${vueltas} vueltas. Necesitas hacer al menos 1 parada.`
        };
    }
    
    const tiempoPromedio = calcularTiempoPromedio(compuestoInicial, vueltas);
    
    return {
        stints: [{
            stint: 1,
            vueltaInicio: 1,
            vueltaFin: vueltas,
            compuesto: compuestoInicial.tipo,
            vueltas: vueltas,
            combustible: combustibleTotal,
            tiempoPromedio: tiempoPromedio
        }],
        tiempoTotal: vueltas * tiempoPromedio,
        numParadas: 0,
        combustibleTotal: combustibleTotal
    };
}

// Seleccionar el mejor compuesto para un stint específico
function seleccionarMejorCompuesto(vueltasStint, esUltimoStint) {
    // Para el último stint, priorizar velocidad
    if (esUltimoStint) {
        return datosCompuestos.reduce((mejor, actual) => 
            actual.velocidadRelativa > mejor.velocidadRelativa ? actual : mejor
        );
    }
    
    // Para stints intermedios, buscar balance entre durabilidad y velocidad
    return datosCompuestos.reduce((mejor, actual) => {
        const scoreMejor = mejor.duracion * 0.6 + mejor.velocidadRelativa * 0.4;
        const scoreActual = actual.duracion * 0.6 + actual.velocidadRelativa * 0.4;
        return scoreActual > scoreMejor ? actual : mejor;
    });
}

// Calcular tiempo promedio considerando degradación de neumáticos
function calcularTiempoPromedio(compuesto, vueltas) {
    const tiempoBase = parseFloat(document.getElementById('tiempoVuelta')?.value) * 60; // en segundos
    const factorVelocidad = compuesto.velocidadRelativa / 100;
    const factorDegradacion = Math.min(1 + (vueltas / compuesto.duracion) * 0.02, 1.1); // máximo 10% degradación
    
    return (tiempoBase / factorVelocidad) * factorDegradacion;
}

// Mostrar los resultados de la estrategia calculada
function mostrarResultados(estrategia, vueltas, combustibleTotal) {
    const resultadosDiv = document.getElementById('resultados');
    if (!resultadosDiv) return;
    
    if (estrategia.error) {
        resultadosDiv.innerHTML = `
            <div class="neon-card neon-border-red">
                <h3 class="text-red-400 text-xl font-bold mb-4">❌ ERROR EN LA ESTRATEGIA</h3>
                <p class="text-red-300">${estrategia.mensaje}</p>
            </div>
        `;
        resultadosDiv.style.display = 'block';
        mostrarNotificacion(estrategia.mensaje, 'error');
        return;
    }
    
    let html = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="neon-card neon-border-green">
                <h3 class="neon-text-green text-xl font-bold mb-4">📊 DATOS DE LA CARRERA</h3>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span>Total de vueltas:</span>
                        <span class="text-yellow-400 font-bold">${vueltas}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Combustible total:</span>
                        <span class="text-yellow-400 font-bold">${combustibleTotal.toFixed(1)}L</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Número de paradas:</span>
                        <span class="text-yellow-400 font-bold">${estrategia.numParadas}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Tiempo estimado:</span>
                        <span class="text-yellow-400 font-bold">${formatearTiempo(estrategia.tiempoTotal)}</span>
                    </div>
                </div>
            </div>
            
            <div class="neon-card neon-border-blue">
                <h3 class="neon-text-blue text-xl font-bold mb-4">🏁 ESTRATEGIA ÓPTIMA</h3>
                <div class="space-y-3">
    `;
    
    estrategia.stints.forEach((stint, index) => {
        html += `
            <div class="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-yellow-400">
                        ${index === 0 ? '🚦 LARGADA' : `🔧 PARADA ${index}`}
                    </span>
                    <span class="text-sm text-gray-300">
                        Vueltas ${stint.vueltaInicio}-${stint.vueltaFin}
                    </span>
                </div>
                <div class="text-sm space-y-1">
                    <div>Compuesto: <span class="text-green-400">${stint.compuesto}</span></div>
                    <div>Vueltas: <span class="text-blue-400">${stint.vueltas}</span></div>
                    <div>Combustible: <span class="text-purple-400">${stint.combustible.toFixed(1)}L</span></div>
                </div>
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
        </div>
        
        <div class="mt-8">
            <div class="neon-card neon-border-racing">
                <h3 class="neon-text-racing text-xl font-bold mb-4">💡 CONSEJOS PARA LA CARRERA</h3>
                <ul class="text-sm space-y-2 text-gray-300">
                    <li>• Calienta bien los neumáticos en las primeras vueltas</li>
                    <li>• Mantén un ritmo constante para conservar combustible</li>
                    <li>• Planifica las paradas durante zonas de Safety Car si es posible</li>
                    <li>• Ten en cuenta las condiciones climáticas que pueden cambiar la estrategia</li>
                    <li>• Practica los tiempos de entrada y salida de boxes</li>
                </ul>
            </div>
        </div>
    `;
    
    resultadosDiv.innerHTML = html;
    resultadosDiv.style.display = 'block';
    
    // Scroll suave hacia los resultados
    resultadosDiv.scrollIntoView({ behavior: 'smooth' });
    
    mostrarNotificacion('🏁 Estrategia calculada exitosamente', 'success');
}

// Formatear tiempo en formato mm:ss
function formatearTiempo(segundosTotales) {
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = Math.floor(segundosTotales % 60);
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
}

// Limpiar formulario y reiniciar calculadora
function limpiarFormulario() {
    document.getElementById('duracionCarrera').value = '';
    document.getElementById('tiempoVuelta').value = '';
    document.getElementById('consumoVuelta').value = '';
    document.getElementById('vueltaExtra').value = 'no';
    document.getElementById('numCompuestos').value = '2';
    document.getElementById('paradasBoxes').value = 'si';
    
    document.getElementById('compuestosContainer').innerHTML = '';
    document.getElementById('resultados').style.display = 'none';
    
    datosCompuestos = [];
    estrategiaCalculada = null;
    
    // Regenerar los campos de compuestos
    generarCamposCompuestos();
    
    mostrarNotificacion('Formulario limpiado correctamente', 'info');
}
