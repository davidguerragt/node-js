// queue.js (Parte 1)
class PriorityQueue {
    constructor() {
        this.tareas = [];
        this.isProcessing = false;
    }

    // Escala prioridades: 1 (Baja) a 10 (Urgente)
    add(id, data, priority = 1) {
        this.tareas.push({ id, data, priority });

        // Reordenamiento inmediato tras inserción
        // (Apto para este lab. Prod requiere Min-Heap)
        this.tareas.sort((a, b) => b.priority - a.priority);
    }

    get length() { return this.tareas.length; }

    next() { return this.tareas.shift(); }

    // queue.js (Parte 2 - Dentro de la clase)
    start() {
        if (this.isProcessing) return;
        this.isProcessing = true;
        this._processLoop();
    }

    _processLoop() {
        if (this.length === 0) {
            this.isProcessing = false;
            return console.log('Cola vaciada.');
        }

        const tarea = this.next();
        JSON.stringify(tarea.data); // Esfuerzo Simulado

        if (tarea.priority > 5) {
            console.log(`[URGENTE] Procesado: ${tarea.id}`);
        }

        // MAGIA: Liberar Event Loop en cada iteración
        setImmediate(() => {
            this._processLoop();
        });
    }
}
