import * as dotenv from 'dotenv';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as fs from 'fs';

export const environment = process.env.NODE_ENV || 'development';
// handle case where the server is run with ts-node in development

const isBuild = path.basename(__dirname) === 'build';

export const rootDir = '.';

export const staticDir = path.resolve(rootDir, 'static');

export const buildDir = path.resolve(rootDir, 'build');

export const clientDir = path.join(buildDir, 'client');
// path alias for static folder
export const staticRoot = '/static';
// path alias for client bundle build output
export const clientRoot = '/static/client';

export const staticOptions = {
  cacheControl: true,
  // thanks to webpack cache busting the js/css assets are cacheable with no penalty
  maxAge: '365 days',
};

export const viewsDir = path.resolve('client', 'views');

const loaded = !!dotenv.config({path: path.join(rootDir, '.env'), silent: true});
if (!loaded) {
  console.warn('.env missing. Relying on preset environment variables.');
}

export const canonicalUrl: string = 'https://poland20.com';

export const logoUrl: string = 'https://poland20.com/static/images/logo.svg';

export const port: number =  process.env.OPENSHIFT_NODEJS_PORT || 4000;

export const host: string = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

export const mongo: string = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URI ||
  'mongodb://localhost/poland-20';

export const cookieSecret: string =  process.env.OPENSHIFT_SECRET_TOKEN || process.env.COOKIE_SECRET;

export const cloudinaryUrl: string =  process.env.CLOUDINARY_URL;

export const googleMapsServerKey: string = process.env.GOOGLE_SERVER_KEY;

export const googleMapsBrowserKey: string = process.env.GOOGLE_BROWSER_KEY;

export const trackingId: string = process.env.TRACKING_ID;

export const viewEngine = 'pug';

export const notificationEmail = process.env.EMAIL_USERNAME;

export const nodemailerConfig = {
  // host: process.env.EMAIL_HOST,
  // port: process.env.EMAIL_PORT,
  // secure: true,
  service: 'Zoho',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export const targetEmail = process.env.TARGET_EMAIL;
