const events = require('./event');
const uuid = require('uuid/v4');
const socketPool = {};
const commands = {};

events.on('connection', runConnectScript);
events.on('new socket data', dispatchAction);


function runConnectScript(socket) {
// Dooo Something
  let id = uuid();
  socketPool[id] = {
    id:id,
    nickname: `User-${id}`,
    socket: socket,
  };
  socket.on('data', (buffer) => dispatchAction(id, buffer));
}

function dispatchAction(userId, buffer) {
  // Doo something else
  let entry = parse(buffer);
  if ( entry && typeof commands[entry.command] === 'function' ) {
    commands[entry.command](entry, userId);
  }
}

let parse = (buffer) => {
  let text = buffer.toString().trim();
  if ( !text.startsWith('@') ) { return null; }
  let [command,payload] = text.split(/\s+(.*)/);
  let [target,message] = payload.split(/\s+(.*)/);
  return {command,payload,target,message};
};

commands['@all'] =  (data, userId) => {
  for( let connection in socketPool ) {
    let user = socketPool[connection];
    user.socket.write(`<${socketPool[userId].nickname}>: ${data.payload}\n`);
  }
  console.log('message sent using server');
};

commands['@nick'] =  (data, userId) => {
  socketPool[userId].nickname = data.target;

};

module.exports = socketPool, commands;