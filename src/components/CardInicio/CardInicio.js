import { Card, Col, Text } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export const CardInicio = ({ titulo, categoria, imagen, linkPagina }) => {
    let navigate = useNavigate();
    const routeChange = () => {
        navigate(linkPagina);
    };

    return (
        <Card isPressable onClick={routeChange}>
            <Card.Header
                css={{
                    position: "absolute",
                    zIndex: 1,
                    top: 0,
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0.8982186624649859) 0%, rgba(0,0,0,0.5004595588235294) 50%, rgba(0,0,0,0) 100%);",
                }}
            >
                <Col>
                    <Text
                        size={12}
                        weight="bold"
                        transform="uppercase"
                        color="#ffffffAA"
                    >
                        {categoria}
                    </Text>
                    <Text h4 color="white">
                        {titulo}
                    </Text>
                </Col>
            </Card.Header>
            <Card.Image
                src={imagen}
                objectFit="cover"
                width="100%"
                height={340}
                alt={titulo}
            />
        </Card>
    );
};
