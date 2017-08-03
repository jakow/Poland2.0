import {basename} from 'path';
import {CloudinaryConfig} from 'keystone';
const cloudinary: any = require('cloudinary');
const sizeTransformations = [
  'fit',
  'limit',
  'mfit',
  'lfill',
  'pad',
  'lpad',
  'mpad',
  'crop',
  'thumb',
];

export interface TransformationOptions {
  [key: string]: string;
}

export type TransformationFunction =
  (img: string, width?: number, height?: number, options?: TransformationOptions) => string;

/**
 * Define the image helpers by creating a function for each of defined transformations in sizeTransformations
 * IMPORTANT: Assumes that cloudinary.config() was called
 */
export default function imageHelpers() {
  // cloudinary.config(config);
  const functions: {[name: string]: TransformationFunction} = {};
  sizeTransformations.forEach( (t) => {
    functions[t] = (img, width, height, options) => cloudinary.url(basename(img), {
      width, height, crop: t, secure: true,
    });
  });
  return functions;
}
