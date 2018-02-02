import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBqZTZpSKdU1MGgkuu7IxXrPO9xzd3StAE",
    authDomain: "my-portfolio-7b385.firebaseapp.com",
    databaseURL: "https://my-portfolio-7b385.firebaseio.com",
    projectId: "my-portfolio-7b385",
    storageBucket: "my-portfolio-7b385.appspot.com",
    messagingSenderId: "1079339466214",
  };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};