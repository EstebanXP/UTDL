import { getAuth } from "firebase/auth";
import React from "react";
import { Outlet } from "react-router-dom";
import AddItem from "../components/AddItem";
import HomeNav from "../components/HomeNav";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="home">
      <HomeNav />
      <div className="botonAdd">
        
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
