import React from "react";
import "./MenuUsuario.css"
import { Avatar, Dropdown, User, Text } from "@nextui-org/react";

export const MenuUsuario = ()=>{
    return (
        <div className="menu-usuario-box">
            <Dropdown>
                <Dropdown.Trigger>
                    <User
                        zoomed
                        as="button"
                        size="lg"
                        color="primary"
                        name="Christian Leyva"
                        description="chris@chrisley.dev"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    />
                </Dropdown.Trigger>
                <Dropdown.Menu color="primary" aria-label="User Actions">
                    <Dropdown.Item key="edit_profile">
                        Editar perfil
                    </Dropdown.Item>
                    <Dropdown.Item key="history" >
                        Historial
                    </Dropdown.Item>
                    <Dropdown.Item key="help" >
                        Ayuda
                    </Dropdown.Item>
                    <Dropdown.Item key="logout" color="error" withDivider>
                        Cerrar sesión
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}