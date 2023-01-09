import React from "react";
import { Card, Text, Checkbox, Button } from "@nextui-org/react";

export default function SeleccionCaracteristicas({
    columnasDataSet,
    mapaCalor,
    setSeleccionCaracteristicas,
}) {
    return (
        <Card
            className="card-resultados"
            css={{
                maxHeight: "600px",
                h: "100%",
                overflow: "scroll",
            }}
        >
            <Card.Header>
                <Text h3>Mapa de calor de los datos:</Text>
            </Card.Header>
            <Card.Body css={{ pt: "0" }}>
                <img
                    src={`data:image/png;base64,${mapaCalor}`}
                    alt="Mapa de calor de los datos"
                />
                <Checkbox.Group
                    color="secondary"
                    label="Selecciona las variables a utilizar"
                    onChange={setSeleccionCaracteristicas}
                    css={{ pt: "$10", pb: "$5" }}
                >
                    {columnasDataSet.map((columnName, _) => {
                        return (
                            <Checkbox size="sm" value={columnName}>
                                {columnName}
                            </Checkbox>
                        );
                    })}
                </Checkbox.Group>
            </Card.Body>
        </Card>
    );
}
