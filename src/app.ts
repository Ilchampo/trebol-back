import express from 'express';
import config from './config';

import clientRouter from './routes/client.routes';
import companyRouter from './routes/company.routes';
import documentRouter from './routes/document.routes';
import investorRouter from './routes/investor.routes';
import shareRouter from './routes/share.routes';

const app = express();

app.use(express.json());

app.use('/client', clientRouter);
app.use('/company', companyRouter);
app.use('/document', documentRouter);
app.use('/investor', investorRouter);
app.use('/share', shareRouter);

app.set('port', config.port);

export default app;
