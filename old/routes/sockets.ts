import * as SocketIO from 'socket.io';
import {RawDocument} from 'keystone';
import {Server, IncomingMessage} from 'http';
import {Question} from '../models/Question';
import {hooks} from './api/questions';
import {cookieSecret as secret} from '../config';
import {socketioAuth} from './api/auth';
/**
 * This is the realtime question API built with Socket.io which sends realtime updates to
 * connected clients as updates to questions database are made.
 */

let io: SocketIO.Server;
let admin: SocketIO.Namespace;
let client: SocketIO.Namespace;
export function initSockets(server: Server) {
  io = SocketIO(server);
  admin = io.of('/admin');
  client = io.of('/client');

  admin.use(socketioAuth({secret, timeout: 10000}));
  admin.on('authenticate', (s: SocketIO.Socket) => console.log('trying to auth'));
  admin.on('authenticated', handleAuthentication);
  // bootstrap onto the question API hooks
  hooks.on('update', handleQuestionUpdate);
  hooks.on('create', handleQuestionCreate);

  return io;
}

function handleQuestionUpdate(prevState: RawDocument<Question>, nextState: RawDocument<Question>) {
  console.log('Question update');
  if (nextState.archived || !nextState.accepted) {
    client.emit('remove question', nextState._id);
    // only authenticated sockets get a question that should not be visible
    admin.to('authenticated').emit('question', nextState);
  } else if (nextState.accepted) {
    client.emit('question', nextState);
    admin.emit('question', nextState);
  }
}

function handleQuestionCreate(q: RawDocument<Question>) {
  admin.to('authenticated').emit('question', q);
  console.log('New question', q);
}

function handleAuthentication(socket: SocketIO.Socket) {
  console.log('Authenticated!');
}
