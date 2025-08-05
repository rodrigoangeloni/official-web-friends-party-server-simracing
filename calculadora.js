/**
 * Calculadora de Estrategia SimRacing - Versión Segura y Optimizada
 * FriendsPartyServer - 2025
 */

class SimRacingCalculator {
    constructor() {
        this.compoundData = {};
        this.isCalculating = false;
        this.debounceTimer = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showWelcomeMessage();
    }

    // Sanitización de inputs para prevenir XSS
    sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    // Validación robusta de inputs numéricos
    validateNumericInput(value, min = 0, max = Infinity, required = true) {
        if (required && (value === null || value === undefined || value === '')) {
            throw new Error('Campo requerido');
        }

        const numValue = parseFloat(value);
        
        if (isNaN(numValue)) {
            throw new Error('Debe ser un número válido');
        }

        if (numValue < min || numValue > max) {
            throw new Error(`Valor debe estar entre ${min} y ${max}`);
        }

        return numValue;
    }

    // Mostrar mensajes con mejor UX
    showMessage(message, type = 'info', duration = 3000) {
        const existingMessage = document.querySelector('.temp-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageStyles = {
            info: { bg: 'bg-blue-600', text: 'text-white', icon: 'ℹ️' },
            success: { bg: 'bg-green-600', text: 'text-white', icon: '✅' },
            warning: { bg: 'bg-yellow-600', text: 'text-white', icon: '⚠️' },
            error: { bg: 'bg-red-600', text: 'text-white', icon: '❌' }
        };

        const style = messageStyles[type] || messageStyles.info;
        
        const messageEl = document.createElement('div');
        messageEl.className = `temp-message fixed top-4 right-4 z-50 ${style.bg} ${style.text} px-6 py-4 rounded-lg shadow-lg max-w-md transition-all duration-300 transform translate-y-0`;
        messageEl.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-xl">${style.icon}</span>
                <span class="font-medium">${this.sanitizeInput(message)}</span>
            </div>
        `;

        document.body.appendChild(messageEl);

        // Animación de entrada
        requestAnimationFrame(() => {
            messageEl.classList.add('animate-slide-in');
        });

        setTimeout(() => {
            messageEl.classList.add('animate-slide-out');
            setTimeout(() => messageEl.remove(), 300);
        }, duration);
    }

    showWelcomeMessage() {
        this.showMessage(
            '¡Bienvenido a la calculadora de estrategias SimRacing! Optimiza tu rendimiento con datos precisos.',
            'info',
            4000
        );
    }

    // Debounce para evitar cálculos excesivos
    debounce(func, delay) {
        return (...args) => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => func.apply(this, args), delay);
        };
    }

    setupEventListeners() {
        const numCompoundInput = document.getElementById('numCompuestos');
        const boxStopsSelect = document.getElementById('paradasBoxes');
        
        if (numCompoundInput) {
            numCompoundInput.addEventListener('input', 
                this.debounce(this.handleCompoundCountChange.bind(this), 300)
            );
        }

        if (boxStopsSelect) {
            boxStopsSelect.addEventListener('change', this.handleBoxStopsChange.bind(this));
        }

        // Validación en tiempo real para inputs numéricos
        const numericInputs = document.querySelectorAll('input[type="number"]');
        numericInputs.forEach(input => {
            input.addEventListener('input', this.validateInputRealTime.bind(this));
            input.addEventListener('blur', this.formatInputValue.bind(this));
        });
    }

    validateInputRealTime(event) {
        const input = event.target;
        const value = input.value;
        
        // Remover indicadores de error previos
        input.classList.remove('border-red-500', 'border-green-500');
        
        if (value && !isNaN(parseFloat(value))) {
            input.classList.add('border-green-500');
        } else if (value) {
            input.classList.add('border-red-500');
        }
    }

    formatInputValue(event) {
        const input = event.target;
        const value = parseFloat(input.value);
        
        if (!isNaN(value)) {
            // Formatear valores según el tipo de input
            if (input.id === 'tiempoVuelta') {
                input.value = value.toFixed(2);
            } else if (input.id === 'consumoVuelta') {
                input.value = value.toFixed(1);
            }
        }
    }

    handleCompoundCountChange(event) {
        const numCompounds = parseInt(event.target.value);
        
        try {
            this.validateNumericInput(numCompounds, 1, 6);
            this.generateCompoundInputs(numCompounds);
            this.showMessage(`Configurando ${numCompounds} compuesto(s) de neumáticos`, 'info', 2000);
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    generateCompoundInputs(numCompounds) {
        const container = document.getElementById('compuestosContainer');
        const initialCompoundSelect = document.getElementById('compuestoInicial');
        
        if (!container) return;

        container.innerHTML = '';
        initialCompoundSelect.innerHTML = '';

        const compoundTypes = [
            { value: 'SS', label: 'Super Soft', color: 'bg-red-600' },
            { value: 'S', label: 'Soft', color: 'bg-yellow-600' },
            { value: 'M', label: 'Medium', color: 'bg-white text-black' },
            { value: 'H', label: 'Hard', color: 'bg-orange-600' }
        ];

        for (let i = 1; i <= numCompounds; i++) {
            const compoundDiv = document.createElement('div');
            compoundDiv.className = 'bg-gray-700 p-4 rounded-lg border border-gray-600';
            
            compoundDiv.innerHTML = `
                <h3 class="text-xl font-bold mb-3 text-yellow-400">Compuesto ${i}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="tipoCompuesto${i}" class="block mb-2 font-medium text-gray-200">
                            Tipo de Compuesto:
                        </label>
                        <select id="tipoCompuesto${i}" class="w-full p-3 border border-gray-500 rounded-md bg-gray-800 text-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400" required>
                            ${compoundTypes.map(type => 
                                `<option value="${type.value}" class="${type.color}">${type.label} (${type.value})</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div>
                        <label for="duracionCompuesto${i}" class="block mb-2 font-medium text-gray-200">
                            Duración (vueltas):
                        </label>
                        <input 
                            type="number" 
                            id="duracionCompuesto${i}" 
                            class="w-full p-3 border border-gray-500 rounded-md bg-gray-800 text-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400" 
                            min="1" 
                            max="200" 
                            required
                            placeholder="Ej: 25"
                        >
                    </div>
                </div>
            `;
            
            container.appendChild(compoundDiv);
        }

        // Botón para guardar compuestos
        const saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.className = 'w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-lg mt-4 transition-all duration-300 transform hover:scale-105';
        saveButton.innerHTML = '💾 Guardar Configuración de Compuestos';
        saveButton.addEventListener('click', this.saveCompounds.bind(this));
        
        container.appendChild(saveButton);
    }

    saveCompounds() {
        try {
            const numCompounds = parseInt(document.getElementById('numCompuestos').value);
            const initialSelect = document.getElementById('compuestoInicial');
            
            this.compoundData = {};
            initialSelect.innerHTML = '';

            for (let i = 1; i <= numCompounds; i++) {
                const type = document.getElementById(`tipoCompuesto${i}`).value;
                const duration = this.validateNumericInput(
                    document.getElementById(`duracionCompuesto${i}`).value,
                    1, 200
                );

                this.compoundData[type] = duration;

                // Agregar al select inicial
                const option = document.createElement('option');
                option.value = type;
                option.textContent = `${type} (${duration} vueltas)`;
                initialSelect.appendChild(option);
            }

            this.showMessage('✅ Configuración de compuestos guardada correctamente', 'success');
            
        } catch (error) {
            this.showMessage(`Error al guardar compuestos: ${error.message}`, 'error');
        }
    }

    handleBoxStopsChange(event) {
        const boxStopsContainer = document.getElementById('paradasContainer');
        const hasBoxStops = event.target.value === "1";
        
        if (boxStopsContainer) {
            boxStopsContainer.style.display = hasBoxStops ? 'block' : 'none';
        }
    }

    // Algoritmo mejorado de cálculo de estrategia
    calculateStrategy() {
        if (this.isCalculating) {
            this.showMessage('Cálculo en progreso...', 'warning');
            return;
        }

        this.isCalculating = true;

        try {
            // Validación de inputs principales
            const raceDuration = this.validateNumericInput(
                document.getElementById('duracionCarrera').value, 1, 600
            );
            const lapTime = this.validateNumericInput(
                document.getElementById('tiempoVuelta').value, 0.1, 10
            );
            const fuelConsumption = this.validateNumericInput(
                document.getElementById('consumoVuelta').value, 0.1, 50
            );
            const extraLap = parseInt(document.getElementById('vueltaExtra').value) || 0;
            const initialCompound = document.getElementById('compuestoInicial').value;
            const hasBoxStops = parseInt(document.getElementById('paradasBoxes').value) === 1;

            // Validaciones específicas
            if (!initialCompound) {
                throw new Error('Selecciona un compuesto inicial');
            }

            if (Object.keys(this.compoundData).length === 0) {
                throw new Error('Configura y guarda los compuestos primero');
            }

            // Cálculos principales
            const totalLaps = Math.floor(raceDuration / lapTime) + extraLap;
            const totalFuel = totalLaps * fuelConsumption;
            const initialDuration = this.compoundData[initialCompound];

            let strategy = this.calculateOptimalStrategy(
                totalLaps, initialCompound, initialDuration, fuelConsumption, hasBoxStops
            );

            this.displayResults({
                totalLaps,
                totalFuel,
                initialCompound,
                initialDuration,
                strategy
            });

            this.showMessage('🏁 Estrategia calculada con éxito', 'success');

        } catch (error) {
            this.showMessage(`Error en el cálculo: ${error.message}`, 'error');
        } finally {
            this.isCalculating = false;
        }
    }

    calculateOptimalStrategy(totalLaps, initialCompound, initialDuration, fuelConsumption, hasBoxStops) {
        if (!hasBoxStops) {
            return this.calculateNoStopsStrategy(totalLaps, initialCompound, initialDuration);
        }

        return this.calculateBoxStopsStrategy(totalLaps, initialCompound, fuelConsumption);
    }

    calculateNoStopsStrategy(totalLaps, initialCompound, initialDuration) {
        if (initialDuration >= totalLaps) {
            return {
                type: 'no-stops',
                description: `Estrategia sin paradas: ${initialCompound} para ${totalLaps} vueltas`,
                details: [`Compuesto único: ${initialCompound} (${totalLaps}/${initialDuration} vueltas)`],
                feasible: true
            };
        } else {
            return {
                type: 'no-stops',
                description: `⚠️ Imposible sin paradas: Se necesitan ${Math.ceil(totalLaps/initialDuration)} paradas mínimas`,
                details: [`Duración insuficiente: ${initialCompound} solo dura ${initialDuration} vueltas`],
                feasible: false
            };
        }
    }

    calculateBoxStopsStrategy(totalLaps, initialCompound, fuelConsumption) {
        const compounds = Object.entries(this.compoundData)
            .sort((a, b) => b[1] - a[1]); // Ordenar por duración descendente

        let remainingLaps = totalLaps;
        let currentLap = 0;
        let stints = [];
        let stopNumber = 0;

        // Primer stint
        const initialDuration = Math.min(this.compoundData[initialCompound], remainingLaps);
        stints.push({
            stint: 1,
            compound: initialCompound,
            laps: initialDuration,
            startLap: 1,
            endLap: initialDuration,
            fuel: (initialDuration * fuelConsumption).toFixed(1)
        });

        remainingLaps -= initialDuration;
        currentLap = initialDuration;

        // Stints adicionales
        while (remainingLaps > 0) {
            stopNumber++;
            
            // Encontrar el mejor compuesto para las vueltas restantes
            let bestCompound = null;
            let bestScore = -1;

            for (const [compound, duration] of compounds) {
                const usableLaps = Math.min(duration, remainingLaps);
                const efficiency = usableLaps / remainingLaps; // Qué tan bien se ajusta
                
                if (efficiency > bestScore) {
                    bestScore = efficiency;
                    bestCompound = { type: compound, duration: usableLaps };
                }
            }

            if (bestCompound) {
                stints.push({
                    stint: stopNumber + 1,
                    compound: bestCompound.type,
                    laps: bestCompound.duration,
                    startLap: currentLap + 1,
                    endLap: currentLap + bestCompound.duration,
                    fuel: (bestCompound.duration * fuelConsumption).toFixed(1),
                    stopLap: currentLap
                });

                remainingLaps -= bestCompound.duration;
                currentLap += bestCompound.duration;
            } else {
                break;
            }
        }

        return {
            type: 'box-stops',
            totalStops: stopNumber,
            stints: stints,
            feasible: remainingLaps === 0,
            description: remainingLaps === 0 
                ? `Estrategia óptima con ${stopNumber} parada(s)`
                : `⚠️ No se puede completar la carrera con los compuestos disponibles`
        };
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('resultados');
        
        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-500">
                <h3 class="text-3xl font-bold mb-6 text-center text-yellow-400">🏁 Resultados de la Estrategia</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="bg-gray-700 p-4 rounded-lg">
                        <h4 class="text-xl font-bold text-yellow-400 mb-2">📊 Datos Generales</h4>
                        <ul class="space-y-2 text-gray-200">
                            <li><strong>Total de vueltas:</strong> ${results.totalLaps}</li>
                            <li><strong>Combustible total:</strong> ${results.totalFuel.toFixed(1)} L</li>
                            <li><strong>Compuesto inicial:</strong> ${results.initialCompound} (${results.initialDuration} vueltas)</li>
                        </ul>
                    </div>
                    
                    <div class="bg-gray-700 p-4 rounded-lg">
                        <h4 class="text-xl font-bold text-yellow-400 mb-2">🎯 Estrategia</h4>
                        <p class="text-gray-200 font-medium">${results.strategy.description}</p>
                    </div>
                </div>

                ${this.generateStrategyDetails(results.strategy)}
                
                <div class="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500">
                    <p class="text-blue-200 text-sm">
                        <strong>💡 Consejo:</strong> Esta estrategia es una estimación basada en los datos ingresados. 
                        Considera factores como temperatura de pista, desgaste real y condiciones de carrera.
                    </p>
                </div>
            </div>
        `;

        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    generateStrategyDetails(strategy) {
        if (strategy.type === 'no-stops') {
            return `
                <div class="bg-gray-700 p-4 rounded-lg">
                    <h4 class="text-xl font-bold text-green-400 mb-3">🔄 Detalles de la Estrategia</h4>
                    <div class="space-y-2">
                        ${strategy.details.map(detail => `<p class="text-gray-200">• ${detail}</p>`).join('')}
                    </div>
                </div>
            `;
        }

        if (strategy.type === 'box-stops' && strategy.feasible) {
            return `
                <div class="bg-gray-700 p-4 rounded-lg">
                    <h4 class="text-xl font-bold text-green-400 mb-3">🔄 Plan de Paradas (${strategy.totalStops} parada(s))</h4>
                    <div class="space-y-3">
                        ${strategy.stints.map(stint => `
                            <div class="bg-gray-600 p-3 rounded border-l-4 border-yellow-400">
                                <div class="flex justify-between items-center">
                                    <span class="font-bold text-yellow-400">Stint ${stint.stint}</span>
                                    <span class="text-gray-300">Vueltas ${stint.startLap}-${stint.endLap}</span>
                                </div>
                                <div class="mt-1 text-gray-200">
                                    <span class="mr-4">🏎️ ${stint.compound}</span>
                                    <span class="mr-4">🔄 ${stint.laps} vueltas</span>
                                    <span>⛽ ${stint.fuel}L</span>
                                    ${stint.stopLap ? `<span class="ml-4 text-red-400">📍 Parada: Vuelta ${stint.stopLap}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        return `
            <div class="bg-red-900/20 p-4 rounded-lg border border-red-500">
                <h4 class="text-xl font-bold text-red-400 mb-2">⚠️ Estrategia No Viable</h4>
                <p class="text-red-200">No es posible completar la carrera con la configuración actual de compuestos.</p>
            </div>
        `;
    }

    clearForm() {
        const form = document.getElementById('calculadoraForm');
        if (form) {
            form.reset();
        }

        this.compoundData = {};
        
        const containers = ['compuestosContainer', 'paradasContainer'];
        containers.forEach(id => {
            const container = document.getElementById(id);
            if (container) {
                container.innerHTML = '';
                container.style.display = 'none';
            }
        });

        const resultsContainer = document.getElementById('resultados');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }

        this.showMessage('🧹 Formulario limpiado correctamente', 'info', 2000);
    }
}

// CSS adicional para animaciones
const additionalStyles = `
    <style>
        @keyframes slide-in {
            from { transform: translate(100%, -50%); opacity: 0; }
            to { transform: translate(-50%, -50%); opacity: 1; }
        }
        
        @keyframes slide-out {
            from { transform: translate(-50%, -50%); opacity: 1; }
            to { transform: translate(100%, -50%); opacity: 0; }
        }
        
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        .animate-slide-out { animation: slide-out 0.3s ease-in; }
        
        .temp-message {
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        input:focus, select:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.3);
        }
        
        .loading {
            pointer-events: none;
            opacity: 0.7;
        }
    </style>
`;

// Inyectar estilos
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Inicializar la calculadora cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.simRacingCalculator = new SimRacingCalculator();
});

// Funciones globales para compatibilidad con el HTML existente
function calcular() {
    if (window.simRacingCalculator) {
        window.simRacingCalculator.calculateStrategy();
    }
}

function limpiarFormulario() {
    if (window.simRacingCalculator) {
        window.simRacingCalculator.clearForm();
    }
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimRacingCalculator;
}
