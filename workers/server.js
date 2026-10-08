import express from 'express';
import Worker from './worker.js';

const app = express();
const port = 3000;

app.get('/fast', (req, res) => {
    res.json({ status: 'ok', message: 'Respuesta rápida (Event Loop libre)' })
});

app.get('/slow-io', (req, res) => {
    setTimeout(() => {
        res.json({ status: 'ok', message: 'Respuesta resuelta en 5 segundos' });
    }, 5000);
});

app.get('/heavy-cpu-blocking', (req, res) => {
    console.log('Heavy CPU blocking task started');
    for (let i = 0; i < 5_000_000_000; i++) { }
    res.json({ status: 'ok', message: `El event loop estuvo bloqueado durante la tarea pesada de CPU` });
});

const runHeavyTask = (data) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker({ workerData: data });
        worker.once('message', resolve);
        worker.once('error', reject);
        worker.once('exit', (code) => {
            if (code !== 0) reject(new Error(`El worker termina con código ${code}`));
        });
        worker.postMessage(data);
    });
};

app.get('/heavy-cpu-worker', async (req, res) => {
    try {
        console.time('heavy-cpu-worker');
        const result = await runHeavyTask({ iterations: 5_000_000_000 });
        console.timeEnd('heavy-cpu-worker');
        res.json({ status: 'ok', message: result.message });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
