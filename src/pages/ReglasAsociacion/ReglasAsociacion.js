import React, { useState } from "react";
// import { Grid } from "@nextui-org/react";
import { Page } from "../../components/Page/Page";
import { Input, Button, Grid } from "@nextui-org/react";
import "./ReglasAsociacion.css"
import { useRef } from "react";

export const ReglasAsociacion = () => {

    // Para el label del file
    const [filenameLabel, setFilenameLabel] = useState("");

    const inputFile = useRef(null);

    const selectFile = () => {
        inputFile.current.click();
    };
    const updateFileInput = () => {
        var filepath = inputFile.current.value.split("\\");
        var filename = filepath[filepath.length - 1];
        setFilenameLabel(filename)
    }

    return (
        <Page
            titulo="Reglas de asociacion"
            descripcion="En esta sección de la app puedes obtener las reglas de asociacion de un dataset que ingreses en CSV."
        >
            <Grid.Container gap={4}>
                <Grid>
                    <input
                        ref={inputFile}
                        type="file"
                        style={{ display: "none" }}
                        onChange={updateFileInput}
                    ></input>
                    <Input
                        readOnly
                        className="boton-archivo"
                        initialValue={filenameLabel}
                        label="Ingresa un archivo .csv a analizar"
                        onClick={selectFile}
                    />
                </Grid>
                <Grid>
                    <Input
                        helperText=""
                        type="number"
                        label="Soporte mínimo"
                        placeholder="Ej. 0.01"
                    />
                </Grid>
                <Grid>
                    <Input
                        helperText=""
                        type="number"
                        label="Confianza mínima"
                        placeholder="Ej. 0.3"
                    />
                </Grid>
                <Grid>
                    <Input
                        helperText=""
                        type="number"
                        label="Elevación mínima"
                        placeholder="Ej. 2"
                    />
                </Grid>
                <Grid>
                    <Button flat color="primary" auto>
                        Obtener reglas de asociacion
                    </Button>
                </Grid>
            </Grid.Container>
        </Page>
    );
};
