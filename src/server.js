import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import compress from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './pages/Error/ErrorPage';
import errorPageStyle from './pages/Error/ErrorPage.css';
import apiRoutes from './routes/api';
import siteRoutes from './routes/server';
import config from './config';
import logger from './server/logger';

const RedisStore = require('connect-redis')(session);

const app = express();
//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Override console.error to show
// React render errors to error logs
console.error = (error) => {
  logger.error(error);
};

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(compress());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));
app.set('trust proxy', 1);
app.use(session({
  store: new RedisStore({
    host: config[process.env.NODE_ENV].redis.host,
    port: config[process.env.NODE_ENV].redis.port
  }),
  secret: config[process.env.NODE_ENV].redis.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 36000000
  }
}));
app.use((req, res, next) => {
  next();
});
// Register API Endpoints
app.use('/api', apiRoutes);

// Assets
const expiresIn = 7 * 24 * 60 * 60 * 1000;
app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: expiresIn }));
app.use('/', siteRoutes);
//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  res.status(err.status || 500);
  if (process.env.NODE_ENV === 'production') {
    res.redirect('/error');
  } else {
    const headerProps = {
      headerClass: 'colored',
      activeSlug: '/'
    };
    const html = ReactDOM.renderToStaticMarkup(
      <Html
        title="Internal Server Error"
        description={err.message}
        style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
      >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} headerProps={headerProps} />)}
      </Html>,
    );

    res.send(`<!doctype html>${html}`);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
app.listen(config[process.env.NODE_ENV].port, () => {
  console.log(`The server is running at http://localhost:${config[process.env.NODE_ENV].port}/`);
});
/* eslint-enable no-console */
