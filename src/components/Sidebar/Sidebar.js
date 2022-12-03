import React from "react";
import "./Sidebar.css"
import {NavbarItem} from "../NavbarItem/NavbarItem"
import "boxicons"

import logo from "../../assets/img/penguin.png"

export const Sidebar = () =>{
    return (
        <aside className="Sidebar">
            <div className="sidebar-top">
                <div className="sidebar-close">
                    <box-icon name="menu"></box-icon>
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