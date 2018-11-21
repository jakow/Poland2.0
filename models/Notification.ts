import * as Keystone from 'keystone';
import Expo, { ExpoPushTicket } from 'expo-server-sdk';
import { PushDevice } from '.';
const Types = Keystone.Field.Types;

const expo = new Expo();
const pushDeviceModel = () => Keystone.list<PushDevice>('PushDevice').model;

export interface Notification {
  name: string;
  body: string;
  priority: 'default' | 'normal' | 'high';
  dateSent: Date;
  status: string;
}

export type NotificationDocument = Keystone.Document<Notification>;

export const Notification = new Keystone.List<Notification>('Notification', {
  autokey: { path: 'slug', from: 'title' },
  defaultSort: 'dateSent'
});

Notification.add({
  name: { type: String, initial: true },
  body: { type: String, initial: true },
  priority: {
    type: Types.Select,
    options: 'default, normal, high',
    default: 'default',
    initial: 'true'
  },
  dateSent: { type: Date, utc: true, noedit: true },
  status: { type: String, noedit: true }
});

Notification.schema.pre('save', function (this: NotificationDocument, next) {
  if (!this.dateSent) {
    this.dateSent = new Date();
  }
  next();
});

// send notification to all registered devices after saving this notification
Notification.schema.post('save', async (doc: NotificationDocument) => {
  const devices = await pushDeviceModel().find().distinct('token').exec();
  const messages = await devices.map(token => ({
    to: token,
    title: doc.name,
    body: doc.body,
    priority: doc.priority
  }));

  // send to Expo backend
  const chunks = expo.chunkPushNotifications(messages);
  (async () => {
    for (const chunk of chunks) {
      try {
        const tickets = await expo.sendPushNotificationsAsync(chunk);
        for (const _ticket of tickets) {
          const ticket = _ticket as any;
          if (ticket.status === 'error') {
            console.error('Could not send ticket:', ticket.message);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  })();
});

Notification.defaultColumns = 'dateSent';
Notification.register();

export default Notification;
