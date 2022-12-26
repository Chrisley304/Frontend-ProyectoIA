import React, { useState } from "react";
import "./NavbarItem.css";
import 'boxicons';
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export const NavbarItem = ({label,link,icon,iconType, setNavCollapse}) =>{
    
    const [active, setActive] = useState(false);
    const isMobile = useMediaQuery("(max-width: 991px)");

    const handleClick = () => {
        if (isMobile) {
            setNavCollapse(false);
        }
    };

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
            onClick={handleClick}
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