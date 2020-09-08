import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// App Components
import homeHook from "./components/home.hook";
import uploadHook from "./components/upload.hook";
import replaceHook from "./components/replace.hook";
import deleteHook from "./components/delete.hook";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.jpg";

function App() {
  return (
    <Router>
      <div className="container">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src={logo} width="80" height="80" alt="Uberflip Hulk" />
            </a>
            <Link to="/" className="navbar-brand">Bulk Smasher</Link>
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

          <Route path="/" exact component={homeHook} />
          <Route path="/upload" component={uploadHook} />
          <Route path="/replace" component={replaceHook} />
          <Route path="/delete" component={deleteHook} />
      </div>
    </Router>
  );
}

export default App;