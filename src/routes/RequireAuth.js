import React from 'react'
import {Navigate, useLocation, useLocation} from 'react-router-dom';

function RequireAuth({children}) {
    const {authed}=true;
    const useLocation =useLocation();

    return authed === true ? children : <Navigate to="/login" replace state={{path:location.pathname}}></Navigate>
}

export default RequireAuth
