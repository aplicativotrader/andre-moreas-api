import React from "react";
import '../App.css';
import Menu from '../components/Menu.js';
import Spinner from '../components/Spinner.js'
import {Link} from "react-router-dom";

import { Form } from '@unform/web';
import Input from '../misc/Input';
import Radio from "../misc/Radio";
import Select from '../misc/Select';

import {useState, useRef, useEffect} from 'react';
import HttpClient from '../httpClient/HttpClient.js';

export default function CallNovo ({}) {

  const formRef = useRef([]);

  const [isFetching, setIsFetching] = useState (false);
  const [cls, setCls] = useState ('');
  const [message, setMessage] = useState ('');

  const [pushFields, setPushFields] = useState ('');
  let loader = '';

  const [empresas, setEmpresas] = useState ()
  const [estrategias, setEstrategias] = useState ()

  useEffect (() => {

    formRef.current.setFieldValue('tipo_call', 'Compra');
    formRef.current.setFieldValue('isPush', 'N');

    HttpClient.getEmpresa (null, (response) => {

      let emprs = [];
      response.forEach (empr => {

        emprs.push ({
          value: empr,
          label: empr.sigla
        })
      })

      setEmpresas (emprs)
    })

    HttpClient.getEstrategia (null, (response) => {

      let estrs = []
      response.forEach (est => {

        if (est.status == 'A') {

          estrs.push ({
            value: est.estrategia,
            label: est.estrategia
          })
        }
      })

      setEstrategias (estrs)
    })
  }, []);

  function handleSubmit(data) {

    if (data.isPush == 'S') {
      if (data.title == '' || data.body == '') {
        setCls ('alert alert-danger');
        setMessage ('Preencha os campos de push!');

        return ;
      }

      data.push = {
        title: data.title,
        body: data.body
      }
    }

    setIsFetching (true);
    HttpClient.addCall (data, (response) => {

      if (response.status == 'ok') {
        setCls ('alert alert-success');
        setMessage (response.message);
      }
      else {
        setCls ('alert alert-danger');
        setMessage (response.message);
      }
      setIsFetching (false);
    })
  }

  if (isFetching) {
    loader = <Spinner title={'Registrando Post/Call'} subtitle={'Aguerde enquanto processamos sua solicitação'}/>
  }

  function changePushStatus () {

    if (formRef.current.getFieldValue ('isPush') == 'S') {

      let fields = <div class='col-12'>
                    Título Push
                    <Input type='text' name='title' class='form-control' />
                    <br/>
                    Texto Push
                    <Input type='text' name='body' class='form-control' />
                    <br/>
                  </div>

      setPushFields (fields)
    }
    else {
      setPushFields ('');
    }
  }

  return (
    <div className="App">

      { loader }

      <div class='container'>
        <div class='row'>
          <div class='col-6 mx-auto'>

            <h2> Post/Call - Novo </h2>
            <div class={cls}> {message} </div>

            <Form onSubmit={handleSubmit} ref={formRef}>

              <br />
              <Radio
                name='tipo_call'
                options={[
                  {id: 'Compra', label: "Compra",}, {id: "Venda", label: 'Venda'}
                ]}
              />
              <br />

              <Input type='text' name='titulo' class='form-control' />
              <br />

              Sigla - Empresa
              <Select
                name='empresa'
                options={empresas}
                class='form-control'
              />
              <br />

              Capital (%)
              <Input type='text' name='capital' class='form-control'/>
              <br />

              Entrada
              <Input type='text' name='entrada' class='form-control' />
              <br />

              Stop Loss
              <Input type='text' name='loss' class='form-control' />
              <br />

              Parcial
              <Input type='text' name='parcial' class='form-control' />
              <br />

              Final
              <Input type='text' name='final' class='form-control' />
              <br />

              Estratégia
              <Select
                name='estrategia'
                options={estrategias}
                class='form-control'
              />
              <br />

              Push?
              <Radio
                name="isPush"
                options={[{ id: 'S', label: "Sim" }, { id: 'N', label: "Não" }]}
                onClick={changePushStatus}
                defaultChecked='N'
              />
              <br/>

              {pushFields}
              <div class='col-12 text-right'>
                <button type='submit' class='btn btn-success'> Registrar </button>
                &nbsp;
                <Link to={'/post/call'} class='btn btn-light'> Voltar </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
