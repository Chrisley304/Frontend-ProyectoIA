import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Sidebar} from "./components/Sidebar/Sidebar"
import {Dashboard} from "./pages/Dashboard/Dashboard"
import {PageNotFound} from "./pages/PageNotFound/PageNotFound"
import {ReglasAsociacion} from "./pages/ReglasAsociacion/ReglasAsociacion"

function App() {
    return (
        <BrowserRouter>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/reglas-asociacion" element={<ReglasAsociacion />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
