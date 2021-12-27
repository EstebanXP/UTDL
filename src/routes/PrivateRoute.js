import React from 'react'
import { Navigate} from 'react-router-dom';
import Home from '../components/Home';

const PrivateRoute = ({children,redirectTo,auth}) => {
    //const auth=false; aqui se debe usar el context
        return auth ? children: <Navigate to="/login" to={redirectTo}></Navigate>
}
export default PrivateRoute
