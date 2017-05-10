import * as SocketIO from 'socket.io';
import * as keystone from 'keystone';
import {Server, IncomingMessage} from 'http';
import {registerHook} from '../models/Question';
import {QuestionDocument} from '../models/Question';

export let io: SocketIO.Server;

export function initSockets(server: Server) {
  // io = SocketIO(server);
  // bootstrap onto the question model
  // io.on('connection', handleConnection);

}

export function handleUpdate(doc: QuestionDocument) {
  console.log(doc);
  io.emit('updated document', {doc, isNew: doc.isNew});
}

export function handleConnection(socket: SocketIO.Socket) {
  const request = socket.client.request as IncomingMessage;
  console.log(request.headers);
  console.log('connected!');
  io.emit('welcome message', {msg: 'hello world!'});
}
