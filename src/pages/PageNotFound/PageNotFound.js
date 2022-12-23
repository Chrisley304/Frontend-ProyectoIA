import React from "react";
// import { Card, Grid, Row, Text } from "@nextui-org/react";
import {Page} from "../../components/Page/Page";

export const PageNotFound = ()=>{
    return (
    <Page titulo="Error 404" showUser={false}>
        <h2>
        La página que solicitaste no existe. 😭
        </h2>
    </Page>);
}
