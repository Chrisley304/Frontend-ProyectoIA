import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// Const to 
// const darkMode = useDarkMode(false);


root.render(
    <App />
);
