import React, { useEffect, useState } from "react";
import { auth, FBAuthProvider } from "../auth/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

function FaceBookAuth({ handleAuth }) {
    const [value, setValue] = useState('')
    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const handleFacebookLogin = () => {
        signInWithPopup(auth, FBAuthProvider).then((result) => {
            setUser(result.user);
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FBAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            // fetch facebook graph api to get user actual profile picture
            fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
                .then((response) => response.blob())
                .then((blob) => {
                    setProfilePicture(URL.createObjectURL(blob));
                })
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    })

    return (
        <div>

            {user ? (
                <>
                    <button className='btn btn-secondary btn-md'
                      >
                        LOGOUT
                    </button>
                    <h3>Welcome {user.displayName}</h3>
                    <p>{user.email}</p>
                    <div className='photo'>
                        <img src={profilePicture} alt="dp" referrerPolicy='no-referrer' />
                    </div>
                </>
            ) : (
                <button className="btn btn-primary btn-md"
                    onClick={handleFacebookLogin}>
                    Sign In With Facebook
                </button>
            )}
        </div>
    );
}
export default FaceBookAuth;