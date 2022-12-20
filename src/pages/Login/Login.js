import React, {useState, useEffect} from "react";
import {Container, Input, useInput, Image, Grid, Text, User, Button } from "@nextui-org/react";
import loginImage from "../../assets/img/login-background.jpg";
import logoImage from "../../assets/img/logoIA.png"
import "./Login.css";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../App";
import { useNavigate } from "react-router-dom";
import "firebase/auth";
import { useFirebaseApp, useUser } from "reactfire";
import { async } from "@firebase/util";

export const Login = () => {

    // const firebase = useFirebaseApp();
    // const user = useUser();
    const [isLogged, setisLogged] = useGlobalState("isLogged");

    useEffect(() => {
        window.localStorage.setItem("userIsLogged", isLogged);
        console.log("isLogged", isLogged);
    }, [isLogged]);

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();

    const { value, reset, bindings } = useInput("");

    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const helper = React.useMemo(() => {
        if (!value)
            return {
                text: "",
                color: "",
            };
        const isValid = validateEmail(value);
        return {
            text: isValid ? "Correct email" : "Enter a valid email",
            color: isValid ? "success" : "error",
        };
    }, [value]);

    const handleSubmit = () => {
        // e.preventDefault();
        setisLogged(true);
        window.localStorage.setItem("userIsLogged", true);
        navigate("/");
    }

    // const handleLogin = async () => {
    //     await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword);
    // };
    const handleSubmit2 = () => {
        setisLogged(false);
    };

    return (
        <Grid.Container>
            <Grid xs={12} sm={7} md={6}>
                <Container>
                    <div className="login-logo">
                        <User name="Algorithmia" src={logoImage} size="xl" />
                    </div>
                    <div className="login-form-container">
                        <Grid.Container gap={2}>
                            <Grid>
                                <Text h1 css={{ marginBottom: "$0" }}>
                                    Iniciar sesión
                                </Text>
                                <p className="login-description">
                                    Por favor ingresa tus datos para entrar a la
                                    aplicación.
                                </p>
                            </Grid>

                            <Grid xs={12}>
                                <Input
                                    {...bindings}
                                    clearable
                                    shadow={false}
                                    onClearClick={reset}
                                    status={helper.color}
                                    color={helper.color}
                                    helperColor={helper.color}
                                    helperText={helper.text}
                                    type="email"
                                    label="Correo electrónico"
                                    width="100%"
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder="Ingresa tu correo electrónico"
                                />
                            </Grid>
                            <Grid xs={12}>
                                <Input
                                    type="password"
                                    label="Contraseña"
                                    placeholder="Ingresa tu contraseña"
                                    onChange={(e) => setUserPassword(e.target.value)}
                                    helperText={
                                        <Link className="password-forgotten-button">
                                            Olvide mi contraseña
                                        </Link>
                                    }
                                    width="100%"
                                />
                            </Grid>
                            <Grid xs={12} sm={6} css={{ marginTop: "$10" }}>
                                <Button
                                    size="lg"
                                    css={{
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                    }}
                                    onPress={handleSubmit2}
                                >
                                    Iniciar sesión
                                </Button>
                            </Grid>
                            <Grid xs={12} sm={6} css={{ marginTop: "$10" }}>
                                <Button
                                    size="lg"
                                    css={{
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                    }}
                                    onPress={handleSubmit}
                                >
                                    Iniciar sesión con Google
                                </Button>
                            </Grid>
                            <Grid xs={12} css={{ marginTop: "$10" }}>
                                <p className="register-button">
                                    ¿No tienes una cuenta?{" "}
                                    <Link>Regístrate</Link>
                                </p>
                            </Grid>
                        </Grid.Container>
                    </div>
                    <p className="login-footer">
                        Made with ❤️ by{" "}
                        <a
                            href="https://chrisley.dev/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Christian Leyva
                        </a>
                    </p>
                </Container>
            </Grid>
            <Grid xs={12} sm={5} md={6}>
                <Image
                    src={loginImage}
                    objectFit="cover"
                    autoResize
                    height="100vh"
                    width="100%"
                    className="login-image"
                />
                <span className="login-image-credits">
                    Photo by:{" "}
                    <a
                        className="login-image-author"
                        href="https://unsplash.com/es/fotos/zwd435-ewb4"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Andrea De Santis
                    </a>
                </span>
            </Grid>
        </Grid.Container>
    );
};
