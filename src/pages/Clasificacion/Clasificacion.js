import React, { useState } from "react";
import { Page } from "../../components/Page/Page";
import {
    Input,
    Button,
    Grid,
    useTheme,
    Text,
    Card,
    Dropdown,
    Table,
} from "@nextui-org/react";
import "./Clasificacion.css";
import { useRef } from "react";
import Papa from "papaparse";
import { ModalError } from "../../components/ModalError/ModalError";
import { TablaAsociacion } from "../../components/TablaAsociacion/TablaAsociacion";
import { LoadingModal } from "../../components/LoadingModal/LoadingModal";
import archivoPrueba from "../../assets/csvPrueba/Hipoteca.csv";
import { CSVLink } from "react-csv";
import SeleccionCaracteristicasClasificacion from "../../components/SeleccionCaracteristicasClasificacion/SeleccionCaracteristicasClasificacion";

// Para utilizar el LOCALHOST:
// const API = process.env.REACT_APP_LOCALHOST;
// Para usar la API de Heroku:
const API = process.env.REACT_APP_API_URL;

export const Clasificacion = () => {
    // Para el label del file
    const [filenameLabel, setFilenameLabel] = useState("");
    const [errorRespuesta, setErrorRespuesta] = useState(false);
    const [textoError, setTextoError] = useState("");
    const [dataTable, setDataTable] = useState([]);
    const [headerTable, setHeaderTable] = useState([]);
    const [csvData, setCsvData] = useState("");
    const [mapaCalor, setMapaCalor] = useState();
    const [graficaROC, setGraficaROC] = useState();
    const [exactitudPromedio, setExactitudPromedio] = useState();
    const [columnasDataSet, setColumnasDataSet] = useState([]);
    const [tamMuestra, setTamMuestra] = useState(0);
    const [variableClase, setVariableClase] = useState(
        "Seleccione una variable"
    );
    const [seleccionCaracteristicas, setSeleccionCaracteristicas] = useState(
        []
    );
    const [isLoading, setIsLoading] = useState(false);
    const [salida, setSalida] = useState(false);
    const { theme } = useTheme();
    // Reference for the invisible file input, to modify the beauty one
    const inputFile = useRef(null);
    // Reference for the form
    const form = useRef(null);
    const [variableClaseValor] = variableClase;
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
        seleccionCaracteristicas.length > 0 &&
        tamMuestra >= 0.15 &&
        tamMuestra <= 0.3 &&
        variableClase !== "Seleccione una variable" &&
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
            formData.append("variableClase", variableClaseValor);
            const res = await fetch(API + "clasificacion", {
                method: "POST",
                body: formData,
            });
            const infoRes = await res.json();
            // console.log(infoRes);
            if (!("error" in infoRes)) {
                const csvFile = infoRes["csv"];
                const parsedCsv = Papa.parse(csvFile, { header: true });
                var parsedData = parsedCsv?.data;
                const image_data = infoRes["graficaROC"];
                const exactitud = infoRes["exactitudPromedio"];
                var tableHeaders = [];
                var arrayHead = Object.keys(parsedData[0]);
                for (var i in arrayHead) {
                    tableHeaders.push(arrayHead[i]);
                }
                // Se elimina el indice 2 del array ya que se genera vacio y da problemas al crear la tabla
                parsedData.splice(2, 1);
                console.log(tableHeaders);
                console.log(parsedData);
                setCsvData(csvFile);
                setDataTable(parsedData);
                setHeaderTable(tableHeaders);
                setExactitudPromedio(exactitud);
                setGraficaROC(image_data);
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
            titulo="Clasificación Logística"
            descripcion={
                <div>
                    <p>
                        En esta sección de la app puedes obtener la matriz de
                        clasificacion logística de un dataset que ingreses en
                        CSV.
                        <br />
                        <strong>Nota:</strong> El dataset debe tener una
                        variable de clase binaria (Con dos clases).
                    </p>
                    <p>
                        Si no tienes un dataset para utilizar el algoritmo,
                        obtén uno dando click <a href={archivoPrueba}>aquí</a>.
                    </p>
                </div>
            }
        >
            <Grid.Container>
                <Grid xs={12} sm={4} md={6}>
                    <form ref={form} onSubmit={handleSubmit}>
                        <Grid.Container gap={2} css={{ mb: "$20" }}>
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
                                <>
                                    <Grid xs={12} css={{ mt: "$10" }}>
                                        <Text>
                                            Selecciona la variable clase:
                                        </Text>
                                    </Grid>
                                    <Grid xs={12}>
                                        <Dropdown>
                                            <Dropdown.Button
                                                flat
                                                color="secondary"
                                            >
                                                {variableClase}
                                            </Dropdown.Button>
                                            <Dropdown.Menu
                                                aria-label="Single selection actions"
                                                color="secondary"
                                                disallowEmptySelection
                                                selectionMode="single"
                                                selectedKeys={variableClase}
                                                onSelectionChange={
                                                    setVariableClase
                                                }
                                            >
                                                {columnasDataSet.map(
                                                    (columna, _) => {
                                                        return (
                                                            <Dropdown.Item
                                                                key={columna}
                                                            >
                                                                {columna}
                                                            </Dropdown.Item>
                                                        );
                                                    }
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Grid>
                                </>
                            )}
                            {mapaCalor && (
                                <Grid xs={12}>
                                    <Input
                                        helperText=""
                                        type="number"
                                        step={0.01}
                                        min={0.15}
                                        max={0.3}
                                        name="tamanioMuestra"
                                        onChange={(e) =>
                                            setTamMuestra(e.target.value)
                                        }
                                        label="Tamaño de la muestra"
                                        placeholder="Ej. 0.2"
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
                                        Obtener clasificación logística
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
                <Grid xs={12} sm={8} md={6} css={{ pb: "$20" }}>
                    {mapaCalor && (
                        <div className="resultados-container">
                            <SeleccionCaracteristicasClasificacion
                                columnasDataSet={columnasDataSet}
                                mapaCalor={mapaCalor}
                                setSeleccionCaracteristicas={
                                    setSeleccionCaracteristicas
                                }
                                variableClase={
                                    variableClase === "Seleccione una variable"
                                        ? ""
                                        : variableClaseValor
                                }
                            />
                        </div>
                    )}
                </Grid>
                <Grid xs={12} sm={8} md={6}>
                    {salida && (
                        <div className="resultados-container">
                            <Grid.Container>
                                <Grid xs={8}>
                                    <Text h3>Matriz de Clasificacion:</Text>
                                </Grid>
                                <Grid
                                    xs={4}
                                    className="boton-csv-asos"
                                    css={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <CSVLink
                                        data={csvData}
                                        target="_blank"
                                        filename={
                                            "matrizclasificacion_logistica" +
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

                            <Table
                                compact
                                aria-label="Tabla generada con los datos de la clasificación logística"
                            >
                                <Table.Header>
                                    <Table.Column key={"Reales"}>
                                        Reales
                                    </Table.Column>
                                    <Table.Column key={"0"}>0</Table.Column>
                                    <Table.Column key={"1"}>1</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {dataTable.map((item, index) => {
                                        console.log(item[0]);
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell>
                                                    {item["Reales"]}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {item["0"]}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {item["1"]}
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>

                                {/* <Table.Pagination
                                    shadow
                                    noMargin
                                    align="start"
                                    rowsPerPage={7}
                                    onPageChange={(page) =>
                                        console.log({ page })
                                    }
                                /> */}
                            </Table>
                        </div>
                    )}
                </Grid>
                {graficaROC && (
                    <Grid xs={12} sm={3} md={6}>
                        <Card
                            className="card-resultados"
                            css={{
                                overflow: "scroll",
                            }}
                        >
                            <Card.Header>
                                <Text h3>Gráfica ROC:</Text>
                            </Card.Header>
                            <Card.Body css={{ pt: "0" }}>
                                <img
                                    src={`data:image/png;base64,${graficaROC}`}
                                    alt="Mapa de calor de los datos"
                                />
                            </Card.Body>
                        </Card>
                    </Grid>
                )}
            </Grid.Container>
        </Page>
    );
};
