// src/SignIn.js
import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const SignIn = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

export default SignIn;
