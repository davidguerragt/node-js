const PriorityQueue = require('./queue.ts');

const q = new PriorityQueue();

console.log('Cargando 5000 reportes lentos...');
for (let i = 0; i < 5000; i++) {
  q.add(`Rep-${i}`, { mock: true }, 1);
}

q.start();

setTimeout(() => {
  console.log('\n--- LLEGA TRÁFICO VIP ---');
  q.add('Transf-A', { user: 'CEO' }, 10);
  q.add('Transf-B', { user: 'CFO' }, 10);
  q.add('Transf-C', { user: 'CTO' }, 10);
}, 2000);
