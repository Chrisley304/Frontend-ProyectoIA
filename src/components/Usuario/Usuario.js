import React from "react";
import { User } from "@nextui-org/react";
import imagenChris from "../../assets/img/FondoRocas.png";
import "./Usuario.css"
import "boxicons";

export const Usuario = ({nombreUsuario, urlImagen}) => {

    return (
        <div className="usuario-container">
            <span className="nombre-usuario-menu">{nombreUsuario}</span>
            <User
                zoomed
                pointer
                as="button"
                size="lg"
                color="primary"
                // description="chris@chrisley.dev"
                src={urlImagen}
            />
            <box-icon
                name="chevron-down"
                color={"var(--nextui-colors-text)"}
            ></box-icon>
        </div>
    );
};
