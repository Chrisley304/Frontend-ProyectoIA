import React from "react";
import "./MenuUsuario.css"
import { Dropdown, User } from "@nextui-org/react";
import 'boxicons'
import imagenChris from "../../assets/img/FondoRocas.png"

export const MenuUsuario = ()=>{
    return (
        <div className="menu-usuario-box">
            <Dropdown>
                <Dropdown.Trigger>
                    <div className="dropdown-trigger-button">
                        <User
                            zoomed
                            pointer
                            as="button"
                            size="lg"
                            color="primary"
                            name="Christian Leyva"
                            // description="chris@chrisley.dev"
                            src={imagenChris}
                        />
                        <box-icon name="chevron-down"></box-icon>
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