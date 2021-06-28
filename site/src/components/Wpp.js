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

    FirebaseClient.updateWppNum (data.numero, (response) => {
      setCls ('alert alert-success');
      setMessage ('O número foi salvo.');
    });
  }

  useEffect (() => {

    FirebaseClient.getWppNum ((numero) => {

      if (numero != null) {
        formRef.current.setFieldValue ('numero', numero);
      }
      else {
        formRef.current.setFieldValue ('numero', '');
      }

    })
  }, []);

  return (

    <div className="App">

      <div class='container'>

        <div class={cls}> {message} </div>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <div class='row'>
            <div class='col-6 mx-auto'>
              <br/>
              <b> Número Whatsapp</b> <br/>
              <small class='text-secondary'> Apenas Número. Ex: 5511999995555</small>
              <Input type='text' name='numero' class='form-control'/>

              <br/>
              <div class='col-12 text-right'>
                <button class='btn btn-success'> Salvar </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
