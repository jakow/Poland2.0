import {Router} from 'express';
import {list} from 'keystone';
import {User} from '../../models/User';
import {UNAUTHORIZED, INTERNAL_SERVER_ERROR} from 'http-status-codes';
import {userToken} from './auth';
// import {signIn} from './auth';
// handle login
const INVALID_LOGIN = 'Invalid login or password.';

export const login = Router();
// post to api/auth will return
login.post('/login', async (req, res, next) => {
  const {email, password} = req.body;
  try {
    // const user = await signIn(email, password);
    const user = await list<User>('User').model.findOne({email});
    if (!user) {
      res.status(UNAUTHORIZED).json({message: INVALID_LOGIN});
    } else {
      user._.password.compare(password, (err: Error, result: boolean) => {
        if (result) {
          // successfully signed!
          res.json({message: 'OK', token: userToken(user)});
        } else {
          res.status(UNAUTHORIZED).json({message: INVALID_LOGIN});
        }
      });
    }
  } catch (e) {
    return res.status(INTERNAL_SERVER_ERROR).json({message: 'AUTH_ENDPOINT_FAILED'});
  }
});
