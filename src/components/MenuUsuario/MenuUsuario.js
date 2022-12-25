import React from "react";
import "./MenuUsuario.css"
import { Dropdown } from "@nextui-org/react";
import 'boxicons'
import { Usuario } from "../Usuario/Usuario";
import { useNavigate } from "react-router-dom";
import {
    getAuth
} from "firebase/auth";
import { useGlobalState } from "../../App";


export const MenuUsuario = ()=>{
    const auth = getAuth();
    const navigate = useNavigate();
    const [isLogged, setisLogged] = useGlobalState("isLogged");
    // const isLogged = auth.currentUser;

    const nombreCompleto =
        isLogged !== null ? auth.currentUser.displayName : "";
    const profilePicture = isLogged !== null ? auth.currentUser.photoURL : "";

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
            case "history":
                console.log("Historial");
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
                        <Usuario nombreUsuario={nombreCompleto} urlImagen={profilePicture}/>
                    </div>
                </Dropdown.Trigger>
                <Dropdown.Menu selectionMode="single" onAction={seleccionMenu} color="primary" aria-label="User Actions">
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