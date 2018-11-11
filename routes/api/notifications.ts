import { INTERNAL_SERVER_ERROR, CREATED } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import Expo from 'expo-server-sdk';
import { list } from 'keystone';
import { PushDevice } from '../../models';

const pushDeviceModel = () => list<PushDevice>('PushDevice').model;
const notifications = Router();

async function create(req: Request, res: Response) {
  try {
    const { token } = req.body;
    if (!token || !Expo.isExpoPushToken(token.value)) {
      throw 'Invalid token';
    }

    const query = await pushDeviceModel().create({ token: token.value });
    res.status(CREATED).json(query);
  } catch (e) {
    console.log(e);
    res.status(INTERNAL_SERVER_ERROR).json(e);
  }
}

notifications.post('/register', create);

export default notifications;
