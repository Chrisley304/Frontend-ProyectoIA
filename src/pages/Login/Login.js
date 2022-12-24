import React, {useState, useEffect} from "react";
import {Container, Input, useInput, Image, Grid, Text, User, Button, useTheme, Loading } from "@nextui-org/react";
import loginImage from "../../assets/img/login-background.jpg";
import logoImage from "../../assets/img/logoIA.png"
import "./Login.css";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../App";
import { useNavigate } from "react-router-dom";
import { useFirebaseApp, useUser } from "reactfire";
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { ModalError } from "../../components/ModalError/ModalError";
import "boxicons";

export const Login = () => {
    const { theme } = useTheme();
    const firebase = useFirebaseApp();
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebase);
    const [isLogged, setisLogged] = useGlobalState("isLogged");
    const [error, setError] = useState(false);
    const [googleIsLoading, setGoogleIsLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    useEffect(() => {
        window.localStorage.setItem("userIsLogged", isLogged);
        console.log("isLogged", isLogged);
    }, [isLogged]);

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const navigate = useNavigate();

    const { reset, bindings } = useInput("");

    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const helper = React.useMemo(() => {
        if (!userEmail)
            return {
                text: "",
                color: "",
            };
        const isValid = validateEmail(userEmail);
        return {
            text: isValid ? "Correct email" : "Enter a valid email",
            color: isValid ? "success" : "error",
        };
    }, [userEmail]);

    const handleEmailLoginSubmit = async () => {
        setIsLoading(true);
        await signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("user", user);
                setisLogged(true);
                // window.localStorage.setItem("userIsLogged", true);
                navigate("/");
            })
            .catch(async (error) => {
                setMensajeError("Credenciales incorrectas");
                setError(true);
            });
        setIsLoading(false);
    };

    const handleGoogleSubmit = async () => {
        setGoogleIsLoading(true);
        await signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setisLogged(true);
            // window.localStorage.setItem("userIsLogged", true);
            navigate("/");
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
        setGoogleIsLoading(false);
    }

    // const handleLogin = async () => {
    //     await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword);
    // };

    return (
        <>
            {error && <ModalError setError={setError} textoError={mensajeError} />}
            <Grid.Container>
                <Grid xs={12} sm={7} md={6}>
                    <Container>
                        <div className="login-logo">
                            <User
                                name="Algorithmia"
                                src={logoImage}
                                size="xl"
                            />
                        </div>
                        <div className="login-form-container">
                            <Grid.Container gap={2}>
                                <Grid>
                                    <Text h1 css={{ marginBottom: "$0" }}>
                                        ¡Hola! Bienvenido de vuelta
                                    </Text>
                                    <p className="login-description">
                                        Por favor ingresa tus datos para entrar
                                        a la aplicación.
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
                                        onChange={(e) =>
                                            setUserEmail(e.target.value)
                                        }
                                        placeholder="Ingresa tu correo electrónico"
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <Input
                                        type="password"
                                        label="Contraseña"
                                        placeholder="Ingresa tu contraseña"
                                        onChange={(e) =>
                                            setUserPassword(e.target.value)
                                        }
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
                                        shadow
                                        type="submit"
                                        css={{
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        }}
                                        onPress={handleEmailLoginSubmit}
                                    >
                                        {isLoading ? (
                                            <Loading type="points" />
                                        ) : (
                                            "Iniciar sesión"
                                        )}
                                    </Button>
                                </Grid>
                                <Grid xs={12} sm={6} css={{ marginTop: "$10" }}>
                                    <Button
                                        size="lg"
                                        color={theme.colors.text.value}
                                        bordered
                                        icon={
                                            <box-icon
                                                type="logo"
                                                name="google"
                                                color={theme.colors.text.value}
                                            ></box-icon>
                                        }
                                        css={{
                                            color: theme.colors.text.value,
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        }}
                                        onPress={handleGoogleSubmit}
                                    >
                                        {googleIsLoading ? (
                                            <Loading type="points" />
                                        ) : ("Login con Google")}
                                    </Button>
                                </Grid>
                                <Grid xs={12} css={{ marginTop: "$10" }}>
                                    <p className="register-button">
                                        ¿No tienes una cuenta?{" "}
                                        <Link to="/registro">Regístrate</Link>
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
        </>
    );
};
