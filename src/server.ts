import express, { Express, Response, Request } from 'express';
import { errorLogger, requestLogger } from './middleware/logging';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/health', function (_req: Request, res: Response) {
    res.status(200).end();
});

app.use(errorLogger);

export { app };
