import express, { Express } from 'express';
import { errorLogger, requestLogger } from './middleware/logging';
import { getServerStatus } from './handlers/health';
import { getBoxsore } from './handlers/getBoxscore';
import { mongoInstance } from './utils/mongoInstance';

mongoInstance().catch(function (error) {
    console.error(error);
});

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/health', getServerStatus);
app.get('/v1/boxscore/:id', getBoxsore);

app.use(errorLogger);

export { app };
