const net = require('node:net');

const NODES: number[] = [3001, 3002, 3003];
let idx = 0;

const balancer = net.createServer((client: net.Socket) => {
    const targetPort = NODES[idx % NODES.length];
    idx++;
    console.log(`Enrutando tráfico -> Puerto ${targetPort}`);

    const node = net.createConnection({ port: targetPort });

    client.pipe(node);
    node.pipe(client);

    node.on('error', (err: Error) => {
        console.error(`[!] Error en la conexión con el nodo ${targetPort}:`, err);
        client.end('Error en la conexión con el nodo');
    });
});

balancer.listen(8080, () => {
    console.log('[+] Balanceador escuchando en el puerto 8080');
    console.log(`Nodos disponibles: ${NODES.join(', ')}`);
    console.log('Balanceador listo para enrutar tráfico');
});

balancer.on('error', (err: Error) => {
    console.error('[!] Error en el balanceador:', err);
});