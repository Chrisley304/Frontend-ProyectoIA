import React from "react";
import { User } from "@nextui-org/react";
import imagenChris from "../../assets/img/FondoRocas.png";
import "./Usuario.css"
import "boxicons";

export const Usuario = ({nombreUsuario}) => {
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
                src={imagenChris}
            />
            <box-icon name="chevron-down"></box-icon>
        </div>
    );
};
