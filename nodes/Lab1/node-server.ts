const net = require('node:net');


const PORT = process.argv[2] || 3000;
const NODE_ID = `Nodo-${PORT}`;

const server = net.createServer((socket: net.Socket) => {
  console.log(`[+] Conexión recibida en ${NODE_ID}`);

  setTimeout(() => {
    socket.write(`Respuesta desde ${NODE_ID}`);
    socket.end();
  }, 500);
});

server.listen(PORT, () => {
  console.log(`[+] ${NODE_ID} escuchando en el puerto ${PORT}`);
});

server.on('error', (err: Error) => {
  console.error(`[!] Error en ${NODE_ID}:`, err);
});
