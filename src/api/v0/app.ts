import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import { Logger } from './utilities';
import { apiBasePath } from './configs';
import { errorHandlingMiddleware } from './middlewares';
import { apiRoutes, defaultRouteHandler } from './routes';

class App {
  private port: number;
  private app: express.Application;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.initializeMiddlewares();
    this.initializeHttpSecurityHeader();
    this.initializeRoutes();
    this.initializeErrorMiddleware();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
  }

  private initializeHttpSecurityHeader(): void {
    this.app.use(helmet());
    this.app.disable('x-powered-by');
  }

  private initializeRoutes(): void {
    this.app.use(apiBasePath, apiRoutes);
    this.app.use('/*', defaultRouteHandler);
  }

  private initializeErrorMiddleware(): void {
    this.app.use(errorHandlingMiddleware);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      Logger.info(`APP: app is listening on the port: ${this.port}.`);
    });
  }
}

export default App;