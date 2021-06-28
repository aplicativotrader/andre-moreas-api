import '../App.css';
import Menu from '../components/Menu.js';
import {useState, useRef, useEffect} from 'react';

import { Form } from '@unform/web';
import Input from '../misc/Input';

import FirebaseClient from '../httpClient/FirebaseClient';
import Storage from '../Storage/Storage';
import { useHistory } from 'react-router-dom'

function Login() {

  const [cls, setCls] = useState ('');
  const [message, setMessage] = useState ('');

  const formRef = useRef(null);
  let history = useHistory();

  function handleSubmit (data) {

    if (
          (!data.hasOwnProperty ('email') || data.email == '')
          || (!data.hasOwnProperty ('password') || data.password == '')
        ) {

      setCls ('alert alert-danger');
      setMessage ('Preencha os campos de E-mail e Senha');

      return;
    }

    FirebaseClient.auth (data.email, data.password, function (response) {

      if (response.isLogged) {

        Storage.setData ('user', response.user, () => history.push ('/usuario'));
      }
      else {

        setCls ('alert alert-danger');
        setMessage ('E-mail e/ou senha inválido (s)');
      }
    });
  }

  return (

    <div className="App">

      <div class='container'>

        <div class={cls}> {message} </div>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <div class='row'>
            <div class='col-6 mx-auto'>
              <br/>
              <b> E-mail </b>
              <Input type='email' name='email' class='form-control'/>

              <br/>
              <b> Senha </b>
              <Input type='password' name='password' class='form-control' />

              <br/>
              <div class='col-12 text-right'>
                <button class='btn btn-success'> Entrar </button>
              </div>

            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
