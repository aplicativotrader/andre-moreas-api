import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
import HttpClient from '../httpClient/HttpClient';

import {useState} from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyCEd9PDflG1dcA4c8H5IT0gLDfBZM8ejVA",
  authDomain: "teste-1533811144366.firebaseapp.com",
  projectId: "teste-1533811144366",
  storageBucket: "teste-1533811144366.appspot.com",
  messagingSenderId: "64101630535",
  appId: "1:64101630535:web:ab56c8ba60403b8e45a762"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
else {
  firebase.app(); // if already initialized, use that one
}

var db = firebase.firestore();

function auth (email, senha, callback) {

  // verifica se o email é valido para admin e se é usuário registrado.
  HttpClient.checkAdm (email, (response) => {

    if (response.status == 'error') {

      alert ('O usuário não possui credenciais de acesso.')

      callback ({
        isLogged: false
      });

      return;
    }

    firebase.auth().signInWithEmailAndPassword (email, senha)
      .then((userCredential) => {

        // Signed in
        var user = userCredential.user;
        callback ({
          isLogged: true,
          user: user
        });
      })
      .catch((error) => {
        callback ({
          isLogged: false
        });
      });
  })
}

function checkAuth (user, callback) {

  firebase.auth().onAuthStateChanged(function(user) {

  if (user) {

    callback (true);
  } else {

    callback (false);
  }
});
}

function loggout (callback) {

  firebase.auth().signOut().then(() => {
    callback (true);
    return;
  }).catch((error) => {
    callback (false);
    return;
  });
}

function addUsuario (email, callback) {

  // verifica se email ja esta registrado
  let exit = false;

  db.collection ('usuarios').where ('email', '==', email.toLowerCase())
    .get ()
    .then ( (querySnapshot) => {

      let count = 0;
      querySnapshot.forEach ( (doc) => {
        count++
      });

      if (count == 0) {

        db.collection('usuarios').add ({
          email: email.toLowerCase (),
          status: "Habilitado",
          tipo: "usuario"
        })
        .then ( (ref) => {
          callback ({
                      status: true,
                      message: 'E-mail registrado com sucesso.'
                    })
        })
        .catch ((error) => {
          console.log (error)
          callback ({
                      status: false,
                      message: 'Não foi possível registrar o e-mail.'
                    });
        });
      }
      else {
        callback ({
                    status: false,
                    message: 'E-mail já em uso.'
                  });
      }
    });
}

function getUsuarios (_id, callback) {

  let usuarios = [];
  let query = db.collection("usuarios");

  if (_id != null) {

    query.doc (_id)
      .get ()
      .then ((querySnapshot) => {
        callback (querySnapshot.data())
      })

    return;
  }

  query.orderBy("email")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        let u = {
              id:       doc.id,
              nome:     doc.data ().nome,
              email:    doc.data ().email,
              celular:  doc.data ().celular,
              datahora: doc.data ().datahora,
              status:   doc.data ().status,
              tipo:     doc.data ().tipo
            };
        usuarios.push (u)
      });

    callback (usuarios)
  });
}

function updateUsuario (_id, email, tipo, status, callback) {

  db.collection("usuarios").doc (_id).update ({email: email, tipo: tipo, status: status})
  callback (true);
}

function addEmLote (emailList, callback) {

  emailList.forEach ((email, key) => {

    // atualiza registros
    db.collection ('usuarios').where ('email', '==', email.toLowerCase())
    .get ()
    .then ( (querySnapshot) => {
      querySnapshot.forEach((doc) => {

        db.collection ('usuarios').doc (doc.id).update ({status: "Habilitado"});
        emailList.splice (key, 1);
      })
    });
  });

  emailList.forEach ((email, key) => {

    addUsuario (email, () => {});
  });

  callback (true);
}

function removeEmLote (emailList, callback) {

  emailList.forEach ((email, key) => {

    // atualiza registros
    db.collection ('usuarios').where ('email', '==', email.toLowerCase())
    .get ()
    .then ( (querySnapshot) => {
      querySnapshot.forEach((doc) => {

        db.collection ('usuarios').doc (doc.id).update ({status: "Desabilitado"});
      })
    });
  });
}

function getWppNum (callback) {

  db.collection("wpp")
  .get()
  .then((wppNum) => {

    wppNum.forEach((doc) => {

      callback (doc.data ().num);
    });
  })
  .catch((error) => {

    callback (null)
  });
}

function updateWppNum (num, callback) {

  db.collection ('wpp')
  .get ()
  .then ( (querySnapshot) => {
    querySnapshot.forEach((doc) => {

      db.collection ('wpp').doc (doc.id).update ({num: num});
      callback ('done');
    })
  });
}

export default {
  auth,
  checkAuth,
  loggout,
  getUsuarios,
  addUsuario,
  updateUsuario,
  addEmLote,
  removeEmLote,
  getWppNum,
  updateWppNum
}
