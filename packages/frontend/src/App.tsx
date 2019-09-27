import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Home } from "./Home";
import { AlertContainer } from "./components/AlertContainer";

export default function App() {

    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light r-auto bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">Fuse Starter TypeScript</li>
                    </ul>

                </nav>
                <AlertContainer />
                <div className="container mt-2">
                    <Route exact path="/" render={props => <Home />} />
                </div>

            </div>
        </Router>


    )
}