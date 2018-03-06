import dgram from 'dgram';

const client = dgram.createSocket('udp4');

client.send('Hallo welt', 1025, 'localhost', err => {
  client.close();
});
