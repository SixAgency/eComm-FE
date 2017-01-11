import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import routes from './routes/client_update';
import App from './components/App';
import { ErrorReporter } from './core/devUtils';

// Global (context) variables that can be easily accessed from any React component
// https://facebook.github.io/react/docs/context.html
const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
};

function updateTag(tagName, keyName, keyValue, attrName, attrValue) {
  const node = document.head.querySelector(`${tagName}[${keyName}="${keyValue}"]`);
  if (node && node.getAttribute(attrName) === attrValue) return;

  // Remove and create a new tag in order to make it work with bookmarks in Safari
  if (node) {
    node.parentNode.removeChild(node);
  }
  if (typeof attrValue === 'string') {
    const nextNode = document.createElement(tagName);
    nextNode.setAttribute(keyName, keyValue);
    nextNode.setAttribute(attrName, attrValue);
    document.head.appendChild(nextNode);
  }
}
function updateMeta(name, content) {
  updateTag('meta', 'name', name, 'content', content);
}
function updateCustomMeta(property, content) { // eslint-disable-line no-unused-vars
  updateTag('meta', 'property', property, 'content', content);
}
function updateLink(rel, href) { // eslint-disable-line no-unused-vars
  updateTag('link', 'rel', rel, 'href', href);
}

// Switch off the native scroll restoration behavior and handle it manually
// https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
// const scrollPositionsHistory = {};
// if (window.history && 'scrollRestoration' in window.history) {
//   window.history.scrollRestoration = 'manual';
// }

let onRenderComplete = function initialRenderComplete() {
  const elem = document.getElementById('css');
  if (elem) elem.parentNode.removeChild(elem);
  onRenderComplete = function renderComplete() {
    // Update necessary tags in <head> at runtime here, ie:
    // updateMeta('keywords', route.keywords);
    // updateCustomMeta('og:url', route.canonicalUrl);
    // updateCustomMeta('og:image', route.imageUrl);
    // updateLink('canonical', route.canonicalUrl);
    // etc.
    // document.title = route.title;
    // updateMeta('description', route.description);

    // Scroll to top of the page
    window.scrollTo(0, 0);

    // // Google Analytics tracking. Don't send 'pageview' event after
    // // the initial rendering, as it was already sent
    // if (window.ga) {
    //   window.ga('send', 'pageview', createPath(location));
    // }
  };
};

// Make taps on links and buttons work fast on mobiles
// FastClick.attach(document.body);
const container = document.getElementById('app');

try {
  const t0 = performance.now();
  ReactDOM.render(
    <App context={context}>
      <Provider store={store}>
        <Router
          history={browserHistory}
          routes={routes}
        />
      </Provider>
    </App>,
    container,
    () => onRenderComplete(),
  );
  const t1 = performance.now();
  console.log(`TIME: ${(t1 - t0)}  milliseconds.`); // eslint-disable-line no-console
} catch (error) {
  console.error(error); // eslint-disable-line no-console
  // Display the error in full-screen for development mode
  if (process.env.NODE_ENV !== 'production') {
    document.title = `Error: ${error.message}`;
    ReactDOM.render(<ErrorReporter error={error} />, container);
  }

  // Avoid broken navigation in production mode by a full page reload on error
  // window.location.reload();
}
