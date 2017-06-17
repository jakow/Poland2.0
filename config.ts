import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

export const environment = process.env.NODE_ENV;
// handle case where the server is run with ts-node in development

const isBuild = path.basename(__dirname) === 'build';

export const rootDir = '.';

export const buildDir = path.resolve(rootDir, 'build');

export const publicDir = isBuild ? path.join('..', 'public') : 'public';

export const staticDirs: string[] = [
  publicDir,
  isBuild ? path.join('client') : path.join('build', 'client'),
];

export const viewsDir = path.resolve('client', 'views');

const loaded = !!dotenv.config({path: path.join(rootDir, '.env'), silent: true});
if (!loaded) {
  console.info('.env missing. Relying on preset environment variables.');
}

export const port: number =  process.env.OPENSHIFT_NODEJS_PORT || 4000;

export const host: string = process.env.OPENSHIFT_NODEJS_IP || 'localhost';

export const mongo: string =  process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URI ||
  'mongodb://localhost/poland-20';

export const cookieSecret: string =  process.env.OPENSHIFT_SECRET_TOKEN || process.env.COOKIE_SECRET;

export const cloudinaryUrl: string =  process.env.CLOUDINARY_URL;

export const googleMapsServerKey: string = process.env.GOOGLE_SERVER_KEY;

export const googleMapsBrowserKey: string = process.env.GOOGLE_BROWSER_KEY;

export const trackingId: string = process.env.TRACKING_ID;

export const viewEngine = 'pug';
