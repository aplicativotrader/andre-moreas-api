import '../App.css';
import Menu from '../components/Menu.js';
import {useState, useRef, useEffect} from 'react';

import { Form } from '@unform/web';
import Input from '../misc/Input';

import HttpClient from '../httpClient/HttpClient';

function Login() {

  const [cls, setCls] = useState ('');
  const [message, setMessage] = useState ('');

  const formRef = useRef(null);

  function handleSubmit (data) {

    if (data.title != '' && data.body != '') {

      HttpClient.sendPushNotify (data.title, data.body, (response) => {

        if (response == 'OK') {

          setCls ('alert alert-success');
          setMessage ('Notificação enviada com sucesso.');
        }
        else {

          setCls ('alert alert-danger');
          setMessage ('Ocorreu um erro ao enviar a notificação. Tente novamente.');
        }
      })
    }
    else {
      setCls ('alert alert-danger');
      setMessage ('Todos os campos devem ser preenchidos.');
    }
  }

  return (

    <div className="App">

      <div class='container'>


        <Form onSubmit={handleSubmit} ref={formRef}>
          <div class='row'>
            <div class='col-6 mx-auto'>

              <h3> Enviar Push </h3>
              <div class={cls}> {message} </div>
              <br/>
              <b> Título Push </b>
              <Input type='text' name='title' class='form-control'/>

              <br/>
              <b> Texto Push </b>
              <Input type='text' name='body' class='form-control' />

              <br/>
              <div class='col-12 text-right'>
                <button class='btn btn-success'> Enviar </button>
              </div>

            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
