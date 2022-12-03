import React from "react";
import "./Page.css"
// import { Card, Grid, Row, Text } from "@nextui-org/react";

export const Page = (props)=>{
    return (
        <section className="page-container">
            {props.children}
        </section>
    );
}