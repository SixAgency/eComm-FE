import React from "react"
import { Link } from "react-router"

export default class Header extends React.Component {
    render() {
       return (
        <div>
        <h1>Header1</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/biography">Biography</Link></li>
        </ul>
        </div>
       )
    }
}