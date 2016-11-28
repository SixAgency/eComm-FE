import React from "react";
import ReactDOM from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";
import store from "./app/store";
import routes from "./app/routes";

const app = document.getElementById('app');

ReactDOM.render(<Provider store={store}>
    <Router history={browserHistory} routes={routes} />
</Provider>, app);