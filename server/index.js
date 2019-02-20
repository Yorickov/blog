import 'source-map-support/register';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import Router from 'named-routes';
import methodOverride from 'method-override';

import addRoutes from './routes';
import container from './container';

export default () => {
  const app = express();

  const router = new Router();
  const expressRouter = express.Router();
  router.extendExpress(expressRouter);
  router.registerAppHelpers(app);

  app.use(morgan('short'));
  app.use(express.urlencoded({ extended: true }));
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, './views'));
  // app.use('/assets', Express.static(process.env.NODE_PATH.split(':')[0]));

  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(methodOverride('_method'));

  addRoutes(expressRouter, container);
  app.use(expressRouter);

  return app;
};
