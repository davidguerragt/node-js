const { setImmediate } = require('node:timers');

interface QueueTask<T> {
  id: string;
  data: T;
  priority: number;
}

class PriorityQueue<T = unknown> {
  private tareas: QueueTask<T>[] = [];
  private isProcessing = false;

  add(id: string, data: T, priority = 1): void {
    this.tareas.push({ id, data, priority });
    this.tareas.sort((a, b) => b.priority - a.priority);
  }

  get length(): number {
    return this.tareas.length;
  }

  next(): QueueTask<T> | undefined {
    return this.tareas.shift();
  }

  start(): void {
    if (this.isProcessing) return;
    this.isProcessing = true;
    this.processLoop();
  }

  private processLoop(): void {
    if (this.length === 0) {
      this.isProcessing = false;
      console.log('Cola vaciada.');
      return;
    }

    const tarea = this.next();
    if (!tarea) {
      this.isProcessing = false;
      return;
    }

    JSON.stringify(tarea.data);

    if (tarea.priority > 5) {
      console.log(`[URGENTE] Procesado: ${tarea.id}`);
    }

    setImmediate(() => {
      this.processLoop();
    });
  }
}

module.exports = PriorityQueue;