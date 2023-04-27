import React, { useEffect, useState } from "react";
import { auth, provider } from "../auth/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

function GoogleAuth({ handleAuth }) {
    const [value, setValue] = useState('')
    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            console.log(data, "Data");
            if (data) {

                handleAuth(data)
            }
        })
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    })

    return (
        <div>

            <button onClick={handleClick}>Signin With Google</button>
        </div>
    );
}
export default GoogleAuth;