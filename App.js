import React, { useState } from "react";
import { StyleSheet, View, useAuthState } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";

import TaskListScreen from "./app/screens/TaskListScreen";
import SignInScreen from "./app/screens/SignInScreen";
import {
  GetUser,
  SaveTaskToDB,
  SaveUserToDB,
  SetDB,
  SetUser,
} from "./app/components/Firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAH3-BfLeqN25j-wB5qWwwnM5-zT-YJHc",
  authDomain: "fir-testproject-9f16f.firebaseapp.com",
  databaseURL: "https://fir-testproject-9f16f-default-rtdb.firebaseio.com",
  projectId: "fir-testproject-9f16f",
  storageBucket: "fir-testproject-9f16f.appspot.com",
  messagingSenderId: "213819093132",
  appId: "1:213819093132:web:4f8c14efde56c3965e8ba9",
  measurementId: "G-STN7S73YN2",
};
firebase.initializeApp(firebaseConfig);

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  var db = firebase.firestore();

  // Listen for signin
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Set Firebase Info
      SetUser(user);
      SetDB(db);

      setSignedIn(true);

      // Save user to Firebase
      SaveUserToDB({
        email: user.email,
        displayName: user.displayName,
      });
    } else {
      setSignedIn(false);
    }
  });

  // Builds the UI
  return (
    <View style={styles.container}>
      {signedIn ? <TaskListScreen /> : <SignInScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
