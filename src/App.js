import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  NavLink
} from "react-router-dom";

// App Components
import authHook   from "./components/auth.hook";
import homeHook   from "./components/home.hook";
import createHook from "./components/create.hook";
import updateHook from "./components/update.hook";
import deleteHook from "./components/delete.hook";
import jobsHook   from "./components/jobs.hook";

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
        > BULK SMASHER </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/create"
        > CREATE </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/update"
        > UPDATE </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/delete"
        > DELETE </NavLink>
        <NavLink
            activeClassName="navbar__link--active"
            className="navbar__link"
            to="/jobs"
        > JOBS </NavLink>
      </nav>

        <Route exact path="/"       component={homeHook}   />
        <Route exact path="/create" component={createHook} />
        <Route exact path="/update" component={updateHook} />
        <Route exact path="/delete" component={deleteHook} />
        <Route exact path="/auth"   component={authHook}   />
        <Route exact path="/jobs"   component={jobsHook}   />
    </Router>
  );
}

export default App;