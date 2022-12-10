import React from "react";
import "./MenuUsuario.css"
import { Dropdown } from "@nextui-org/react";
import 'boxicons'
import { Usuario } from "../Usuario/Usuario";

export const MenuUsuario = ()=>{
    return (
        <div className="menu-usuario-box">
            <Dropdown>
                <Dropdown.Trigger>
                    <div className="dropdown-trigger-button">
                        <Usuario nombreUsuario={"Christian Leyva"}/>
                    </div>
                </Dropdown.Trigger>
                <Dropdown.Menu color="primary" aria-label="User Actions">
                    <Dropdown.Item key="edit_profile">
                        Editar perfil
                    </Dropdown.Item>
                    <Dropdown.Item key="history">Historial</Dropdown.Item>
                    <Dropdown.Item key="help">Ayuda</Dropdown.Item>
                    <Dropdown.Item key="logout" color="error" withDivider>
                        Cerrar sesión
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}