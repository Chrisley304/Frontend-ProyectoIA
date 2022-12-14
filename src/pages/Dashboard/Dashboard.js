import React, { useEffect, useState } from "react";
import { Grid, Card, Link, Text } from "@nextui-org/react";
import { Page } from "../../components/Page/Page";
import { CardInicio } from "../../components/CardInicio/CardInicio";
import imgCardAsociacion from "../../assets/img/card-1.jpg";
import imgCardDistancia from "../../assets/img/card-distancia.jpg";
import imgCardClustering from "../../assets/img/card-clustering.jpg";
import githubLightLogo from "../../assets/img/GitHub-Mark-120px-plus.png";
import githubDarkLogo from "../../assets/img/github-mark-white.png";
import cartasImg from "../../assets/img/cartas-adivina.jpg";
import bosqueImg from "../../assets/img/bosque.jpg";
import { useAuth } from "../../firebase-config";
import useDarkMode from "use-dark-mode";

export const Dashboard = () => {
    const darkMode = useDarkMode(false);
    const user = useAuth();
    const [nombreCompleto, setNombreCompleto] = useState("");

    useEffect(() => {
        if (user) {
            setNombreCompleto(user.displayName);
        }
    }, [user]);
    var nombreUsuario = "";
    if (nombreCompleto.length > 0) {
        nombreUsuario = nombreCompleto.split(" ")[0];
    }
    return (
        <Page
            titulo={
                <span>
                    Bienvenido a Algorithmia{" "}
                    <span className="resaltar-texto">{nombreUsuario}</span>!
                </span>
            }
            descripcion="Comienza a interactuar con la aplicación con alguno de los siguientes algoritmos."
        >
            <Grid.Container gap={2} justify="center">
                <Grid xs={12} sm={6} md={4}>
                    <CardInicio
                        titulo="¡Prueba las reglas de asociación!"
                        categoria="Algoritmo"
                        imagen={imgCardAsociacion}
                        linkPagina="/reglas-asociacion"
                    />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CardInicio
                        titulo="¡Prueba las métricas de distancia!"
                        categoria="Algoritmo"
                        imagen={imgCardDistancia}
                        linkPagina="/metricas-distancia"
                    />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CardInicio
                        titulo="¡Prueba el algoritmo de clustering!"
                        categoria="Algoritmo"
                        imagen={imgCardClustering}
                        linkPagina="/clustering"
                    />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CardInicio
                        titulo="¡Prueba el algoritmo de clasificación logistica!"
                        categoria="Algoritmo"
                        imagen={cartasImg}
                        linkPagina="/clasificacion-logistica"
                    />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <CardInicio
                        titulo="¡Prueba el algoritmo de arboles y bosques aleatorios!"
                        categoria="Algoritmo"
                        imagen={bosqueImg}
                        linkPagina="/arboles-bosques"
                    />
                </Grid>
                <Grid xs={12}>
                    <Card css={{ p: "$6" }}>
                        <Card.Header>
                            <img
                                alt="github logo"
                                src={
                                    darkMode.value
                                        ? githubDarkLogo
                                        : githubLightLogo
                                }
                                width="34px"
                                height="34px"
                            />
                            <Grid.Container css={{ pl: "$6" }}>
                                <Grid xs={12}>
                                    <Text h4 css={{ lineHeight: "$xs" }}>
                                        Revisa el código fuente del proyecto!
                                    </Text>
                                </Grid>
                                <Grid xs={12}>
                                    <Text css={{ color: "$accents8" }}>
                                        github.com/Chrisley304/Frontend-ProyectoIA
                                    </Text>
                                </Grid>
                            </Grid.Container>
                        </Card.Header>
                        <Card.Body css={{ py: "$2" }}>
                            <Text>
                                El código fuente es <strong>open source</strong>{" "}
                                por lo que puedes revisarlo si así lo deseas en
                                mi perfil de Github!
                            </Text>
                        </Card.Body>
                        <Card.Footer>
                            <Link
                                icon
                                color="primary"
                                target="_blank"
                                href="https://github.com/Chrisley304/Frontend-ProyectoIA"
                            >
                                Visita el código fuente en GitHub.
                            </Link>
                        </Card.Footer>
                    </Card>
                </Grid>
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
