import {Router, Request, Response, NextFunction} from 'express';
import {IncomingMessage} from 'http';
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import {list} from 'keystone';
import {cookieSecret} from '../../config';
import {User, UserDocument} from '../../models/User';
/*
* JWT based application login
*/

const verify: passportJwt.VerifyCallback = async (jwtPayload, done) => {
  let user: UserDocument;
  try {
    user = await list<User>('User').model.findById(jwtPayload.sub).exec();
    done(null, user);
  } catch (e) {
    done(e, null);
  }
};
const strategy = new passportJwt.Strategy({
  secretOrKey: cookieSecret,
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
}, verify);

passport.use(strategy);

const auth = Router();

// post to api/auth will return
auth.post('/', (req, res, next) => {
// TODO: sign a JWT here
});


export async function authenticateToken(req: IncomingMessage) {
  return false;
}

