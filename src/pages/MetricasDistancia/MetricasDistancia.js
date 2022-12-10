import React, { useState } from "react";
import { Page } from "../../components/Page/Page";
import { Input, Button, Grid, Card, Text, Progress, Radio } from "@nextui-org/react";
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
    const [metricaSeleccionada, setMetricaSeleccionada] = useState();
    const [errorRespuesta, setErrorRespuesta] = useState(false);
    const [textoError, setTextoError] = useState("");
    const [dataTable, setDataTable] = useState();
    const [headerTable, setHeaderTable] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [salida, setSalida] = useState(false);
    const [objetoA, setObjetoA] = useState();
    const [objetoB, setObjetoB] = useState();
    const [resultadoDistancia, setResultadoDistancia] = useState();

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
        metricaSeleccionada &&
        validateFileExt(filenameLabel);
    const isFormValidForm2 =
        metricaSeleccionada && validateFileExt(filenameLabel) && objetoA && objetoB && objetoA !== objetoB;

    const handleSubmitMatriz = async () => {
        setIsLoading(true);
        
        const formData = new FormData(form.current);
        const res = await fetch(
            API + "matriz-distancia/" + metricaSeleccionada,
            {
                method: "POST",
                body: formData,
            }
        );
        const infoRes = await res.json();
        // console.log(infoRes);
        if (!('error' in infoRes)){
            const csvFile = infoRes["csv"];
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
            setSalida(true);
        }else{
            setTextoError(infoRes['error']);
            setErrorRespuesta(true);
            setSalida(false);
        }
        setIsLoading(false);
    };

    const handleSubmitDistObj = async () => {
        setIsLoading(true);
        
        const formData = new FormData(form.current);
        const res = await fetch(
            API + "distancia-objetos/" + metricaSeleccionada,
            {
                method: "POST",
                body: formData,
            }
        );
        const infoRes = await res.json();
        // console.log(infoRes);
        if (!('error' in infoRes)){
            setResultadoDistancia(infoRes["distancia"]);
        }else{
            setTextoError(infoRes['error']);
            setErrorRespuesta(true);
        }
        setIsLoading(false);
    };

    return (
        <Page
            titulo="Métricas de distancia"
            descripcion="En esta sección de la app puedes obtener las metricas de distancia de un dataset que ingreses en CSV, utilizando el algoritmo que desees."
        >
            <Grid.Container gap={2}>
                <Grid.Container>
                    <Grid xs={12} sm={8}>
                        <form
                            ref={form}
                            // onSubmit={handleSubmit}
                            className="form-container"
                        >
                            <Grid xs={6}>
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
                                        <Radio.Group
                                            label="Métrica a utilizar"
                                            value={metricaSeleccionada}
                                            onChange={setMetricaSeleccionada}
                                        >
                                            <Radio size="sm" value="euclidean">
                                                Métrica Euclidiana
                                            </Radio>
                                            <Radio size="sm" value="chebyshev">
                                                Métrica Chebyshev
                                            </Radio>
                                            <Radio size="sm" value="cityblock">
                                                Métrica de Manhattan (City
                                                block)
                                            </Radio>
                                        </Radio.Group>
                                    </Grid>
                                    <Grid xs={12}>
                                        <Button
                                            flat
                                            size={"lg"}
                                            color="primary"
                                            disabled={!isFormValid}
                                            type="button"
                                            onPress={handleSubmitMatriz}
                                            value="matriz-distancias"
                                        >
                                            Obtener metricas de distancia
                                        </Button>
                                    </Grid>
                                </Grid.Container>
                            </Grid>
                            <Grid xs={6}>
                                <Grid.Container gap={2}>
                                    <Grid xs={12}>
                                        <Input
                                            helperText=""
                                            type="number"
                                            step={1}
                                            min={0}
                                            name="objeto1"
                                            label="Objeto A:"
                                            onChange={(e) =>
                                                setObjetoA(e.target.value)
                                            }
                                            placeholder="Ej. 1"
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <Input
                                            helperText=""
                                            type="number"
                                            step={1}
                                            min={0}
                                            name="objeto2"
                                            label="Objeto B:"
                                            onChange={(e) =>
                                                setObjetoB(e.target.value)
                                            }
                                            placeholder="Ej. 2"
                                        />
                                    </Grid>

                                    <Grid xs={12}>
                                        <Button
                                            flat
                                            size={"lg"}
                                            color="secondary"
                                            disabled={!isFormValidForm2}
                                            type="button"
                                            onPress={handleSubmitDistObj}
                                            value="distancia-objetos"
                                        >
                                            Obtener distancia entre elementos
                                        </Button>
                                    </Grid>
                                </Grid.Container>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <div className="resultados-container">
                            <Card
                                className="card-resultados"
                                css={{
                                    maxHeight: "700px",
                                    h: "100%",
                                    overflow: "scroll",
                                }}
                            >
                                <Card.Body className="card-resultados-body">
                                    <Text h3>
                                        Distancia entre
                                        los objetos:
                                    </Text>
                                    {resultadoDistancia ? (
                                        <div className="waiting-container">
                                            <Text size={20}>{resultadoDistancia}</Text>
                                        </div>
                                    ) : (
                                        <div className="waiting-container">
                                            <Text css={{ pb: "$10" }}>
                                                Esperando entrada...
                                            </Text>
                                            {/* <Progress
                                                indeterminated
                                                value={50}
                                                color="secondary"
                                                status="secondary"
                                            /> */}
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>
                    </Grid>
                </Grid.Container>
                <LoadingModal visible={isLoading} />
                {/* Si hay un error, se muestra el modal de error */}
                {errorRespuesta && <ModalError textoError={textoError} />}
                {/* Si no se generaron reglas, se muestra el error */}
                {/* {respuestaNReglas === 0 && (
                    <ModalError textoError="La configuración ingresada no genero ninguna regla de asociación. Actualiza los valores e intenta de nuevo." />
                )} */}
                <Grid xs={12}>
                    <div className="resultados-container">
                        <Card
                            className="card-resultados"
                            css={{
                                maxHeight: "700px",
                                h: "100%",
                                overflow: "scroll",
                            }}
                        >
                            <Card.Body className="card-resultados-body">
                                <Text h3>
                                    Matriz de distancia de
                                    los elementos:
                                </Text>
                                {salida ? (
                                    <div>
                                        {/* <Text>
                                            Se generaron{" "}
                                            <b>{respuestaNReglas}</b> reglas:
                                        </Text> */}
                                        <TablaAsociacion
                                            data={dataTable}
                                            cols={headerTable}
                                        />
                                    </div>
                                ) : (
                                    <div className="waiting-container">
                                        <Text css={{ pb: "$10" }}>
                                            Esperando entrada...
                                        </Text>
                                        <Progress
                                            indeterminated
                                            value={50}
                                            color="secondary"
                                            status="secondary"
                                        />
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                </Grid>
            </Grid.Container>
        </Page>
    );
};
