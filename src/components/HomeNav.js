import React from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../css/HomeNav.css";

function HomeNav() {
  return (
    <nav className="navHome">
      <ul className="list">
        <li className="item">
          <NavLink to="/home/all">
            {" "}
            <Button variant="light" size="lg">
              My Tasks
            </Button>
          </NavLink>
        </li>
        <li className="item">
          <NavLink to="/home/notes">
            <Button variant="light" size="lg">
              My Notes
            </Button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HomeNav;
