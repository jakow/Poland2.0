import * as SocketIO from 'socket.io';
import {RawDocument} from 'keystone';
import {Server, IncomingMessage} from 'http';
import {Question} from '../models/Question';
import {hooks} from './api/questions';
import {isAdmin} from './api/auth';

/**
 * This is the realtime question API built with Socket.io which sends realtime updates to
 * connected clients as updates to questions database are made.
 */

let io: SocketIO.Server;

export function initSockets(server: Server) {
  io = SocketIO(server);
  // bootstrap onto the question model
  io.on('connection', handleConnection);
  hooks.on('update', handleQuestionUpdate);
  hooks.on('create', handleQuestionCreate);
  return io;
}

export function handleQuestionUpdate(prevState: RawDocument<Question>, nextState: RawDocument<Question>) {
  console.log('Question update');
  if (nextState.archived || !nextState.accepted) {
    io.to('client').emit('remove question', nextState._id);
  } else if (nextState.accepted) {
    io.to('client').emit('question', nextState);
  }

  io.to('admin').emit('question', nextState);
}

export function handleQuestionCreate(q: RawDocument<Question>) {
  io.to('admin').emit('question', q);
  console.log('New question', q);
}

export async function handleConnection(socket: SocketIO.Socket) {
  const request = socket.client.request as IncomingMessage;
  if (await isAdmin(request)) {
    socket.join('admin');
    console.log('admin connected');
  } else {
    socket.join('client');
    console.log('client connected');
  }
  io.emit('welcome message', {msg: 'hello world!'});
}
