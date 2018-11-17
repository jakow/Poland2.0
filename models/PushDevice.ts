import * as Keystone from 'keystone';
const Types = Keystone.Field.Types;

export interface PushDevice {
  token: string;
}

export type PushDeviceDocument = Keystone.Document<PushDevice>;

const PushDevice = new Keystone.List<PushDevice>('PushDevice', {
  autokey: { path: 'key', from: 'token', unique: true }
});

PushDevice.add({
  token: { type: String, initial: true, unique: true }
});

PushDevice.defaultColumns = 'token';
PushDevice.register();

export default PushDevice;
