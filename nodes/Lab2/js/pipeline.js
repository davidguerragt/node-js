// pipeline.js
const fs = require('fs');
const { pipeline } = require('stream');
const Formateador = require('./etl');

const input = fs.createReadStream('big.csv');
const transformer = new Formateador();
const output = fs.createWriteStream('final.txt');

// Profiler de RAM no bloqueante
const intervalo = setInterval(() => {
    const mb = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`[+] Consumo RAM: ${mb.toFixed(2)} MB`);
}, 500);

// Pipeline gestiona memory leaks por errores
pipeline(input, transformer, output, (err) => {
    clearInterval(intervalo);
    if (err) console.error('Error de Stream', err);
    else console.log('Procesamiento completado sin crashear.');
});
