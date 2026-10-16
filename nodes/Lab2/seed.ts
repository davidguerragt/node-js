const fs = require('node:fs');

const out = fs.createWriteStream('big.csv');
let iter = 10_000_000;

function escribirBloque(): void {
  let ok = true;
  while (iter > 0 && ok) {
    iter--;
    const fila = `${iter}, ${Math.random() * 5000}, ACTIVO\n`;

    if (iter === 0) out.write(fila);
    else ok = out.write(fila);
  }

  if (iter > 0) {
    out.once('drain', escribirBloque);
  } else {
    console.log('Sembrado masivo completado');
  }
}

escribirBloque();
