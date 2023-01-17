import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import API from './utils/api';
import config from './utils/config';

const app = express();
app.disable('x-powered-by');
app.use(cors({ origin: config.isDevelopment ? 'http://localhost:3000' : 'https://elchamuyin.onrender.com' }));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(API);

export default app;
