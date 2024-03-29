import React, { useEffect, useState } from "react";
import "./MenuUsuario.css";
import { Dropdown } from "@nextui-org/react";
import "boxicons";
import { Usuario } from "../Usuario/Usuario";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../App";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../firebase-config";

export const MenuUsuario = () => {
    const auth = getAuth();
    const user = useAuth();
    const navigate = useNavigate();
    const [isLogged, setisLogged] = useGlobalState("isLogged");
    // const isLogged = auth.currentUser;
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        if (user) {
            setNombreCompleto(user.displayName);
            setPhotoURL(user.photoURL);
        }
    }, [user]);

    const cerrarSesion = () => {
        auth.signOut();
        window.localStorage.setItem("userIsLogged", false);
        setisLogged(false);
        navigate("/login");
    };

    const seleccionMenu = (key) => {
        switch (key) {
            case "edit_profile":
                console.log("Editar perfil");
                break;
            case "help":
                console.log("Ayuda");
                break;
            case "logout":
                cerrarSesion();
                break;
            default:
                break;
        }
    };

    return (
        <div className="menu-usuario-box">
            <Dropdown>
                <Dropdown.Trigger>
                    <div className="dropdown-trigger-button">
                        <Usuario
                            nombreUsuario={nombreCompleto}
                            urlImagen={photoURL}
                        />
                    </div>
                </Dropdown.Trigger>
                <Dropdown.Menu
                    selectionMode="single"
                    onAction={seleccionMenu}
                    color="primary"
                    aria-label="User Actions"
                >
                    <Dropdown.Item key="edit_profile">
                        Editar perfil
                    </Dropdown.Item>
                    <Dropdown.Item key="help">Ayuda</Dropdown.Item>
                    <Dropdown.Item key="logout" color="error" withDivider>
                        Cerrar sesión
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};
