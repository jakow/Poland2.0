import {Router, RequestHandler} from 'express';
import * as moment from 'moment';
import {IncomingMessage} from 'http';
import * as passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt, VerifiedCallback} from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import {list, session} from 'keystone';
import {cookieSecret} from '../../config';
import {User, UserDocument} from '../../models/User';
import {FORBIDDEN} from 'http-status-codes';

const USER_REQUIRED = 'You must be logged in for this action.';
/*
* JWT based application login
*/

async function passportVerfiy(payload: any, done: VerifiedCallback) {
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
}, passportVerfiy);

const verifyOptions: jwt.VerifyOptions = {
  // issuer: 'poland20.com',
};

const signOptions: jwt.SignOptions = Object.assign({}, verifyOptions, {
  expiresIn: moment.duration(4, 'hours').asSeconds(),
});

export function initialize() {
  passport.use(strategy);
  return passport.initialize();
}

/* helpers */
export function createUserToken(user: UserDocument) {
  const payload = {
    id: user._id,
  };
  const token =  jwt.sign(payload, cookieSecret, signOptions);
  const expires = moment.utc(Date.now()).add(signOptions.expiresIn, 's').toISOString();
  return {token, expires};
}

export async function verify(payload: any) {
  try {
    const decoded = jwt.verify(payload, cookieSecret, verifyOptions) as any;
    const user = await list<User>('User').model.findById(decoded.id).exec();
    return {decoded, user};
  } catch (e) {
    return false;
  }
}
/* Middleware functions */

export const authenticateWihoutRedirect: RequestHandler = (req, res, next) => {
  return passport.authenticate('jwt', async (err: Error | null, user: UserDocument, info: any) => {
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

interface SocketIoAuthOptions {
  secret: string;
  timeout?: number;
  required?: boolean;
}

interface SocketIoAuthObject {
  token: string;
}

interface AuthenticatedSocket extends SocketIO.Socket {
  authenticated: boolean;
  authData: {
    token: string;
    expires: Date;
    user: UserDocument;
  };
}

export function socketioAuth(options: SocketIoAuthOptions) {
  const token = options.secret;

  if (!token) {
    throw new Error('Token is required');
  }

  const deadline = options.timeout || 10000;
  const room = 'authenticated';
  const required = options.required || true;

  return (socket: AuthenticatedSocket, next: (err?: any) => void) => {
    let timeout: NodeJS.Timer;
    if (required) {
      timeout = disconnectIfNotAuthenticated(socket, deadline);
    }

    socket.on('authenticate', async (auth: SocketIoAuthObject) => {
      clearTimeout(timeout);
      const data = await verify(auth.token);
      if (data) {
        const {decoded, user} = data;
        socket.authenticated = true;
        socket.authData = {
          token,
          user,
          expires: decoded.expiresIn,
        };
        console.log(`Socket ${socket.id} authenticated succesfully`);
        socket.emit('authenticated', {user, expires: decoded.expiresIn});
        socket.join(room);
      } else {
        timeout = disconnectIfNotAuthenticated(socket, deadline);
        socket.emit('not authenticated');
      }
    });
    next();
  };
}

function disconnectIfNotAuthenticated(socket: AuthenticatedSocket, deadline: number): NodeJS.Timer {
  return setTimeout(() => {
    if (!socket.authenticated) {
      socket.emit('authentication timeout', {message: 'Timed out'});
      socket.disconnect();
    }
  }, deadline);
}
