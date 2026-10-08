// etl.js
const { Transform } = require('stream');

class FormateadorCSV extends Transform {
    // chunk es un Buffer que recibe datos por partes
    _transform(chunk, encoding, callback) {
        // Parseo a texto y transformación pesada
        let dataTexto = chunk.toString();
        let dataMutada = dataTexto.replace(/,/g, ' | ');

        // Enviar al stream de lectura interno
        this.push(dataMutada);

        // Señalización de finalización de bloque
        callback();
    }
}

module.exports = FormateadorCSV;
