import { INTERNAL_SERVER_ERROR, CREATED, BAD_REQUEST, CONFLICT } from 'http-status-codes';
import { Request, Response, Router } from 'express';
import Expo from 'expo-server-sdk';
import { list } from 'keystone';
import { PushDevice } from '../../models';
import { WriteError } from 'mongodb';

const pushDeviceModel = () => list<PushDevice>('PushDevice').model;
const notifications = Router();

async function create(req: Request, res: Response) {
  try {
    const { token } = req.body;
    if (!token || !Expo.isExpoPushToken(token.value)) {
      throw 'Invalid token';
    }

    pushDeviceModel().create({ token: token.value }, (err: WriteError, query: any) => {
      if (err) {
        console.log(err.errmsg);
        if (err.code === 11000) {
          res.status(CONFLICT).json('Device is already registered');
        } else {
          res.status(INTERNAL_SERVER_ERROR).json('Registration error');
        }
      } else {
        res.status(CREATED).json(query);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(BAD_REQUEST).json(e);
  }
}

notifications.post('/register', create);

export default notifications;
