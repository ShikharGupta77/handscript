import React from "react";
import "./App.css";
import { BrowserRouter, Link } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import logo from "./assets/logo.png";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="nav">
                    <div className="nav__logo">
                        <a href="/">
                            <img
                                className="nav__img"
                                src={logo}
                                alt="HandScript"
                            />
                        </a>
                        <a href="/">
                            <h1>HandScript</h1>
                        </a>
                    </div>
                    <div className="nav__links">
                        <div>
                            <Link to="/">Home</Link>
                        </div>
                        <div>
                            <Link to="/about">About</Link>
                        </div>
                        <div>
                            <Link to="/learn">Learn</Link>
                        </div>
                        <div>
                            <Link to="/translate">Translate</Link>
                        </div>
                        <div>
                            <Link to="/development">Development</Link>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <AppRoutes />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
