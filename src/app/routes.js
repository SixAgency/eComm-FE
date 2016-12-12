import React from "react";
import { IndexRoute, Route } from "react-router";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Biography from "./pages/Biography";
import Contact from "./pages/Contact";
import MyAccount from "./pages/MyAccount";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="biography" component={Biography} />
        <Route path="my-account" component={MyAccount} />
        <Route path="product/:productSlug" component={ProductDetails} />
        <Route path="contact" component={Contact} />
        <Route path="cart" component={Cart} />
        <Route path="*" component={NotFound} />
    </Route>
);

export default routes;