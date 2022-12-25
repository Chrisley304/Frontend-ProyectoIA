import React, {useState, useEffect} from "react";
import {Container, Input, useInput, Image, Grid, Text, User, Button, useTheme, Loading } from "@nextui-org/react";
import loginImage from "../../assets/img/walle.jpg";
import logoImage from "../../assets/img/logoIA.png"
import "./Registro.css";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../App";
import { useNavigate } from "react-router-dom";
// Firebase
import { useFirebaseApp, useUser } from "reactfire";
// import { getDatabase } from "firebase/database";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithPopup,
    GoogleAuthProvider,
    browserLocalPersistence,
    setPersistence,
} from "firebase/auth";
import "boxicons";
import { ModalError } from "../../components/ModalError/ModalError";
// import { async } from "@firebase/util";

export const Registro = () => {

    const firebase = useFirebaseApp();
    const auth = getAuth(firebase);
    // const db = getDatabase(firebase);
    const provider = new GoogleAuthProvider();

    const {theme} = useTheme();
    // const user = useUser();
    const [isLogged, setisLogged] = useGlobalState("isLogged");
    const [googleIsLoading, setGoogleIsLoading] = useState(false);


    useEffect(() => {
        window.localStorage.setItem("userIsLogged", isLogged);
        console.log("isLogged", isLogged);
    }, [isLogged]);

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const navigate = useNavigate();
    const { reset, bindings } = useInput("");
    const [error, setError] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);

    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };
    
    const isConfirmPasswordValid = confirmPassword === userPassword && userPassword !== "";
    
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

    const isFormValid= helper.color === "success" && isConfirmPasswordValid && nombre !== "" && apellido !== "";
    
    const handleEmailRegisterSubmit = async () => {
        setEmailLoading(true);
        await setPersistence(auth, browserLocalPersistence).then(async () => {
            createUserWithEmailAndPassword(auth,userEmail, userPassword).then((userCredential) => {
            }).catch(async (error) => {
                setError(true);
                const errorMessage = error.message;
                console.log("error", errorMessage);
            });
            if (!error){
                const user = auth.currentUser;
                await updateProfile(user, {
                    displayName: nombre + " " + apellido,
                });
                setisLogged(true);
                // window.localStorage.setItem("userIsLogged", true);
                navigate("/");
            }
        });
        setEmailLoading(false);
    }

    const handleGoogleSubmit = async () => {
        setGoogleIsLoading(true);
        await setPersistence(auth, browserLocalPersistence).then(async () => {
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                // const user = result.user;
                setisLogged(true);
                // window.localStorage.setItem("userIsLogged", true);
                navigate("/");
                // ...
            }).catch((error) => {
                // Handle Errors here.
                // const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                console.log("error", errorMessage);
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
            });
        });
        setGoogleIsLoading(false);
    }

    return (
        <>
            {error && (
                <ModalError
                    setError={setError}
                    textoError={"El correo electrónico ya esta registrado"}
                />
            )}
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
                                        ¡Bienvenido a Algorithmia!
                                    </Text>
                                    <p className="login-description">
                                        Por favor ingresa tus datos para
                                        registrarte en la aplicación.
                                    </p>
                                </Grid>

                                <Grid xs={12}>
                                    <Input
                                        clearable
                                        label="Nombre"
                                        width="100%"
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                        placeholder="Ingresa tu nombre"
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <Input
                                        clearable
                                        label="Apellidos"
                                        width="100%"
                                        onChange={(e) =>
                                            setApellido(e.target.value)
                                        }
                                        placeholder="Ingresa tu nombre"
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <Input
                                        {...bindings}
                                        clearable
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
                                        status={
                                            userPassword.length === 0
                                                ? ""
                                                : userPassword.length >= 8
                                                ? "success"
                                                : "error"
                                        }
                                        helperColor={
                                            userPassword.length === 0
                                                ? ""
                                                : userPassword.length >= 8
                                                ? ""
                                                : "error"
                                        }
                                        helperText={
                                            userPassword.length === 0
                                                ? ""
                                                : userPassword.length >= 8
                                                ? ""
                                                : "La contraseña debe contener al menos 8 caracteres"
                                        }
                                        placeholder="Ingresa tu contraseña"
                                        onChange={(e) =>
                                            setUserPassword(e.target.value)
                                        }
                                        width="100%"
                                    />
                                </Grid>
                                <Grid xs={12}>
                                    <Input
                                        type="password"
                                        label="Verificación de contraseña"
                                        placeholder="Ingresa nuevamente tu contraseña"
                                        status={
                                            confirmPassword !== ""
                                                ? isConfirmPasswordValid
                                                    ? "success"
                                                    : "error"
                                                : ""
                                        }
                                        helperText={
                                            confirmPassword !== ""
                                                ? isConfirmPasswordValid
                                                    ? ""
                                                    : "Las contraseñas no coinciden"
                                                : ""
                                        }
                                        helperColor={
                                            isConfirmPasswordValid
                                                ? ""
                                                : "error"
                                        }
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        width="100%"
                                    />
                                </Grid>
                                <Grid xs={12} sm={6} css={{ marginTop: "$10" }}>
                                    <Button
                                        size="lg"
                                        disabled={!isFormValid}
                                        css={{
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        }}
                                        onPress={handleEmailRegisterSubmit}
                                    >
                                        {emailLoading ? (
                                            <Loading type="points" color="white" />
                                        ) : (
                                            "Registrarse"
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
                                            fontSize: "0.9rem",
                                        }}
                                        onPress={handleGoogleSubmit}
                                    >
                                        {googleIsLoading ? (
                                            <Loading type="points" />
                                        ) : (
                                            "Continua con Google"
                                        )}
                                    </Button>
                                </Grid>
                                <Grid xs={12} css={{ marginTop: "$10" }}>
                                    <p className="register-button">
                                        ¿Ya tienes una cuenta?{" "}
                                        <Link to="/login">Inicia sesión</Link>
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
                        width="50vw"
                        className="login-image"
                        css={{ position: "fixed" }}
                    />
                    <span className="login-image-credits-register">
                        Photo by:{" "}
                        <a
                            className="login-image-author"
                            href="https://unsplash.com/es/fotos/HBGYvOKXu8A"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Jason Leung
                        </a>
                    </span>
                </Grid>
            </Grid.Container>
        </>
    );
};
