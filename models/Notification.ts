import * as Keystone from 'keystone';
import Expo from 'expo-server-sdk';
import { PushDevice } from '.';
const Types = Keystone.Field.Types;

const expo = new Expo();
const pushDeviceModel = () => Keystone.list<PushDevice>('PushDevice').model;

export interface Notification {
  title: string;
  body: string;
  priority: 'default' | 'normal' | 'high';
  dateSent: Date;
}

export type NotificationDocument = Keystone.Document<Notification>;

export const Notification = new Keystone.List<Notification>('Notification', {
  autokey: { path: 'slug', from: 'title' },
  defaultSort: 'dateSent'
});

Notification.add({
  title: { type: String, initial: true },
  body: { type: String, initial: true },
  priority: {
    type: Types.Select,
    options: 'default, normal, high',
    default: 'default',
    initial: 'true'
  },
  dateSent: { type: Date, utc: true, noedit: true }
});

Notification.schema.pre('save', function (this: NotificationDocument, next) {
  if (!this.dateSent) {
    this.dateSent = new Date();
  }
  next();
});

// send notification to all registered devices after saving this notification
Notification.schema.post('save', async (doc: NotificationDocument) => {
  const devices = await pushDeviceModel().find().exec();
  const messages = await devices.map(token => ({
    to: token.token,
    title: doc.title,
    body: doc.body,
    priority: doc.priority
  }));

  // send to Expo backend
});

Notification.defaultColumns = 'dateSent, title';
Notification.register();

export default Notification;
