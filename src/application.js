import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";
import store from "./application/store";
import routes from "./application/routes";

const app = document.getElementById('app');

ReactDOM.render(<Provider store={store}>
    <Router history={browserHistory} routes={routes} />
</Provider>, app);