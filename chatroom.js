'use strict';

// First Party Modules
const net = require('net');
const events = require('./lib/event');
const listen = require('./lib/emitter');
const port = process.env.PORT || 3001;
const server = net.createServer();

server.on('connection', (socket) => {
  events.emit('connection', socket);
  // let id = uuid();
  // socketPool[id] = {
  //   id:id,
  //   nickname: `User-${id}`,
  //   socket: socket,
  // };
  // socket.on('data', (buffer) => dispatchAction(id, buffer));
});

// let parse = (buffer) => {
//   let text = buffer.toString().trim();
//   if ( !text.startsWith('@') ) { return null; }
//   let [command,payload] = text.split(/\s+(.*)/);
//   let [target,message] = payload.split(/\s+(.*)/);
//   return {command,payload,target,message};
// };

// let dispatchAction = (userId, buffer) => {
//   let entry = parse(buffer);
//   if ( entry && typeof commands[entry.command] === 'function' ) {
//     commands[entry.command](entry, userId);
//   }
// };

// commands['@all'] =  (data, userId) => {
//   for( let connection in socketPool ) {
//     let user = socketPool[connection];
//     user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
//   }
//   console.log('message sent using server');
// };

// commands['@nick'] =  (data, userId) => {
//   socketPool[userId].nickname = data.target;
// };

server.listen(port, () => {
  console.log(`Chat Server up on ${port}`);
});
