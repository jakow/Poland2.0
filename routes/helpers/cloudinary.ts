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
  (img: string, width: number, height: number, options?: TransformationOptions) => string;

export default function imageHelpers(config: CloudinaryConfig) {
  // cloudinary.config(config);

  const functions: {[name: string]: TransformationFunction} = {};
  sizeTransformations.forEach( (t) => {
    functions[t] = (img, width, height, options) => cloudinary.url(basename(img), {width, height, crop: t});
  });
  return functions;
}
