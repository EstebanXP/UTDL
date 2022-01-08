import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../css/HomeNav.css";

function HomeNav() {
  return (
    <nav className="navHome">
      <ul className="list">
        <li>
          <div className="itemContainer">
            <NavLink to="/home/all" className="item">
              {" "}
              My Tasks
            </NavLink>
          </div>
        </li>
        <li>
          <NavLink to="/home/notes" className="item">
            My Notes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HomeNav;
