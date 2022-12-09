import React from "react";
import { Table } from "@nextui-org/react";

export const TablaAsociacion = ({data,cols}) =>{

    return (
        <Table
            aria-label="Tabla generada con las reglas de asociacion"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
        >
            <Table.Header columns={cols}>
                {(column) => (
                    <Table.Column key={column.key}>{column.label}</Table.Column>
                )}
            </Table.Header>
            <Table.Body items={data}>
                {(item) => (
                    <Table.Row key={item[""]}>
                        {(columnKey) => (
                            <Table.Cell>{item[columnKey]}</Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
};