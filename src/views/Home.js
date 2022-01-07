import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import AddItem from "../components/AddItem";
import HomeNav from "../components/HomeNav";

const Home = () => {
  return (
    <div>
      <HomeNav />
        <div className="botonAdd">
          <AddItem></AddItem>
        </div>
        <div>
          <Outlet></Outlet>
        </div>
    </div>
  );
};

export default Home;
