import React from "react";
import '../App.css';
import Menu from '../components/Menu.js';
import Spinner from '../components/Spinner.js'
import {Link, useParams} from "react-router-dom";

import { Form } from '@unform/web';
import Input from '../misc/Input';
import Radio from "../misc/Radio";
import Select from '../misc/Select';

import {useState, useRef, useEffect} from 'react';
import HttpClient from '../httpClient/HttpClient.js';

export default function CallEditar ({}) {

  let { _id } = useParams ()
  const formRef = useRef([]);
  const [isLoading, setIsLoading] = useState (true)
  const [isFetching, setIsFetching] = useState (false);
  const [cls, setCls] = useState ('');
  const [message, setMessage] = useState ('');

  const [pushFields, setPushFields] = useState ('');
  let loader = '';

  const [call, setCall] = useState ([])
  const [estrategias, setEstrategias] = useState ()
  const [sigla, setSigla] = useState ()
  let loading = '';

  useEffect (() => {

    HttpClient.getCall (_id, (response) => {

      setSigla (response.empresa.sigla)
      setCall (response);

      formRef.current.setFieldValue('tipo_call', response.tipo_call);
      formRef.current.setFieldValue('isPush', 'N');
      formRef.current.setFieldValue('titulo', response.titulo);
      formRef.current.setFieldValue('capital', response.capital);
      formRef.current.setFieldValue('entrada', response.entrada);
      formRef.current.setFieldValue('loss', response.loss);
      formRef.current.setFieldValue('parcial', response.parcial);
      formRef.current.setFieldValue('final', response.final);
      formRef.current.setFieldValue('is_entrada', response.is_entrada);
      formRef.current.setFieldValue('is_loss', response.is_loss);
      formRef.current.setFieldValue('is_parcial', response.is_parcial);
      formRef.current.setFieldValue('is_final', response.is_final);
      formRef.current.setFieldValue('status', response.status);

      HttpClient.getEstrategia (null, (response2) => {

        let estrs = []
        response2.forEach (est => {

          if (est.status == 'A') {

            estrs.push ({
              value: est.estrategia,
              label: est.estrategia
            })
          }
        })

        setEstrategias (estrs)
        setIsLoading (false)
      })
    })

  }, [isLoading]);

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
    data._id = _id
    HttpClient.updateCall (data, (response) => {

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

  if (isFetching) {
    loader = <Spinner title={'Atualizando Post/Call'} subtitle={'Aguerde enquanto processamos sua solicitação'}/>
  }

  if (isLoading) {
    loading = <Spinner title={'Carregando Post/Call'} subtitle={'Aguerde enquanto processamos sua solicitação'}/>
  }



  return (
    <div className="App">

      { loader }
      {loading}

      <div class='container'>
        <div class='row'>
          <div class='col-6 mx-auto'>

            <h2> Post/Call - Editar </h2>
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

              <Radio
                name="status"
                options={[
                          { id: 'Ativo', label: "Ativo" },
                          { id: 'Cancelado', label: "Cancelado"},
                          { id: 'Finalizado', label: 'Finalizado'}
                        ]}
                defaultChecked='N'
              />

              <br />

              <Input type='text' name='titulo' class='form-control' />
              <br />

              Sigla - Empresa
              <Input type='text' name='empresa' value={sigla} readonly class='form-control' />
              <br />

              Capital (%)
              <Input type='text' name='capital' class='form-control'/>
              <br />

              <b> Entrada </b> <br/>
              Bateu?
              <Radio
                name="is_entrada"
                options={[{ id: 'S', label: "Sim" }, { id: 'N', label: "Não" }]}
                defaultChecked='N'
                style={{display: 'inline'}}
              />
              <Input type='text' name='entrada' class='form-control' />
              <br />

              <b> Stop Loss </b> <br/>
              Bateu?
              <Radio
                name="is_loss"
                options={[{ id: 'S', label: "Sim" }, { id: 'N', label: "Não" }]}
                defaultChecked='N'
                style={{display: 'inline'}}
              />
              <Input type='text' name='loss' class='form-control' />
              <br />

              <b> Parcial </b> <br/>
              Bateu?
              <Radio
                name="is_parcial"
                options={[{ id: 'S', label: "Sim" }, { id: 'N', label: "Não" }]}
                defaultChecked='N'
                style={{display: 'inline'}}
              />
              <Input type='text' name='parcial' class='form-control' />
              <br />

              <b> Final </b><br/>
              Bateu?
              <Radio
                name="is_final"
                options={[{ id: 'S', label: "Sim" }, { id: 'N', label: "Não" }]}
                defaultChecked='N'
                style={{display: 'inline'}}
              />
              <Input type='text' name='final' class='form-control' />
              <br />

              Estratégia
              <Select
                name='estrategia'
                defaultValue={{
                  value: call.estrategia,
                  label: call.estrategia
                }}
                options={estrategias}
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
                <button type='submit' class='btn btn-success'> Salvar </button>
                &nbsp;
                <Link to={'/post/call'} class='btn btn-light'> Voltar </Link>
              </div>
            </Form>
            <br/>
          </div>
        </div>
      </div>
    </div>
  );

}
