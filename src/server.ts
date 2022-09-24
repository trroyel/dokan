import 'dotenv/config'
import path from 'path';
import App from './api/v0/app';
import { port } from './api/v0/configs';
import seedData from './migrations/seed';
import { uncaughtUnhandledErrorHandler } from './api/v0/middlewares';
import { connectToDatabase, connectToRedisServer, createDirectory } from './api/v0/utilities';
import './api/v0/utilities/check-env-variable.util';

const app = new App(port);
const imageDir = path.join('public','images');

(async () => {
   await connectToDatabase();
   await connectToRedisServer();
   await createDirectory(imageDir);
   await seedData();

   app.listen();
})();

process.on('uncaughtException', uncaughtUnhandledErrorHandler);
process.on('unhandledRejection', uncaughtUnhandledErrorHandler);