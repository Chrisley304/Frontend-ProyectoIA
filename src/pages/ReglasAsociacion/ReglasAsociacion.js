import React, { useState } from "react";
// import { Grid } from "@nextui-org/react";
import { Page } from "../../components/Page/Page";
import { Input, Button, Grid } from "@nextui-org/react";
import "./ReglasAsociacion.css";
import { useRef } from "react";
import Papa from "papaparse";
// import DataTable from "react-data-table-component";
import { CsvToHtmlTable } from "react-csv-to-table";

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
    const [csvEntryData, setCsvEntryData] = useState([]);
    const [csvEntryCols, setCsvEntryCols] = useState([]);
    const [csvInfo, setCsvInfo] = useState();
    const [csvFile, setCsvFile] = useState();

    // Reference for the invisible file input, to modify the beauty one
    const inputFile = useRef(null);
    // Reference for the form
    const form = useRef(null);

    // const createColumns = (array) =>{
    //     array.map( (item) => {        
    //     employees.accounting.push({ 
    //             "firstName" : item.firstName,
    //             "lastName"  : item.lastName,
    //             "age"       : item.age 
    //         });
    //     });
    // };

    const selectFile = () => {
        inputFile.current.click();
    };
    const handleFileInput = (e) => {
        const files = console.log(e.target.files);
        console.log("files:", files);
        var filepath = inputFile.current.value.split("\\");
        var filename = filepath[filepath.length - 1];
        setFilenameLabel(filename);

        if (validateFileExt(filename)) {
            const reader = new FileReader();
            reader.onload = async ({ target }) => {
                setCsvFile(target.result);
                const csv = Papa.parse(target.result, { header: true });
                const parsedData = csv?.data;
                setCsvEntryCols(Object.keys(parsedData[0]));
                setCsvEntryData(parsedData);
            };
            reader.readAsText(e.target.files[0]);
        }
    };
    const validateFileExt = (value) => {
        return value.match(/.\.csv$/);
    };
    const fileHelper = React.useMemo(() => {
        if (filenameLabel === "")
            return {
                text: "",
                color: "",
            };
        const fileIsValid = validateFileExt(filenameLabel);
        return {
            text: fileIsValid
                ? "Archivo .csv correcto"
                : "El archivo ingresado no es un .csv",
            color: fileIsValid ? "success" : "error",
        };
    }, [filenameLabel]);

    const isFormValid =
        soporteMinimo &&
        confianzaMinima &&
        elevacionMinima &&
        validateFileExt(filenameLabel);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);
        const res = await fetch(API + "asociacion", {
            method: "POST",
            body: formData,
        });
        const infoRes = await res.json();
        // console.log(infoRes["csv"]);
        // console.log(infoRes);
    };

    // console.log(csvInfo);
    console.log(csvEntryData);

    return (
        <Page
            titulo="Reglas de asociacion"
            descripcion="En esta sección de la app puedes obtener las reglas de asociacion de un dataset que ingreses en CSV."
        >
            <Grid.Container gap={2}>
                <Grid xs={12} sm={6}>
                    <form ref={form} onSubmit={handleSubmit}>
                        <Grid.Container gap={2}>
                            <Grid xs={12}>
                                <input
                                    ref={inputFile}
                                    type="file"
                                    name="file"
                                    style={{ display: "none" }}
                                    onChange={handleFileInput}
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
                            <Grid xs={12}>
                                <Input
                                    helperText=""
                                    type="number"
                                    step={0.001}
                                    name="soporteMinimo"
                                    label="Soporte mínimo"
                                    onChange={(e) =>
                                        setSoporteMinimo(e.target.value)
                                    }
                                    placeholder="Ej. 0.01"
                                />
                            </Grid>
                            <Grid xs={12}>
                                <Input
                                    helperText=""
                                    type="number"
                                    step={0.001}
                                    name="confianzaMinima"
                                    onChange={(e) =>
                                        setConfianzaMinima(e.target.value)
                                    }
                                    label="Confianza mínima"
                                    placeholder="Ej. 0.3"
                                />
                            </Grid>
                            <Grid xs={12}>
                                <Input
                                    helperText=""
                                    type="number"
                                    step={0.001}
                                    name="elevacionMinima"
                                    onChange={(e) =>
                                        setElevacionMinima(e.target.value)
                                    }
                                    label="Elevación mínima"
                                    placeholder="Ej. 2"
                                />
                            </Grid>
                            <Grid xs={12}>
                                <Button
                                    flat
                                    size={"lg"}
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
                </Grid>
                <Grid xs={12} sm={6}>
                    <div className="entry-table-container">
                        {/* <DataTable
                            columns={csvEntryCols}
                            data={csvEntryData}
                        /> */}
                        <CsvToHtmlTable
                            data={csvFile}
                            csvDelimiter=","
                            hasHeader={false}
                            tableClassName="table table-striped table-hover"
                        />
                    </div>
                </Grid>
            </Grid.Container>
        </Page>
    );
};
