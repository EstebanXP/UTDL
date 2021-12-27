import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import InitialNav from "./InitialNav";

function InitialPage() {
  return (
    <div>
      <h1>Welcome to Ultimate To-Do list</h1>
      <InitialNav></InitialNav>
      <Fragment>
        <Outlet></Outlet>
      </Fragment>
    </div>
  );
}

export default InitialPage;
