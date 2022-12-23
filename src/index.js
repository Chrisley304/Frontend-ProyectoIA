import React, { Suspense } from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './firebase-config';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// Const to 
// const darkMode = useDarkMode(false);


root.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Suspense><App /></Suspense>
    </FirebaseAppProvider>
);
