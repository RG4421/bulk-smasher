import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// App Components
import home from "./hooks/home";
import upload from "./hooks/upload";
import replace from "./hooks/replace";
import testdelete from "./hooks/delete";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";

function App() {
  return (
    <Router>
      <div className="container">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src={logo} width="30" height="30" alt="Uberflip" />
            </a>
            <Link to="/" className="navbar-brand">Bulk Buster</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/upload" className="nav-link">Upload</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/replace" className="nav-link">Replace</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/delete" className="nav-link">Delete</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>

          <Route path="/" exact component={home} />
          <Route path="/upload" component={upload} />
          <Route path="/replace" component={replace} />
          <Route path="/delete" component={testdelete} />
      </div>
    </Router>
  );
}

export default App;