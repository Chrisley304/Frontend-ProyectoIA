import React, { useState } from "react";
import { Page } from "../../components/Page/Page";
import { Input, Button, Grid, Card, Text, Progress } from "@nextui-org/react";
import "./ReglasAsociacion.css";
import { useRef } from "react";
import Papa from "papaparse";
import { GraficaAsociacion } from "../../components/GraficaAsociacion/GraficaAsociacion";
// import DataTable from "react-data-table-component";
// import { CsvToHtmlTable } from "react-csv-to-table";
// import { TablaAsociacion } from "../../components/TablaAsociacion/TablaAsociacion";
import { ModalError } from "../../components/ModalError/ModalError";
import { TablaAsociacion } from "../../components/TablaAsociacion/TablaAsociacion";
import { LoadingModal } from "../../components/LoadingModal/LoadingModal";

// Para utilizar el LOCALHOST:
const API = process.env.REACT_APP_LOCALHOST;
// Para usar la API de Heroku:
// const API = process.env.REACT_APP_API_URL;

export const ReglasAsociacion = () => {
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
    const [Xtabla, setXtabla] = useState();
    const [Ytabla, setYtabla] = useState();
    const [isLoading, setIsLoading] = useState(false);

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
        soporteMinimo &&
        confianzaMinima &&
        elevacionMinima &&
        validateFileExt(filenameLabel);

    const handleSubmit = async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const formData = new FormData(form.current);
            const res = await fetch(API + "asociacion", {
                method: "POST",
                body: formData,
            });
            const infoRes = await res.json();
            // console.log(infoRes);
            if (!("error" in infoRes)) {
                const csvFile = infoRes["csv"];
                setRespuestaNReglas(infoRes["nReglas"]);
                setXtabla(infoRes['datosX'])
                setYtabla(infoRes['datosY'])
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
                // console.log(tableHeaders);
                // console.log(parsedData);
                setDataTable(parsedData);
                setHeaderTable(tableHeaders);
            } else {
                setTextoError(infoRes["error"]);
                setErrorRespuesta(true);
            }
        } catch (error) {
            setTextoError("Error al momento de realizar la petición al servidor Backend, si el problema persiste envia un correo a chris@chrisley.dev");
            setErrorRespuesta(true);
        }
        setIsLoading(false);
    };

    

    return (
        <Page
            titulo="Reglas de asociación"
            descripcion="En esta sección de la app puedes obtener reglas de asociación entre los elementos de un dataset que ingreses en CSV, este NO debe de contener encabezados."
        >
            <Grid.Container gap={2}>
                <Grid xs={12} sm={4}>
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
                {/* Si hay un error, se muestra el modal de error */}
                {errorRespuesta && <ModalError textoError={textoError} />}
                {/* Si no se generaron reglas, se muestra el error */}
                {respuestaNReglas === 0 && (
                    <ModalError textoError="La configuración ingresada no genero ninguna regla de asociación. Actualiza los valores e intenta de nuevo." />
                )}
                <Grid xs={12} sm={8}>
                    <div className="resultados-container">
                        <Card
                            className="card-resultados"
                            css={{ maxHeight: "700px", h:"100%", overflow: "scroll" }}
                        >
                            <Card.Body className="card-resultados-body">
                                <Text h3>Frecuencia de los elementos:</Text>
                                {respuestaNReglas <= 0 ? (
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
                </Grid>
                <Grid xs={12}>
                    <div className="resultados-container">
                        <Card
                            className="card-resultados"
                            css={{ h: "100%", maxHeight: "500px" }}
                        >
                            <Card.Body className="card-resultados-body">
                                <Text h3>Reglas generadas:</Text>
                                {respuestaNReglas <= 0 ? (
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
                                    <div>
                                        <Text>
                                            Se generaron <b>{respuestaNReglas}</b> reglas:
                                        </Text>
                                        <TablaAsociacion
                                            data={dataTable}
                                            cols={headerTable}
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
