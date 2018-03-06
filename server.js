import dgram from 'dgram';
import readline from 'readline';

const MY_NAME = 'simon';
const BROADCAST_INTERVAL = 1000;

const socket = dgram.createSocket('udp4');

const addressBook = {};
const history = [];

const rl = readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  })
  .on('line', line => {
    switch (line.trim()) {
      case '/history':
        console.log(history);
        break;
      case '/addressbook':
        console.log(addressBook);
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

const broadcast = socket => {
  socket.send(`wd;${MY_NAME}`, 1025, '255.255.255.255');
};

socket.on('error', err => {
  console.log(`socket error:\n${err.stack}`);
  socket.close();
});

socket.on('message', (msg, rinfo) => {
  const [cmd, name, payload] = msg.toString().split(';');

  history.push(msg.toString());

  if (cmd === 'wd') addressBook[name] = rinfo.address;
});

socket.on('listening', () => {
  socket.setBroadcast(true);
  const address = socket.address();
  console.log(`socket listening ${address.address}:${address.port}`);

  rl.prompt();

  global.setInterval(() => broadcast(socket), BROADCAST_INTERVAL);
});

socket.bind(1025);
