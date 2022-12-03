import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import { NextUIProvider } from "@nextui-org/react";
import App from './App';
// import useDarkMode from 'use-dark-mode';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// Const to 
// const darkMode = useDarkMode(false);

root.render(
    <StrictMode>
        <NextUIProvider>
            <App />
        </NextUIProvider>
    </StrictMode>
);
