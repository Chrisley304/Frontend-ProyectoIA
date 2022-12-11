import React, { useState } from "react";
import "./NavbarItem.css";
import 'boxicons';
import { NavLink } from "react-router-dom";

export const NavbarItem = ({label,link,icon,iconType}) =>{
    
    const [active, setActive] = useState(false);

    return (
        <NavLink
            to={link}
            className={({ isActive }) => {
                setActive(isActive);
                if (isActive) {
                    return "active navbar-item-box navbar-item-link";
                } else {
                    return "navbar-item-box navbar-item-link";
                }
            }}
        >
            <box-icon
                type={iconType}
                name={icon}
                size="25px"
                color={active ? "white" : "var(--nextui-colors-inactivo)"}
            ></box-icon>
            <span className="nav-item-label">{label}</span>
        </NavLink>
    );
}