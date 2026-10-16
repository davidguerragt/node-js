const net = require('node:net');

for (let i = 1; i <= 6; i++) {
    const client = net.createConnection({ port: 8080 });
    client.write('Ping\n');
    client.on('data', (d: any) => {
        console.log(`Req ${i}: ${d}`);
        client.end();
    });
}
