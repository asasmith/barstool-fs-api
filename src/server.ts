import express, { Express } from 'express';
import { errorLogger, requestLogger } from './middleware/logging';
import { getServerStatus } from './handlers/health';
import { getBoxsore } from './handlers/getBoxscore';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/health', getServerStatus);
app.use('/v1/boxscore/:id', getBoxsore);

app.use(errorLogger);

export { app };
