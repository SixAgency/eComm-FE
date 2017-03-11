import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'cookie-session';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import compress from 'compression';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './pages/Error/ErrorPage';
import errorPageStyle from './pages/Error/ErrorPage.css';
import apiRoutes from './api/routes';
import siteRoutes from './routes/server';
import { port } from './config';

const app = express();
app.use(compress());
//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
  secret: 'key123456qwerty',
  name: 'ecomm',
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  const headerProps = {
    headerClass: 'colored',
    activeSlug: '/',
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
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});
/* eslint-enable no-console */
