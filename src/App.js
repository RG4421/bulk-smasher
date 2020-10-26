import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  NavLink
} from "react-router-dom";

// App Components
import homeHook   from "./components/home.hook";
import createHook from "./components/create.hook";
import updateHook from "./components/update.hook";
import deleteHook from "./components/delete.hook";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/navbar.css";
import logo from "./images/logo.png";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          <img src={logo} width="80" height="80" alt="Uberflip Hulk" />
        </a>
        <NavLink
            exact
            activeClassName="navbar__link--active"
            className="navbar__link navbar-brand"
            to="/"
        > Bulk Smasher </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/create"
        > Create </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/update"
        > Update </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/delete"
        > Delete </NavLink>
      </nav>

        <Route path="/" exact component={homeHook} />
        <Route path="/create" component={createHook} />
        <Route path="/update" component={updateHook} />
        <Route path="/delete" component={deleteHook} />
    </Router>
  );
}

export default App;