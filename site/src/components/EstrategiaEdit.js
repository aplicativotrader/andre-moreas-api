import React from "react";
import '../App.css';
import Menu from '../components/Menu.js';
import Spinner from '../components/Spinner.js'
import { Link, useParams } from "react-router-dom";

import { Form } from '@unform/web';
import Input from '../misc/Input';
import Radio from "../misc/Radio";

import {useState, useRef, useEffect} from 'react';
import HttpClient from '../httpClient/HttpClient.js';

export default function EstrategiaEdit ({}) {

  let { _id } = useParams();

  const formRef = useRef(null);

  const [isFetching, setIsFetching] = useState (false);
  const [isLoading, setIsLoading] = useState (true);
  const [cls, setCls] = useState ('');
  const [message, setMessage] = useState ('');
  const [estrategia, setEstrategia] = useState ({});
  let loader = '';
  let loading = '';

  useEffect (() => {

    HttpClient.getEstrategia (_id, function (response) {
      setEstrategia (response);
      formRef.current.setFieldValue ('status', response.status);
      formRef.current.setFieldValue ('estrategia', response.estrategia);

      setIsLoading (false);
    })
  }, []);

  function handleSubmit(data) {

    setIsFetching (true);
    HttpClient.updateEstrategia (estrategia._id, data.estrategia, data.status, function (response) {

      setMessage (response.message);

      if (response.status == 'ok') {
        setCls ('alert alert-success');
      }
      else {
        setCls ('alert alert-danger');
      }
      setIsFetching (false);
    })
  }

  if (isFetching) {
    loader = <Spinner title={'Atualizando Estratégia'} subtitle={'Aguerde enquanto processamos sua solicitação'}/>
  }

  if (isLoading) {
    loading = <Spinner title={'Carregando Estratégia'} subtitle={'Aguerde...'}/>;
  }

  return (
    <div className="App">
      { loading }
      { loader }

      <div class='container'>
        <div class='row'>
          <div class='col-6 mx-auto'>

            <div class={cls}> {message} </div>

            <Form onSubmit={handleSubmit} ref={formRef}>
              <br />
              <b> Estratégia </b>
              <Input type='text' name='estrategia' class='form-control'/>
              <br />

              <div class='col-12 text-center'>
                <Radio
                  name="status"
                  options={[{ id: "A", label: "Ativo" }, { id: "I", label: "Inativo" }]}
                />
              </div>

              <br />
              <div class='col-12 text-right'>
                <button type='submit' class='btn btn-success'> Salvar </button>
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
