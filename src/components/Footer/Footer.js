import React from "react";
import "./Footer.css";
import { useGlobalState } from "../../App";

export const Footer = () => {
    const [navBarCollapsed] = useGlobalState("navBarCollapsed");
    return (
        <footer
            className={
                navBarCollapsed
                    ? "footer-container side-bar-collapsed"
                    : "footer-container"
            }
        >
            Made with ❤️ by <a href="https://chrisley.dev/" target="_blank" rel="noreferrer">Christian Leyva</a> | Last Update: Dec 2022
        </footer>
    );
};
