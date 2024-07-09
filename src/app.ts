import express from 'express';
import config from './config';

import clientRouter from './routes/client.routes';

const app = express();

app.use(express.json());

app.use('/client', clientRouter);

app.set('port', config.port);

export default app;
