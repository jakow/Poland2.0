import * as nodemailer from 'nodemailer';
import {nodemailerConfig} from '../config';

const transporter = nodemailer.createTransport(nodemailerConfig);

export default transporter;
