import React, { useState } from "react";
// import { Grid } from "@nextui-org/react";
import { Page } from "../../components/Page/Page";
import { Input, Button, Grid } from "@nextui-org/react";
import "./ReglasAsociacion.css"
import { useRef } from "react";

// Para utilizar el LOCALHOST:
// const API = process.env.REACT_APP_LOCALHOST;
// Para usar la API de Heroku:
const API = process.env.REACT_APP_API_URL;

export const ReglasAsociacion = () => {

    // Para el label del file
    const [filenameLabel, setFilenameLabel] = useState("");
    const [soporteMinimo, setSoporteMinimo] = useState();
    const [confianzaMinima, setConfianzaMinima] = useState();
    const [elevacionMinima, setElevacionMinima] = useState();

    // Reference for the invisible file input, to modify the beauty one 
    const inputFile = useRef(null);
    // Reference for the form
    const form = useRef(null);
    
    const selectFile = () => {
        inputFile.current.click();
    };
    const updateFileInput = () => {
        var filepath = inputFile.current.value.split("\\");
        var filename = filepath[filepath.length - 1];
        setFilenameLabel(filename)
    };
    const validateFileExt = (value) =>{
        return value.match(/.\.csv$/)
    };

    const fileHelper = React.useMemo(()=>{
        if(filenameLabel === "")
            return{
                text: "",
                color: "",
            }
        const fileIsValid = validateFileExt(filenameLabel);
        return {
            text: fileIsValid? "Archivo .csv correcto": "El archivo ingresado no es un .csv",
            color: fileIsValid? "success": "error",
        };
    }, [filenameLabel]);
    
    const isFormValid = (
        soporteMinimo && confianzaMinima && elevacionMinima && validateFileExt(filenameLabel)
        );
        
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(form.current);
        fetch(API + "asociacion", { method: "POST", body: data })
            .then((res) => {
                console.log(res.json());
            });
    };

    return (
        <Page
            titulo="Reglas de asociacion"
            descripcion="En esta sección de la app puedes obtener las reglas de asociacion de un dataset que ingreses en CSV."
        >
            <form ref={form} onSubmit={handleSubmit}>
                <Grid.Container gap={2}>
                    <Grid xs={12}>
                        <input
                            ref={inputFile}
                            type="file"
                            name="file"
                            style={{ display: "none" }}
                            onChange={updateFileInput}
                        ></input>
                        <Input
                            readOnly
                            width="350px"
                            labelLeft="Archivo"
                            className="boton-archivo"
                            initialValue={filenameLabel}
                            helperColor={fileHelper.color}
                            status={fileHelper.color}
                            helperText={fileHelper.text}
                            label="Ingresa un archivo .csv a analizar"
                            onClick={selectFile}
                        />
                    </Grid>
                    <Grid xs={6} sm={4}>
                        <Input
                            helperText=""
                            type="number"
                            step={0.001}
                            name="soporteMinimo"
                            label="Soporte mínimo"
                            onChange={(e) => {
                                setSoporteMinimo(e.target.value);
                            }}
                            placeholder="Ej. 0.01"
                        />
                    </Grid>
                    <Grid xs={6} sm={4}>
                        <Input
                            helperText=""
                            type="number"
                            step={0.001}
                            name="confianzaMinima"
                            onChange={(e) => setConfianzaMinima(e.target.value)}
                            label="Confianza mínima"
                            placeholder="Ej. 0.3"
                        />
                    </Grid>
                    <Grid xs={6} sm={4}>
                        <Input
                            helperText=""
                            type="number"
                            step={0.001}
                            name="elevacionMinima"
                            onChange={(e) => setElevacionMinima(e.target.value)}
                            label="Elevación mínima"
                            placeholder="Ej. 2"
                        />
                    </Grid>
                    <Grid xs={12}>
                        <Button
                            flat
                            color="primary"
                            disabled={!isFormValid}
                            type="submit"
                            value="Submit"
                        >
                            Obtener reglas de asociacion
                        </Button>
                    </Grid>
                </Grid.Container>
            </form>
        </Page>
    );
};
