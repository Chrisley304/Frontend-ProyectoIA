import React, {useState, useEffect} from "react";
import { getAuth, onAuthStateChanged, browserLocalPersistence , setPersistence,} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyA-RUCsBfciNyVs4pHSQ1qTow7mevK68LU",
    authDomain: "algorithmia-45589.firebaseapp.com",
    projectId: "algorithmia-45589",
    databaseURL: "https://algorithmia-45589-default-rtdb.firebaseio.com",
    storageBucket: "algorithmia-45589.appspot.com",
    messagingSenderId: "550769310054",
    appId: "1:550769310054:web:9e9646a32f4cd4174870a7",
    measurementId: "G-J9V3JQX7NB",
};

// Custom Hook
export function useAuth() {
    const auth = getAuth();
    (async () => {
        await setPersistence(auth, browserLocalPersistence);
    })();
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
        return unsub;
    }, []);

    return currentUser;
}

// export async function upload(file, currentUser, setLoading) {
//     const fileRef = ref(storage, currentUser.uid + ".png");

//     setLoading(true);

//     const snapshot = await uploadBytes(fileRef, file);
//     const photoURL = await getDownloadURL(fileRef);

//     updateProfile(currentUser, { photoURL });

//     setLoading(false);
//     alert("Uploaded file!");
// }