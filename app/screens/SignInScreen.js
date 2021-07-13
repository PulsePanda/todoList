import React, { useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import App from "../../App";
import TaskListScreen from "./TaskListScreen";

function SignInScreen(props) {
  const [signedIn, setSignedIn] = useState(true);
  const [user, setUser] = useState();
  const [uid, setUid] = useState();
  const [token, setToken] = useState();

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    // auth.signInWithGoogle();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        let credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        setToken(credential.accessToken);
        // The signed-in user info.
        setUser(result.user);
        // ...
        App.setSignedIn(true);
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User signed in
      setUid(user.uid);
    } else {
      // User signed out
      setUid(null);
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the TODO List</Text>
      <Button
        onPress={signInWithGoogle}
        color="darkorange"
        title="Sign in with Google"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2b2b",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "white",
    paddingBottom: 30,
  },
});

export default SignInScreen;
