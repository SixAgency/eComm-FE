import React from "react"
import { IndexRoute, Route, Link, IndexRedirect, Redirect } from "react-router"

import Layout from "./components/Layout"
import Home from "./components/pages/home/Home"
import Biography from "./components/pages/static/Biography"
import Contact from "./components/pages/static/Contact"

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="biography" component={Biography}></Route>
        <Route path="contact" component={Contact}></Route>
    </Route>
)

export default routes;