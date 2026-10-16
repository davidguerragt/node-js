const { Transform } = require('stream');
type Buffer = Uint8Array;
type BufferEncoding = 'utf8' | 'ascii' | 'base64' | 'latin1' | 'hex';
type TransformCallback = (error?: Error | null) => void;

class FormateadorCSV extends Transform {
  _transform(
    chunk: Buffer,
    encoding: BufferEncoding,
    callback: TransformCallback,
  ): void {
    const dataTexto = chunk.toString();
    const dataMutada = dataTexto.replace(/,/g, ' | ');

    this.push(dataMutada);
    callback();
  }
}

module.exports = { FormateadorCSV };