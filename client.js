import dgram from 'dgram';

const client = dgram.createSocket('udp4');

client.on('listening', function() {
  var address = client.address();
  console.log(
    'UDP Client listening on ' + address.address + ':' + address.port,
  );
  // client.send('Hallo welt', 1025, 'localhost', err => {
  //   // client.close();
  // });
  client.setBroadcast(true);
  client.send('Broadcast', 1025, '255.255.255.255', err => {
    if (err) console.error(err);
    client.close();
  });
});

// client.bind('10.207.5.95');
client.bind();
