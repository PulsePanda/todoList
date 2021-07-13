import React, { useState } from "react";
import firebase from "firebase/app";

let user;
let uid;
let db;
let init = false;

const collection = "users";

function Firestore(props) {}

export function SaveUserToDB(tdata) {
  let data = tdata;

  let docRef = db.collection(collection).doc(uid);

  docRef.set(data, { merge: true });
}

export function SaveTaskToDB(tdata) {
  let data = tdata;

  let docRef = db.collection(collection + "/" + uid + "/tasks").doc(data.title);

  docRef.set(data);
}

export async function ReadTaskList() {
  //   if (!init) {
  init = true;
  let docRef = db.collection(collection + "/" + uid + "/tasks");
  const snapshot = await docRef.where("done", "==", false).get();
  let docArray = [];

  snapshot.forEach((doc) => {
    docArray = [...docArray, doc.id];
  });

  return docArray;
  //   }
}

export function SetDB(tdb) {
  db = tdb;
}

export function GetDB() {
  return db;
}

export function SetUser(tuser) {
  user = tuser;
  uid = user.uid;
}

export function GetUser() {
  return user;
}

export default Firestore;
