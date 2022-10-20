import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import API from '../client/utils/api';
import cors from 'cors';

const app = express();
app.disable('x-powered-by');
app.use(cors({ origin: 'http://localhost:3000' })); // TODO: whitelist production host
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(API);

export default app;
