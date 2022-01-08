import { getAuth} from "firebase/auth";
import React, { } from "react";
import { Outlet } from "react-router-dom";
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
