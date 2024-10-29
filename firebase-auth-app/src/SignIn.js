// src/SignIn.js
import React from 'react';
import { auth, googleProvider } from './FirebaseConfig';

const SignIn = () => {
  const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
};

export default SignIn;