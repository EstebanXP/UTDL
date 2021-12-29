import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome, we missed you</h1>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
