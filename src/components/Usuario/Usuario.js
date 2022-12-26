import React, {useEffect, useState} from "react";
import { User, useTheme } from "@nextui-org/react";
import imagenChris from "../../assets/img/FondoRocas.png";
import "./Usuario.css"
import "boxicons";

export const Usuario = ({nombreUsuario, urlImagen}) => {

    const {theme} = useTheme();
    const [nombreCorto, setNombreCorto] = useState("");

    useEffect(() => {
        if (nombreUsuario) {
            setNombreCorto(nombreUsuario.split(" ")[0][0] + nombreUsuario.split(" ")[1][0]);
        }
    }, [nombreUsuario]);

    return (
        <div className="usuario-container">
            <span className="nombre-usuario-menu">{nombreUsuario}</span>
            <User
                pointer
                as="button"
                size="lg"
                text={nombreCorto}
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
