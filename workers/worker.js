import { parentPort } from "node:worker_threads";

parentPort.once("message", ({ iterations }) => {
    console.log('Heavy CPU blocking task started in worker');
    for (let i = 0; i < iterations; i++) { }
    parentPort.postMessage({
        message: 'El event loop estuvo bloqueado durante la tarea pesada de CPU'
    });
});