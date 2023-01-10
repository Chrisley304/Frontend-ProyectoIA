import React, { useState } from "react";
import { Page } from "../../components/Page/Page";
import {
    Input,
    Button,
    Grid,
    Text,
    Radio,
    Container,
    useTheme,
} from "@nextui-org/react";
import "./MetricasDistancia.css";
import { useRef } from "react";
import Papa from "papaparse";
import { ModalError } from "../../components/ModalError/ModalError";
import { TablaAsociacion } from "../../components/TablaAsociacion/TablaAsociacion";
import { LoadingModal } from "../../components/LoadingModal/LoadingModal";
import archivoPrueba from "../../assets/csvPrueba/Hipoteca.csv";
import SeleccionCaracteristicas from "../../components/SeleccionCaracteristicas/SeleccionCaracteristicas";
import { CSVLink } from "react-csv";

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
    const [mapaCalor, setMapaCalor] = useState(null);
    const [columnasDataSet, setColumnasDataSet] = useState([]);
    const [seleccionCaracteristicas, setSeleccionCaracteristicas] = useState(
        []
    );
    const [csvData, setCsvData] = useState("");
    const { theme } = useTheme();
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
        seleccionCaracteristicas.length > 0 &&
        validateFileExt(filenameLabel);

    const handleFileAnalisys = async () => {
        setIsLoading(true);

        const formData = new FormData(form.current);
        const res = await fetch(API + "analisis-datos", {
            method: "POST",
            body: formData,
        });
        const infoRes = await res.json();

        if (!("error" in infoRes)) {
            // Se recibe los bytes de la imagen
            const image_data = infoRes["image_data"];
            const columnas = infoRes["columnas"];
            setMapaCalor(image_data);
            setColumnasDataSet(columnas);
        } else {
            setTextoError(infoRes["error"]);
            setErrorRespuesta(true);
        }
        setIsLoading(false);
    };

    const handleSubmitMatriz = async () => {
        setIsLoading(true);

        const formData = new FormData(form.current);
        formData.append("seleccionCaracteristicas", seleccionCaracteristicas);
        const res = await fetch(
            API + "matriz-distancia/" + metricaSeleccionada,
            {
                method: "POST",
                body: formData,
            }
        );
        const infoRes = await res.json();
        // console.log(infoRes);
        if (!("error" in infoRes)) {
            const csvFile = infoRes["csv"];
            const parsedCsv = Papa.parse(csvFile, { header: true });
            const parsedData = parsedCsv?.data;
            var tableHeaders = [];
            var arrayHead = Object.keys(parsedData[0]);
            for (var i in arrayHead) {
                tableHeaders.push({
                    key: arrayHead[i],
                    label: arrayHead[i].toUpperCase(),
                });
            }
            // console.log(tableHeaders);
            // console.log(parsedData);
            setCsvData(csvFile);
            setDataTable(parsedData);
            setHeaderTable(tableHeaders);
            setSalida(true);
        } else {
            setTextoError(infoRes["error"]);
            setErrorRespuesta(true);
            setSalida(false);
        }
        setIsLoading(false);
    };

    return (
        <Page
            titulo="Métricas de distancia"
            descripcion={
                <div>
                    <p>
                        En esta sección de la app puedes obtener las metricas de
                        distancia de un dataset que ingreses en CSV, utilizando
                        el algoritmo que desees.
                    </p>
                    <p>
                        Si no tienes un dataset para utilizar el agoritmo, obten
                        uno dando click <a href={archivoPrueba}>aquí</a>.
                    </p>
                </div>
            }
        >
            <form ref={form} className="form-container">
                <Grid.Container>
                    <Grid xs={12} sm={4} md={6}>
                        <Container>
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
                            <Button
                                flat
                                size={"lg"}
                                color="primary"
                                css={{ mt: "$10" }}
                                disabled={fileHelper.color !== "success"}
                                type="button"
                                onPress={handleFileAnalisys}
                                value="matriz-distancias"
                            >
                                Analizar archivo
                            </Button>
                            {mapaCalor && (
                                <>
                                    <Radio.Group
                                        label="Métrica a utilizar"
                                        value={metricaSeleccionada}
                                        onChange={setMetricaSeleccionada}
                                        css={{ mt: "$10" }}
                                    >
                                        <Radio size="sm" value="euclidean">
                                            Métrica Euclidiana
                                        </Radio>
                                        <Radio size="sm" value="chebyshev">
                                            Métrica Chebyshev
                                        </Radio>
                                        <Radio size="sm" value="cityblock">
                                            Métrica de Manhattan (City block)
                                        </Radio>
                                    </Radio.Group>
                                    <Button
                                        flat
                                        size={"lg"}
                                        color="primary"
                                        disabled={!isFormValid}
                                        type="button"
                                        css={{ mt: "$10" }}
                                        onPress={handleSubmitMatriz}
                                        value="matriz-distancias"
                                    >
                                        Obtener matriz de distancia
                                    </Button>
                                </>
                            )}
                        </Container>
                    </Grid>
                    <Grid xs={12} sm={8} md={6}>
                        {mapaCalor && (
                            <div className="resultados-container">
                                <SeleccionCaracteristicas
                                    columnasDataSet={columnasDataSet}
                                    mapaCalor={mapaCalor}
                                    setSeleccionCaracteristicas={
                                        setSeleccionCaracteristicas
                                    }
                                />
                            </div>
                        )}
                    </Grid>
                    <LoadingModal visible={isLoading} />
                    {/* Si hay un error, se muestra el modal de error */}
                    {errorRespuesta && (
                        <ModalError
                            setError={setErrorRespuesta}
                            textoError={textoError}
                        />
                    )}
                    {/* Se muestra el mapa de calor del archivo */}

                    <Grid xs={12} css={{ paddingTop: "$15" }}>
                        {salida && (
                            <div className="resultados-container">
                                <Grid.Container>
                                    <Grid xs={10}>
                                        <Text h3>
                                            Matriz de distancia de los
                                            elementos:
                                        </Text>
                                    </Grid>
                                    <Grid xs={2} className="boton-csv-asos">
                                        <CSVLink
                                            data={csvData}
                                            target="_blank"
                                            filename={
                                                "matrizdistancias_" +
                                                metricaSeleccionada +
                                                "_" +
                                                filenameLabel.split(".")[0] +
                                                ".csv"
                                            }
                                        >
                                            Descargar CSV{" "}
                                            <box-icon
                                                type="solid"
                                                name="download"
                                                color={theme.colors.text.value}
                                            ></box-icon>
                                        </CSVLink>
                                    </Grid>
                                </Grid.Container>
                                <div>
                                    <TablaAsociacion
                                        data={dataTable}
                                        cols={headerTable}
                                    />
                                </div>
                            </div>
                        )}
                    </Grid>
                </Grid.Container>
            </form>
        </Page>
    );
};
