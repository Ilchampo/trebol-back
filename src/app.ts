import express from 'express';
import config from './config';

import clientRouter from './routes/client.routes';
import companyRouter from './routes/company.routes';
import fileRouter from './routes/file.routes';
import investor from './routes/investor.routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/clients', clientRouter);
app.use('/companies', companyRouter);
app.use('/files', fileRouter);
app.use('/investors', investor);

app.set('port', config.port);

export default app;
