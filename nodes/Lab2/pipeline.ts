import fs from 'node:fs';
import { pipeline } from 'node:stream';
import { FormateadorCSV as Formateador } from './etl';

const input = fs.createReadStream('big.csv');
const transformer = new Formateador();
const output = fs.createWriteStream('final.txt');

const intervalo = setInterval(() => {
  const mb = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`[+] Consumo RAM: ${mb.toFixed(2)} MB`);
}, 500);

pipeline(input, transformer, output, (err: Error | null) => {
  clearInterval(intervalo);
  if (err) console.error('Error de Stream', err);
  else console.log('Procesamiento completado sin crashear.');
});
