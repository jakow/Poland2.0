import * as dotenv from 'dotenv';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as fs from 'fs';

export const environment = process.env.NODE_ENV;
// handle case where the server is run with ts-node in development

const isBuild = path.basename(__dirname) === 'build';

export const rootDir = '.';

export const publicDir = path.resolve(rootDir, 'public');

export const buildDir = path.resolve(rootDir, 'build');

export const clientDir = path.join(buildDir, 'client');
// path alias for static folder
export const staticRoot = '/static';
// path alias for client bundle build output
export const clientRoot = '/static/client';

export const staticOptions = {
  cacheControl: true,
  // thanks to cache busting the resources are cacheable with no penalty
  maxAge: '180 days',
};
// export const staticDirs = {
//   public: publicDir,
//   client: isBuild ? path.join('client') : path.join('build', 'client'),
// };

// export const staticDirs = {
// }

export const viewsDir = path.resolve('client', 'views');

const loaded = !!dotenv.config({path: path.join(rootDir, '.env'), silent: true});
if (!loaded) {
  console.info('.env missing. Relying on preset environment variables.');
}

export const port: number =  process.env.OPENSHIFT_NODEJS_PORT || process.env.NODE_ENV === 'staging' ? 5000 :  4000;

export const host: string = process.env.OPENSHIFT_NODEJS_IP || 'localhost';

export const mongo: string = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URI ||
  'mongodb://localhost/poland-20';

export const cookieSecret: string =  process.env.OPENSHIFT_SECRET_TOKEN || process.env.COOKIE_SECRET;

export const cloudinaryUrl: string =  process.env.CLOUDINARY_URL;

export const googleMapsServerKey: string = process.env.GOOGLE_SERVER_KEY;

export const googleMapsBrowserKey: string = process.env.GOOGLE_BROWSER_KEY;

export const trackingId: string = process.env.TRACKING_ID;

export const viewEngine = 'pug';
