import net from 'node:net';

for (let i = 0; i < 3; i++) {
  const client = net.createConnection({ port: 8080 });
  client.write('Ping\n');
  client.on('data', (data) => {
    console.log(`Req ${i} recibió: ${data.toString()}`);
    client.end();
  });
}
