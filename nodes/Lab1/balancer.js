// balancer.js
const net = require('net');
const NODES = [3001, 3002, 3003]; // Lista de puertos de los nodos disponibles
let idx = 0;

const balancer = net.createServer((client) => {

    // Algoritmo Round-Robin
    const targetPort = NODES[idx % NODES.length];
    idx++;
    console.log(`Enrutando tráfico -> Puerto ${targetPort}`);

    // Conectar con el nodo interno
    const node = net.createConnection({ port: targetPort });

    // tuberia bidireccional de datos
    client.pipe(node);
    node.pipe(client);

    // Manejo preventivo de fallos
    node.on('error', (err) => {
        console.error(`[!] Error en la conexión con el nodo ${targetPort}:`, err);
        client.end('Error en la conexión con el nodo');
    });

});

balancer.listen(8080, () => {
    console.log(`[+] Balanceador escuchando en el puerto 8080`);
});

balancer.on('error', (err) => {
    console.error(`[!] Error en el balanceador:`, err);
});