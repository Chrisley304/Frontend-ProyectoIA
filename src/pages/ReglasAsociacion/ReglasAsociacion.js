import React from "react";
import { Grid } from "@nextui-org/react";
import { Page } from "../../components/Page/Page";
import { CardInicio } from "../../components/CardInicio/CardInicio";
import imgCardAsociacion from "../../assets/img/card-1.jpg";
import imgCardDistancia from "../../assets/img/card-distancia.jpg";
import imgCardClustering from "../../assets/img/card-clustering.jpg";

export const ReglasAsociacion = () => {
    const nombreUsuario = "Christian";

    return (
        <Page
            titulo={
                <span>
                    Bienvenido{" "}
                    <span className="resaltar-texto">{nombreUsuario}</span>!
                </span>
            }
            descripcion="Aquí puedes obtener información general de tu paso por la aplicación."
        >
            <Grid.Container gap={2} justify="center">
                <Grid xs={12} sm={6} md={4}>
                    <CardInicio
                        titulo="Prueba las reglas de asociación!"
                        categoria="Algoritmo"
                        imagen={imgCardAsociacion}
                        linkPagina="/reglas-asociacion"
                    />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CardInicio
                        titulo="Prueba las metricas de distancia!"
                        categoria="Algoritmo"
                        imagen={imgCardDistancia}
                        linkPagina="/metricas-distancia"
                    />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CardInicio
                        titulo="Prueba el algoritmo de clustering!"
                        categoria="Algoritmo"
                        imagen={imgCardClustering}
                        linkPagina="/clustering"
                    />
                </Grid>
                {/* <Grid xs={12} sm={5}>
                    <CardInicio
                        titulo="Prueba las reglas de asociación!"
                        categoria="Algoritmo"
                        imagen="src/assets/img/penguin.png"
                    />
                </Grid> */}
                {/* <Grid xs={12} sm={7}>
                    <CardInicio
                        titulo="Prueba las reglas de asociación!"
                        categoria="Algoritmo"
                        imagen="src/assets/img/penguin.png"
                    />
                </Grid> */}
            </Grid.Container>
        </Page>
    );
};
