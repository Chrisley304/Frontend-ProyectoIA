import React, { useState } from "react";
import { Page } from "../../components/Page/Page";
import { Input, Button, Grid, Card, Text, Progress } from "@nextui-org/react";
import "./MetricasDistancia.css";
import { useRef } from "react";
import Papa from "papaparse";
// import DataTable from "react-data-table-component";
// import { CsvToHtmlTable } from "react-csv-to-table";
// import { TablaAsociacion } from "../../components/TablaAsociacion/TablaAsociacion";
import { ModalError } from "../../components/ModalError/ModalError";
import { TablaAsociacion } from "../../components/TablaAsociacion/TablaAsociacion";
import { LoadingModal } from "../../components/LoadingModal/LoadingModal";

// Para utilizar el LOCALHOST:
// const API = process.env.REACT_APP_LOCALHOST;
// Para usar la API de Heroku:
const API = process.env.REACT_APP_API_URL;

export const MetricasDistancia = () => {
    // Para el label del file
    const [filenameLabel, setFilenameLabel] = useState("");
    const [soporteMinimo, setSoporteMinimo] = useState();
    const [confianzaMinima, setConfianzaMinima] = useState();
    const [elevacionMinima, setElevacionMinima] = useState();
    const [respuestaNReglas, setRespuestaNReglas] = useState(-1);
    const [errorRespuesta, setErrorRespuesta] = useState(false);
    const [textoError, setTextoError] = useState("");
    const [dataTable, setDataTable] = useState();
    const [headerTable, setHeaderTable] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // Reference for the invisible file input, to modify the beauty one
    const inputFile = useRef(null);
    // Reference for the form
    const form = useRef(null);

    const selectFile = () => {
        inputFile.current.click();
    };
    const handleFileInput = (e) => {
        var filepath = inputFile.current.value.split("\\");
        var filename = filepath[filepath.length - 1];
        setFilenameLabel(filename);
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
        setIsLoading(true);
        e.preventDefault();
        const formData = new FormData(form.current);
        const res = await fetch(API + "asociacion", {
            method: "POST",
            body: formData,
        });
        const infoRes = await res.json();
        // console.log(infoRes);
        if (!('error' in infoRes)){
            const csvFile = infoRes["csv"];
            setRespuestaNReglas(infoRes["nReglas"]);

            const parsedCsv = Papa.parse(csvFile, { header: true });
            const parsedData = parsedCsv?.data;
            var tableHeaders = [];
            var arrayHead= Object.keys(parsedData[0]);
            for(var i in arrayHead){
                tableHeaders.push({
                    key: arrayHead[i],
                    label: arrayHead[i].toUpperCase(),
                });
            }
            // console.log(tableHeaders);
            // console.log(parsedData);
            setDataTable(parsedData);
            setHeaderTable(tableHeaders);
        }else{
            setTextoError(infoRes['error']);
            setErrorRespuesta(true);
        }
        setIsLoading(false);
    };

    return (
        <Page
            titulo="Metricas de distancia"
            descripcion="En esta sección de la app puedes obtener las metricas de distancia de un dataset que ingreses en CSV, utilizando el algoritmo que desees."
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
                <LoadingModal visible={isLoading} />
                <Grid xs={12} sm={6}>
                    <div className="resultados-container">
                        <Card
                            className="card-resultados"
                            css={{ h: "100%", overflow: "scroll" }}
                        >
                            <Card.Body className="card-resultados-body">
                                <Text h3>Resultados:</Text>
                                {errorRespuesta ? (
                                    <ModalError textoError={textoError} />
                                ) : respuestaNReglas === -1 ? (
                                    <div className="waiting-container">
                                        <Text css={{pb:"$10"}}>Esperando entrada...</Text>
                                        <Progress
                                            indeterminated
                                            value={50}
                                            color="secondary"
                                            status="secondary"
                                        />
                                    </div>
                                ) : respuestaNReglas > 0 ? (
                                    <div>
                                        <Text>
                                            Reglas generadas: {respuestaNReglas}
                                        </Text>
                                        <TablaAsociacion
                                            data={dataTable}
                                            cols={headerTable}
                                        />
                                    </div>
                                ) : (
                                    <ModalError textoError="La configuración ingresada no genero ninguna regla de asociación. Actualiza los valores e intenta de nuevo." />
                                )}
                            </Card.Body>
                        </Card>
                        {/* <DataTable
                            columns={csvEntryCols}
                            data={csvEntryData}
                        /> */}
                        {/* <CsvToHtmlTable
                            data={csvFile}
                            csvDelimiter=","
                            hasHeader={false}
                            tableClassName="table table-striped table-hover"
                        /> */}
                        {/* <TablaAsociacion data={csvEntryData}/> */}
                    </div>
                </Grid>
            </Grid.Container>
        </Page>
    );
};
