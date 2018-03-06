import dgram from 'dgram';

const discoveryServer = dgram.createSocket('udp4');

discoveryServer.on('error', err => {
  console.log(`discoveryServer error:\n${err.stack}`);
  discoveryServer.close();
});

discoveryServer.on('message', (msg, rinfo) => {
  console.log(
    `discoveryServer got: ${msg} from ${rinfo.address}:${rinfo.port}`,
  );
});

discoveryServer.on('listening', () => {
  const address = discoveryServer.address();
  console.log(`discoveryServer listening ${address.address}:${address.port}`);
});

discoveryServer.bind(1025);
