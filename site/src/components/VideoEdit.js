import React from "react";
import '../App.css';
import Menu from '../components/Menu.js';
import Spinner from '../components/Spinner.js'
import { Link, useParams } from "react-router-dom";

import { Form } from '@unform/web';
import Input from '../misc/Input';

import {useState, useRef, useEffect} from 'react';
import HttpClient from '../httpClient/HttpClient.js';

export default function VideoEdit ({}) {

  let { _id } = useParams();

  const formRef = useRef([]);

  const [isFetching, setIsFetching] = useState (false);
  const [isSaving, setIsSaving] = useState (false);
  const [cls, setCls] = useState ('');
  const [message, setMessage] = useState ('');

  let loader = '';
  let saving = '';

  useEffect (() => {

    setIsFetching (true);
    HttpClient.getVideoById (_id, (response) => {

      formRef.current.setFieldValue ('titulo', response.titulo);
      formRef.current.setFieldValue ('subtitulo', response.subtitulo);
      formRef.current.setFieldValue ('link', response.link);
      setIsFetching (false);
    })
  }, []);

  function handleSubmit(data) {
    setIsSaving (true)

    data._id = _id;
    HttpClient.updateVideo (data, (response) => {

      if (response.status == 'ok') {
        setCls ('alert alert-success');
        setMessage (response.message);
      }
      else {
        setCls ('alert alert-danger');
        setMessage (response.message);
      }

      setIsSaving (false)
    });
  }

  if (isFetching) {
    loader = <Spinner title={'Carregando Vídeo'} subtitle={'Aguerde enquanto processamos sua solicitação'}/>
  }

  if (isSaving) {
    saving = <Spinner title={'Salvando Alterações'} subtitle={'Aguerde enquanto processamos sua solicitação'}/>
  }

  return (
    <div className="App">

      { loader }
      { saving }

      <div class='container'>
        <div class='row'>
          <div class='col-6 mx-auto'>

            <h2> Post/Vídeo - Editar </h2>
            <div class={cls}> {message} </div>

            <Form onSubmit={handleSubmit} ref={formRef}>
              <br />
              Título
              <Input type='text' name='titulo' class='form-control'/>
              <br />
              Subtítulo
              <Input type='text' name='subtitulo' class='form-control'/>
              <br />
              Link
              <Input type='text' name='link' class='form-control' />
              <br />

              <div class='col-12 text-right'>
                <button type='submit' class='btn btn-success'> Salvar </button>
                &nbsp;
                <Link to={'/post/video'} class='btn btn-light'> Voltar </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
