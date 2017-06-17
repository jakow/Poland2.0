import * as SocketIO from 'socket.io';
import {LeanDocument} from 'keystone';
import {Server, IncomingMessage} from 'http';
import {Question} from '../models/Question';
import {hooks} from './api/questions';
import {authenticateToken} from './api/auth';

/**
 * This is the realtime question API built with Socket.io which sends realtime updates to
 * connected clients as updates to questions database are made.
 */
hooks.on('update', handleQuestionUpdate);

let io: SocketIO.Server;

export function initSockets(server: Server) {
  io = SocketIO(server);
  // bootstrap onto the question model
  io.on('connection', handleConnection);
  return io;

}

export function handleQuestionUpdate(prevState: LeanDocument<Question>, nextState: LeanDocument<Question>) {
  console.log('Question update');
  if (nextState.archived || !nextState.accepted) {
    io.to('client').emit('remove question', nextState._id);
  } else {
    io.to('client').emit('question', nextState);
  }

  io.to('admin').emit('question', nextState);
}

export async function handleConnection(socket: SocketIO.Socket) {
  const request = socket.client.request as IncomingMessage;
  const isAdmin = await authenticateToken(request);
  if (isAdmin) {
    socket.join('admin');
  } else {
    socket.join('client');
  }
  console.log('connected!');
  io.emit('welcome message', {msg: 'hello world!'});
}
