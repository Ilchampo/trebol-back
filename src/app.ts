import express from 'express';
import cors from 'cors';
import config from './config';

import clientRouter from './routes/client.routes';
import companyRouter from './routes/company.routes';
import fileRouter from './routes/file.routes';
import investorRouter from './routes/investor.routes';

import invalidCodes from './constants/invalidCodes';
import httpCodes from './constants/httpCodes';

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/clients', clientRouter);
app.use('/companies', companyRouter);
app.use('/files', fileRouter);
app.use('/investors', investorRouter);

app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        console.error(err.stack);
        res.status(httpCodes.INTERNAL_SERVER_ERROR).send(
            invalidCodes.SOMETHING_BROKEN,
        );
    },
);

app.set('port', config.port);

export default app;
