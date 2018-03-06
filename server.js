import dgram from 'dgram';
import readline from 'readline';

const socket = dgram.createSocket('udp4');

socket.on('error', err => {
  console.log(`socket error:\n${err.stack}`);
  socket.close();
});

socket.on('message', (msg, rinfo) => {
  rl.clearLine(process.stdout, 0);
  console.log(`socket got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  rl.prompt();
});

socket.on('listening', () => {
  const address = socket.address();
  console.log(`socket listening ${address.address}:${address.port}`);
  rl.prompt();
});

socket.bind(1025);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

rl
  .on('line', line => {
    switch (line.trim()) {
      case 'hello':
        console.log('world!');
        break;
      default:
        console.log(`Say what? I might have heard '${line.trim()}'`);
        break;
    }
    rl.prompt();
  })
  .on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
  });

// socket.send('Hallo welt', 1025, 'localhost');
