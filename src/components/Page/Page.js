import React from "react";
import "./Page.css"
import { Grid } from "@nextui-org/react";
import {MenuUsuario} from "../MenuUsuario/MenuUsuario"


export const Page = (props)=>{
    return (
        <section className="page-container">
            <header>
                <Grid.Container gap={0}>
                    <Grid xs={8}>
                        <div>
                            <h1 className="titulo-seccion">
                                Bienvenido <span className="resaltar-texto">Christian</span>
                                !
                            </h1>
                            <p className="descripcion-seccion">
                                Aquí puedes obtener información general de tu paso por la
                                aplicación.
                            </p>
                        </div>
                    </Grid>
                    <Grid xs={4} justify="flex-end" alignItems="center">
                        <MenuUsuario/>
                    </Grid>
                </Grid.Container>
            </header>
            {props.children}
        </section>
    );
}