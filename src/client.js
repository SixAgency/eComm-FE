import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import routes from './routes/client';
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
  }
};

// Set the container and boostrap the React application
const container = document.getElementById('app');
try {
  ReactDOM.render(
    <App context={context}>
      <Provider store={store}>
        <Router
          history={browserHistory}
          routes={routes}
        />
      </Provider>
    </App>,
    container
  );
} catch (error) {
  console.error(error); // eslint-disable-line no-console
  // Display the error in full-screen for development mode
  if (process.env.NODE_ENV !== 'production') {
    document.title = `Error: ${error.message}`;
    ReactDOM.render(<ErrorReporter error={error} />, container);
  }
}
