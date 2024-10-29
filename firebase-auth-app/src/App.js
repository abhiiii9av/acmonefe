// src/App.js
import React, { useState, useEffect } from "react";
import { auth } from "./FirebaseConfig";
import SignIn from "./SignIn";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        user.getIdToken().then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser(null);
        setToken("");
      }
    });

    return () => unsubscribe();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Hide after 2 seconds
    }).catch((error) => {
      console.error("Error copying token to clipboard: ", error);
    });
  };

  return (
    <div className="App">
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <SignIn />
      {user && (
        <div className="user-info">
          <h1>Welcome, {user.displayName}</h1>
          <p>Your Firebase ID Token:</p>
          <div className="token">{token}</div>
          <button onClick={() => auth.signOut()}>Sign Out</button>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
          {copySuccess && <div className="copy-success">Copied!</div>}
        </div>
      )}
    </div>
  );
};

export default App;