import React, { useState } from "react";
import { Page } from "../../components/Page/Page";
import {
    Input,
    Button,
    Grid,
    useTheme,
    Text,
    Radio,
    Container,
} from "@nextui-org/react";
import "./Clustering.css";
import { useRef } from "react";
import Papa from "papaparse";
import { ModalError } from "../../components/ModalError/ModalError";
import { TablaAsociacion } from "../../components/TablaAsociacion/TablaAsociacion";
import { LoadingModal } from "../../components/LoadingModal/LoadingModal";
import archivoPrueba from "../../assets/csvPrueba/Hipoteca.csv";
import { CSVLink } from "react-csv";
import SeleccionCaracteristicas from "../../components/SeleccionCaracteristicas/SeleccionCaracteristicas";

// Para utilizar el LOCALHOST:
const API = process.env.REACT_APP_LOCALHOST;
// Para usar la API de Heroku:
// const API = process.env.REACT_APP_API_URL;

export const Clustering = () => {
    // Para el label del file
    const [filenameLabel, setFilenameLabel] = useState("");
    const [maxClusters, setMaxClusters] = useState();
    const [minClusters, setMinClusters] = useState();
    const [metricaSeleccionada, setMetricaSeleccionada] = useState();
    const [tipoClustering, setTipoClustering] = useState();
    const [errorRespuesta, setErrorRespuesta] = useState(false);
    const [textoError, setTextoError] = useState("");
    const [dataTable, setDataTable] = useState();
    const [headerTable, setHeaderTable] = useState();
    const [csvData, setCsvData] = useState("");
    const [mapaCalor, setMapaCalor] = useState();
    const [columnasDataSet, setColumnasDataSet] = useState([]);
    const [seleccionCaracteristicas, setSeleccionCaracteristicas] = useState(
        []
    );
    // const [Xtabla, setXtabla] = useState();
    // const [Ytabla, setYtabla] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [salida, setSalida] = useState(false);
    const { theme } = useTheme();
    // Reference for the invisible file input, to modify the beauty one
    const inputFile = useRef(null);
    // Reference for the form
    const form = useRef(null);

    // const asociacionesChart = new Chart(ctx);

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
        tipoClustering === "particional"
            ? tipoClustering &&
              seleccionCaracteristicas.length > 0 &&
              minClusters > 0 &&
              maxClusters > 0 &&
              validateFileExt(filenameLabel)
            : tipoClustering &&
              seleccionCaracteristicas.length > 0 &&
              metricaSeleccionada &&
              maxClusters > 0 &&
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

    const handleSubmit = async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData(form.current);
            formData.append(
                "seleccionCaracteristicas",
                seleccionCaracteristicas
            );
            const res = await fetch(API + "clustering/" + tipoClustering, {
                method: "POST",
                body: formData,
            });
            const infoRes = await res.json();
            // console.log(infoRes);
            if (!("error" in infoRes)) {
                const csvFile = infoRes["csv"];
                // setXtabla(infoRes["datosX"]);
                // setYtabla(infoRes["datosY"]);
                console.log(infoRes);
                const parsedCsv = Papa.parse(csvFile, { header: true });
                const parsedData = parsedCsv?.data;
                // console.log(parsedData);
                var tableHeaders = [];
                var arrayHead = Object.keys(parsedData[0]);
                for (var i in arrayHead) {
                    tableHeaders.push({
                        key: arrayHead[i],
                        label: arrayHead[i],
                    });
                }
                setCsvData(csvFile);
                setDataTable(parsedData);
                setHeaderTable(tableHeaders);
                setSalida(true);
            } else {
                setTextoError(infoRes["error"]);
                setErrorRespuesta(true);
                setSalida(false);
            }
        } catch (error) {
            setTextoError(
                "Error al momento de realizar la petición al servidor Backend, si el problema persiste envia un correo a chris@chrisley.dev"
            );
            setErrorRespuesta(true);
            setSalida(false);
        }
        setIsLoading(false);
    };

    return (
        <Page
            titulo="Clustering"
            descripcion={
                <div>
                    <p>
                        En esta sección de la app puedes obtener grupos de
                        clusters entre los elementos de un dataset que ingreses
                        en CSV.
                    </p>
                    <p>
                        Si no tienes un dataset para utilizar el agoritmo, obten
                        uno dando click <a href={archivoPrueba}>aquí</a>.
                    </p>
                </div>
            }
        >
            <Grid.Container>
                <Grid xs={12} sm={4} md={6}>
                    <form ref={form} onSubmit={handleSubmit}>
                        <Grid.Container gap={2}>
                            <input
                                ref={inputFile}
                                type="file"
                                name="file"
                                style={{ display: "none" }}
                                onChange={handleFileInput}
                            ></input>
                            <Grid xs={12}>
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
                            </Grid>
                            {mapaCalor && (
                                <Grid xs={12}>
                                    <Radio.Group
                                        label="Tipo de clustering"
                                        value={tipoClustering}
                                        onChange={setTipoClustering}
                                    >
                                        <Radio size="sm" value="jerarquico">
                                            Método Jerarquico
                                        </Radio>
                                        <Radio size="sm" value="particional">
                                            Método Particional
                                        </Radio>
                                    </Radio.Group>
                                </Grid>
                            )}
                            {mapaCalor &&
                                tipoClustering &&
                                tipoClustering !== "particional" && (
                                    <Grid xs={12}>
                                        <Radio.Group
                                            label="Métrica a utilizar"
                                            value={metricaSeleccionada}
                                            onChange={setMetricaSeleccionada}
                                            name="tipoDistancia"
                                            isDisabled={
                                                tipoClustering === "particional"
                                            }
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
                                )}
                            {mapaCalor && tipoClustering === "particional" && (
                                <Grid xs={12}>
                                    <Input
                                        helperText=""
                                        type="number"
                                        step={1}
                                        min={0}
                                        name="minClusters"
                                        onChange={(e) =>
                                            setMinClusters(e.target.value)
                                        }
                                        label="Numero de mínimo de clusters"
                                        placeholder="Ej. 2"
                                    />
                                </Grid>
                            )}
                            {mapaCalor && tipoClustering && (
                                <Grid xs={12}>
                                    <Input
                                        helperText=""
                                        type="number"
                                        step={1}
                                        min={0}
                                        name="maxClusters"
                                        onChange={(e) =>
                                            setMaxClusters(e.target.value)
                                        }
                                        label={
                                            tipoClustering === "particional"
                                                ? "Numero de máximo de clusters"
                                                : "Numero de clusters"
                                        }
                                        placeholder="Ej. 4"
                                    />
                                </Grid>
                            )}
                            {mapaCalor && (
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
                            )}
                        </Grid.Container>
                    </form>
                </Grid>
                <LoadingModal visible={isLoading} />
                {/* Si hay un error, se muestra el modal de error */}
                {errorRespuesta && (
                    <ModalError
                        setError={setErrorRespuesta}
                        textoError={textoError}
                    />
                )}
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
                {/* Si no se generaron reglas, se muestra el error */}
                {/* {respuestaNReglas === 0 && (
                    <ModalError textoError="La configuración ingresada no genero ninguna regla de asociación. Actualiza los valores e intenta de nuevo." />
                )} */}
                {/* <Grid xs={12} sm={8}>
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
                                <Text h3>Frecuencia de los elementos:</Text>
                                {salida ? (
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
                                ) : (
                                    <GraficaAsociacion x={Xtabla} y={Ytabla} />
                                )}
                            </Card.Body>
                        </Card>
                    </div>
                </Grid> */}
                <Grid xs={12}>
                    {salida > 0 && (
                        <div className="resultados-container">
                            <Grid.Container>
                                <Grid xs={10}>
                                    <Text h3>
                                        Datos etiquetados con clusters:
                                    </Text>
                                </Grid>
                                <Grid xs={2} className="boton-csv-asos">
                                    <CSVLink
                                        data={csvData}
                                        target="_blank"
                                        filename={
                                            "clustering_" +
                                                +tipoClustering +
                                                "_" +
                                                tipoClustering ===
                                            "particional"
                                                ? filenameLabel.split(".")[0] +
                                                  ".csv"
                                                : metricaSeleccionada +
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
                            <TablaAsociacion
                                data={dataTable}
                                cols={headerTable}
                            />
                        </div>
                    )}
                </Grid>
            </Grid.Container>
        </Page>
    );
};
