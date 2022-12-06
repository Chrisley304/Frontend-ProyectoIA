import React from "react";
import "./Sidebar.css"
import {NavbarItem} from "../NavbarItem/NavbarItem"
import { Button } from "@nextui-org/react";
import "boxicons"
import logo from "../../assets/img/logoIA.png"
import { useGlobalState } from "../../App";
import { NavLink } from "react-router-dom";

export const Sidebar = () =>{

    const [navBarCollapsed, setNavBarCollapsed] =
        useGlobalState("navBarCollapsed");
        
    const handleNavbarCollapse = () => {
        // console.log(navBarCollapsed);
        setNavBarCollapsed(!navBarCollapsed);
    };

    return (
        <aside className={navBarCollapsed ? "Sidebar collapsed" : "Sidebar"}>
            <div className="sidebar-top">
                <div className="sidebar-close">
                    <Button
                        auto
                        flat
                        color="principal"
                        icon={<box-icon name="menu" />}
                        onPress={handleNavbarCollapse}
                    />
                </div>
                <div className="sidebar-logo">
                    <img alt="Logo" src={logo} />
                    <span>Proyecto IA</span>
                </div>
            </div>
            <div className="sidebar-content">
                <ul>
                    <li>
                        <NavbarItem
                            label="Dashboard"
                            icon="dashboard"
                            iconType="solid"
                            link="/"
                        />
                    </li>
                    <li>
                        <NavbarItem
                            label="Reglas de asociación"
                            icon="group"
                            iconType="solid"
                            link="/reglas-asociacion"
                        />
                    </li>
                    <li>
                        <NavbarItem
                            link="/metricas-distancia"
                            label="Métricas de distancia"
                            icon="ruler"
                            iconType="solid"
                        />
                    </li>
                    <li>
                        <NavbarItem
                            link="/clustering"
                            label="Clustering"
                            icon="objects-vertical-bottom"
                            iconType="solid"
                        />
                    </li>
                    <li>
                        <NavbarItem
                            link="/configuracion"
                            label="Configuración"
                            icon="cog"
                            iconType="solid"
                        />
                    </li>
                </ul>
            </div>
        </aside>
    );
}