import React from 'react'
import {Navigate, useLocation} from 'react-router-dom';
import useAuth from '../auth/useAuth';

function RequireAuth({children}) {
    const {authed}=useAuth();
    const location =useLocation();

    return authed === true ? children : <Navigate to="/login" replace state={{path:location.pathname}}></Navigate>
}

export default RequireAuth
