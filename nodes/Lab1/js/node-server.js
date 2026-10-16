// node-server.js
const net = require('net');

// captura dinamica del puerto via CLI
const PORT = process.argv[2] || 3000; // puerto por defecto 3000 si no se proporciona via CLI
const NODE_ID = `Nodo-${PORT}`;

const server = net.createServer((socket) => {
    console.log(`[+] Conexión recibida en ${NODE_ID}`);

    // Simulación de carga (CPU-Bound Task)
    setTimeout(() => {
        socket.write(`Respuesta desde ${NODE_ID}`);
        socket.end(); // Cierra la conexión después de enviar la respuesta
    }, 500); // Simula una carga de 0.5 segundos
});

server.listen(PORT, () => {
    console.log(`[+] ${NODE_ID} escuchando en el puerto ${PORT}`);
});

server.on('error', (err) => {
    console.error(`[!] Error en ${NODE_ID}:`, err);
});
// Eliminar el cierre extra de llaves y paréntesis