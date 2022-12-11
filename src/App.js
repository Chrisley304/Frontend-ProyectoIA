import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Sidebar} from "./components/Sidebar/Sidebar"
import {Dashboard} from "./pages/Dashboard/Dashboard"
import {PageNotFound} from "./pages/PageNotFound/PageNotFound"
import {ReglasAsociacion} from "./pages/ReglasAsociacion/ReglasAsociacion"
import { createGlobalState } from "react-hooks-global-state";
import { MetricasDistancia } from "./pages/MetricasDistancia/MetricasDistancia";
import { Clustering } from "./pages/Clustering/Clustering";
import { Configuracion } from "./pages/Configuracion/Configuracion";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { Footer } from "./components/Footer/Footer";
import useDarkMode from "use-dark-mode";

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
    navBarCollapsed: false
});

function App() {

    const darkMode = useDarkMode(false);

    return (
        <NextUIProvider
        theme={darkMode.value? darkTheme: lightTheme}
    >
        <BrowserRouter>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                    path="/reglas-asociacion"
                    element={<ReglasAsociacion />}
                />
                <Route
                    path="/metricas-distancia"
                    element={<MetricasDistancia />}
                />
                <Route
                    path="/clustering"
                    element={<Clustering />}
                />
                <Route
                    path="/configuracion"
                    element={<Configuracion />}
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    </NextUIProvider>
    );
}

export default App;
