import {Router, RequestHandler} from 'express';
import {IncomingMessage} from 'http';
import * as passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt, VerifiedCallback} from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import {list, session} from 'keystone';
import {cookieSecret} from '../../config';
import {User, UserDocument} from '../../models/User';
import {FORBIDDEN} from 'http-status-codes';

const USER_REQUIRED = 'USER_REQUIRED';
/*
* JWT based application login
*/

async function verify(payload: any, done: VerifiedCallback) {
  try {
    const user = await list<User>('User').model.findById(payload.id).exec();
    done(null, user);
  } catch (e) {
    done(e, null);
  }
}

const strategy = new JwtStrategy({
  secretOrKey: cookieSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
}, verify);

const signOptions: jwt.SignOptions = {
  expiresIn: '2 hours',
  issuer: 'poland20.com',
};

export function userToken(user: UserDocument) {
  const payload = {
    id: user._id,
  };
  return jwt.sign(payload, cookieSecret, signOptions);
}

export function initialize() {
  passport.use(strategy);
  return passport.initialize();
}

export const authenticateWihoutRedirect: RequestHandler = (req, res, next) => {
  return passport.authenticate('jwt', (err: Error | null, user: string, info: any) => {
    if (err) {
      return next(err);
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const requireUser: RequestHandler = (req, res, next) => {
  return passport.authenticate('jwt', (err: Error | null, user: string, info: any) => {
    if (err) {
      next(err);
    } else if (user) {
      next();
    } else {
      res.status(FORBIDDEN).json({message: USER_REQUIRED});
    }
  })(req, res, next);
};
