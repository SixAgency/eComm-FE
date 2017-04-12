import React from 'react';
import ReactDOM from 'react-dom/server';

// Top Level Components
import Layout from '../../components/Layout';
import App from '../../components/App';
import Html from '../../components/Html';
import ErrorPageWrapper from '../../pages/Error';
import NotFoundWrapper from '../../pages/NotFound';
/* eslint-disable import/no-unresolved */
import assets from './assets.json';
/* eslint-enable import/no-unresolved */

import logger from '../logger';

function render(req, resp, next, params) {
  try {
    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      }
    };

    const data = { ...params };
    // Cart will be loaded async
    const cart = { isLoaded: false, isEmpty: true, cart: {} };
    const headerProps = {
      headerClass: data.header,
      activeSlug: data.active
    };
    data.component = (
      <Layout headerProps={headerProps} cartItems={cart}>
        {data.content}
      </Layout>
    );
    data.children = ReactDOM.renderToString(<App context={context}>{data.component}</App>);
    data.style = [...css].join('');
    data.scripts = [
      assets.vendor.js,
      assets.client.js
    ];
    if (assets[params.chunk]) {
      data.scripts.push(assets[params.chunk].js);
    }
    const html = ReactDOM.renderToString(<Html {...data} />);
    resp.status(params.status || 200);
    resp.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
}

function error(req, resp, next, err) {
  logger.error(err);
  const params = {
    title: 'Error',
    description: '',
    header: 'default',
    active: '/',
    content: <ErrorPageWrapper />
  };
  return render(req, resp, next, params);
}

function notFound(req, resp, next) {
  const params = {
    title: 'Not Found',
    description: '',
    header: 'default',
    active: '/',
    content: <NotFoundWrapper />
  };
  return render(req, resp, next, params);
}


export { render, error, notFound };
