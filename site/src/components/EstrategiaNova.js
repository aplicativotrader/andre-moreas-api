import React from "react";
import '../App.css';
import Menu from '../components/Menu.js';
import Spinner from '../components/Spinner.js'
import {Link} from "react-router-dom";

import { Form } from '@unform/web';
import Input from '../misc/Input';

import {useState, useRef} from 'react';
import HttpClient from '../httpClient/HttpClient.js';

export default function EstrategiaNova ({}) {

  const formRef = useRef(null);

  const [isFetching, setIsFetching] = useState (false);
  const [cls, setCls] = useState ('');
  const [message, setMessage] = useState ('');

  let loader = '';

  function handleSubmit(data) {
    setIsFetching (true);

    HttpClient.registraEstrategia (data.estrategia, function (response) {

      setMessage (response.message);

      if (response.status == 'ok') {
        setCls ('alert alert-success');
        formRef.current.setFieldValue ('estrategia', '');
      }
      else {
        setCls ('alert alert-danger');
      }
      setIsFetching (false);
    })
  }

  if (isFetching) {
    loader = <Spinner title={'Registrando Estratégia'} subtitle={'Aguerde enquanto processamos sua solicitação'}/>
  }

  return (
    <div className="App">

      { loader }

      <div class='container'>
        <div class='row'>
          <div class='col-6 mx-auto'>

            <div class={cls}> {message} </div>

            <Form onSubmit={handleSubmit} ref={formRef}>
              <br />
              <b> Estratégia </b>
              <Input type='text' name='estrategia' class='form-control' />
              <br />
              <div class='col-12 text-right'>
                <button type='submit' class='btn btn-success'> Registrar </button>
                &nbsp;
                <Link to={'/estrategia'} class='btn btn-light'> Voltar </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
