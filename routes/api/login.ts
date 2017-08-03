import {Router} from 'express';
import {omit} from 'lodash';
import {list} from 'keystone';
import {User} from '../../models/User';
import {UNAUTHORIZED, INTERNAL_SERVER_ERROR} from 'http-status-codes';
import {createUserToken} from './auth';

const INVALID_LOGIN_MSG = 'Invalid login or password.';
const INTERNAL_ERROR_MSG = 'Unable to login due to an internal error';

export const login = Router();
// post to api/auth will return
login.post('/', async (req, res, next) => {
  const {email, password} = req.body;
  try {
    // const user = await signIn(email, password);
    const user = await list<User>('User').model.findOne({email});
    if (!user) {
      res.status(UNAUTHORIZED).json({message: INVALID_LOGIN_MSG});
    } else {
      user._.password.compare(password, (err: Error, success: boolean) => {
        if (success) {
          res.json({message: 'OK', ...createUserToken(user), user: omit(user, 'password')});
        } else {
          res.status(UNAUTHORIZED).json({message: INVALID_LOGIN_MSG});
        }
      });
    }
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).json({message: INTERNAL_ERROR_MSG});
  }
});
