import React, { useState, useEffect } from "react";
import useDarkMode from "use-dark-mode";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Sidebar} from "./components/Sidebar/Sidebar"
import {Dashboard} from "./pages/Dashboard/Dashboard"
import {PageNotFound} from "./pages/PageNotFound/PageNotFound"
import {ReglasAsociacion} from "./pages/ReglasAsociacion/ReglasAsociacion"
import { MetricasDistancia } from "./pages/MetricasDistancia/MetricasDistancia";
import { Clustering } from "./pages/Clustering/Clustering";
import { Configuracion } from "./pages/Configuracion/Configuracion";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { Registro } from "./pages/Registro/Registro";
import { Footer } from "./components/Footer/Footer";
import { Login } from "./pages/Login/Login";
import { createGlobalState } from "react-hooks-global-state";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { getAuth } from "firebase/auth";
import { AuthProvider, useFirebaseApp } from "reactfire";


const lightTheme = createTheme({
    type: "light", // it could be "light" or "dark"
    theme: {
        colors: {
            // brand colors
            primaryLight: "$blue200",
            primaryLightHover: "$blue300", // commonly used on hover state
            primaryLightActive: "$blue400", // commonly used on pressed state
            primaryLightContrast: "$blue600", // commonly used for text inside the component
            primary: "#6532FF",
            primaryBorder: "$blue500",
            primaryBorderHover: "$blue600",
            primarySolidHover: "$blue700",
            primarySolidContrast: "$white", // commonly used for text inside the component
            primaryShadow: "$blue500",
            background: "#F8F9FC",
            sidebar: "#FFFFFF",
            hover: "#F4F0FF",
            inactivo: "#8D8D8D",
            text: "#000000"
        },
        space: {},
        fonts: {},
    },
});

const darkTheme = createTheme({
    type: "dark", // it could be "light" or "dark"
    theme: {
        colors: {
            // brand colors
            primaryLight: "$blue200",
            primaryLightHover: "$blue300",
            primaryLightActive: "$blue400",
            primaryLightContrast: "$blue600",
            primary: "#6532FF",
            primaryBorder: "$blue500",
            primaryBorderHover: "$blue600",
            primarySolidHover: "$blue700",
            primaryShadow: "$blue500",
            background: "#121212",
            sidebar: "#000000",
            hover: "#ded9e9",
            inactivo: "#8D8D8D",
            text: "#FFF",

            gradient:
                "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
            link: "#5E1DAD",
        },
        space: {},
        fonts: {},
    },
});

export const { useGlobalState } = createGlobalState({
    navBarCollapsed: false,
    isLogged: false,
});

function App() {
    const [isLogged, setisLogged] = useGlobalState("isLogged");
    const [navBarCollapsed, setNavBarCollapsed] = useGlobalState("navBarCollapsed");
    const firebase = useFirebaseApp();
    const auth = getAuth(firebase);
    const darkMode = useDarkMode(false);
    useEffect(() => {
        const loggedData = window.localStorage.getItem("userIsLogged");
        const collapsedData = window.localStorage.getItem("navbarCollapse");
        if (loggedData != null) {
            setisLogged("true" === loggedData);
        }
        if (collapsedData != null) {
            setNavBarCollapsed("true" === collapsedData);
        }
    }, []);

    if (darkMode.value) {
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", "#121212");
    }else{
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", "#F8F9FC");
    }

    return (
        <AuthProvider sdk={auth}>
            <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
                <BrowserRouter>
                    {isLogged && <Sidebar />}
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isLogged ? (
                                    <Navigate to="/dashboard" />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute forlogin={false}>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/reglas-asociacion"
                            element={
                                <PrivateRoute forlogin={false}>
                                    <ReglasAsociacion />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/metricas-distancia"
                            element={
                                <PrivateRoute forlogin={false}>
                                    <MetricasDistancia />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/clustering" element={<PrivateRoute><Clustering /></PrivateRoute>} />
                        <Route path="/configuracion" element={<PrivateRoute><Configuracion /></PrivateRoute>} />
                        <Route path="/login" element={<PrivateRoute forlogin={true}><Login /></PrivateRoute>} />
                        <Route path="/registro" element={<PrivateRoute forlogin={true}><Registro /></PrivateRoute>} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                    {isLogged && <Footer />}
                </BrowserRouter>
            </NextUIProvider>
        </AuthProvider>
    );
}

export default App;
