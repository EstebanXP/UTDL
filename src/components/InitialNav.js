import React from "react";
import { NavLink } from "react-router-dom";
import "../css/InitialNav.css";

function InitialNav() {
  return (
    <nav className="navInitial">
      <ul className="list">
        <li>
          <div className="itemContainer">
            <NavLink to="/login" className="item">Log In</NavLink>
          </div>
        </li>
        <li>
          <div className="itemContainer">
            <NavLink to="/register" className="item">Sign Up</NavLink>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default InitialNav;
