import React from "react";
import "./Page.css"
import { Grid } from "@nextui-org/react";
import {MenuUsuario} from "../MenuUsuario/MenuUsuario"
import { useGlobalState } from "../../App";

export const Page = ({titulo, descripcion, showUser, children})=>{

    if (showUser === undefined) {
        showUser = true;
    };

    const [navBarCollapsed] =
        useGlobalState("navBarCollapsed");
    // console.log(navBarCollapsed);

    return (
        <section
            className={
                navBarCollapsed
                    ? "page-container side-bar-collapsed"
                    : "page-container"
            }
        >
            <header>
                <Grid.Container gap={0}>
                    <Grid xs={9} sm={8}>
                        <div>
                            <h1 className="titulo-seccion">{titulo}</h1>
                            <p className="descripcion-seccion">{descripcion}</p>
                        </div>
                    </Grid>
                    {showUser && <Grid xs={3} sm={4} justify="flex-end" alignItems="top">
                        <MenuUsuario />
                    </Grid>}
                </Grid.Container>
            </header>
            {children}
        </section>
    );
}