// src/App.js
import React, { useState, useEffect } from "react";
import { auth } from "./FirebaseConfig";
import SignIn from "./SignIn";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

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

  return (
    <div>
      <SignIn />
      {user && (
        <div>
          <h1>Welcome, {user.displayName}</h1>
          <p>Your Firebase ID Token: {token}</p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default App;
