import React  from 'react';
import {Navigate} from "react-router-dom";

export const PrivateRoute = ({forlogin,children}) => {
    var isLogged = window.localStorage.getItem("userIsLogged");
    if (isLogged != null) {
        isLogged = ("true" === isLogged);
    }

    return !forlogin? isLogged? children: <Navigate to="/login" />: isLogged? <Navigate to="/dashboard" />: children;
};