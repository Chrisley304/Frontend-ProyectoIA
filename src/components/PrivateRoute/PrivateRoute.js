import React  from 'react';
import {Navigate} from "react-router-dom";

export const PrivateRoute = ({children}) => {
    var isLogged = window.localStorage.getItem("userIsLogged");
    if (isLogged != null) {
        isLogged = ("true" === isLogged);
    }

    return isLogged? children: <Navigate to="/login" />;
};