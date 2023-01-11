import React, { useState } from "react";
import { Card, Text, Checkbox } from "@nextui-org/react";

export default function SeleccionCaracteristicasClasificacion({
    columnasDataSet,
    mapaCalor,
    setSeleccionCaracteristicas,
    variableClase,
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
                <Text h3>Selección de características:</Text>
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
                            <Checkbox
                                size="sm"
                                isDisabled={
                                    columnName === variableClase ||
                                    variableClase === ""
                                }
                                value={columnName}
                            >
                                {columnName}
                            </Checkbox>
                        );
                    })}
                </Checkbox.Group>
            </Card.Body>
        </Card>
    );
}
