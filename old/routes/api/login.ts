import {Router} from 'express';
import {omit} from 'lodash';
import {list} from 'keystone';
import {User, UserDocument} from '../../models/User';
import {UNAUTHORIZED, INTERNAL_SERVER_ERROR} from 'http-status-codes';
import {createUserToken} from './auth';

const INVALID_LOGIN_MSG = 'Invalid login or password.';
const INTERNAL_ERROR_MSG = 'Unable to login due to an internal error';

export const login = Router();

login.post('/', async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const user = await list<User>('User').model.findOne({email});
    if (user != null && await verifyPassword(user, password)) {
      // pluck password from user document
      const userDoc = omit(user, 'password');
      // and send it in response
      res.json({ message: 'OK', ...createUserToken(user), user: userDoc });
    } else {
      res.status(UNAUTHORIZED).json({message: INVALID_LOGIN_MSG});
    }
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).json({message: INTERNAL_ERROR_MSG});
  }
});

function verifyPassword(user: UserDocument, password: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    user._.password.compare(password, (err: Error, success: boolean) => {
      if (err) {
        reject(err);
      }
      resolve(success);
    });
  });
}
