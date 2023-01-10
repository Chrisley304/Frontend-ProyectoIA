import React, { useEffect } from "react";
import "./Sidebar.css";
import { NavbarItem } from "../NavbarItem/NavbarItem";
import { Button } from "@nextui-org/react";
import "boxicons";
import logo from "../../assets/img/logoIA.png";
import { useGlobalState } from "../../App";

export const Sidebar = () => {
    const [navBarCollapsed, setNavBarCollapsed] =
        useGlobalState("navBarCollapsed");

    useEffect(() => {
        window.localStorage.setItem("navbarCollapse", navBarCollapsed);
    }, [navBarCollapsed]);

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
                    <span>Algorithmia</span>
                </div>
            </div>
            <div className="sidebar-content">
                <ul>
                    <li>
                        <NavbarItem
                            label="Inicio"
                            icon="home"
                            iconType="solid"
                            link="/inicio"
                            setNavCollapse={setNavBarCollapsed}
                        />
                    </li>
                    <li>
                        <NavbarItem
                            label="Reglas de asociación"
                            icon="group"
                            iconType="solid"
                            link="/reglas-asociacion"
                            setNavCollapse={setNavBarCollapsed}
                        />
                    </li>
                    <li>
                        <NavbarItem
                            link="/metricas-distancia"
                            label="Métricas de distancia"
                            icon="ruler"
                            iconType="solid"
                            setNavCollapse={setNavBarCollapsed}
                        />
                    </li>
                    <li>
                        <NavbarItem
                            link="/clustering"
                            label="Clustering"
                            icon="objects-vertical-bottom"
                            iconType="solid"
                            setNavCollapse={setNavBarCollapsed}
                        />
                    </li>
                    <li>
                        <NavbarItem
                            link="/clasificacion-logistica"
                            label="Clasificación Logística"
                            icon="category-alt"
                            iconType="solid"
                            setNavCollapse={setNavBarCollapsed}
                        />
                    </li>
                    <li>
                        <NavbarItem
                            link="/arboles"
                            label="Árboles y Bosques"
                            icon="tree"
                            iconType="solid"
                            setNavCollapse={setNavBarCollapsed}
                        />
                    </li>
                </ul>
            </div>
        </aside>
    );
};
