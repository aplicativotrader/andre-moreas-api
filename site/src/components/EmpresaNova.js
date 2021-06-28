import React from "react";
import '../App.css';
import Menu from '../components/Menu.js';
import Spinner from '../components/Spinner.js'
import {Link} from "react-router-dom";

import { Form } from '@unform/web';
import Input from '../misc/Input';

import {useState, useRef} from 'react';
import HttpClient from '../httpClient/HttpClient.js';

import FileHelper from '../helper/FileHelper';

export default function EstrategiaNova ({}) {

  const formRef = useRef(null);

  const [isFetching, setIsFetching] = useState (false);
  const [cls, setCls] = useState ('');
  const [message, setMessage] = useState ('');

  // file upload control
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  // -- //

  let loader = '';

  function handleSubmit(data) {

    if (!isFilePicked) {

      setCls ('alert alert-danger');
      setMessage ('Selecione uma imagem.');

      return false;
    }

    if (selectedFile.size > (1024 * 2000)) {

      setCls ('alert alert-danger');
      setMessage ('O limite de peso para imagens é de 2MB.');

      return false;
    }

    //le dados da imagem
    FileHelper.readFileData (selectedFile, (imageData) => {

      setIsFetching (true);

      HttpClient.registraEmpresa (data.nome, data.sigla, imageData, function (response) {

        setMessage (response.message);

        if (response.status == 'ok') {
          setCls ('alert alert-success');
        }
        else {
          setCls ('alert alert-danger');
        }
        setIsFetching (false);
      })
    });
  }

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
	};

  function controlSigla () {

    let val = formRef.current.getFieldValue ('sigla');
    formRef.current.setFieldValue ('sigla', val.toUpperCase ());
  }

  if (isFetching) {
    loader = <Spinner title={'Registrando Empresa'} subtitle={'Aguerde enquanto processamos sua solicitação'}/>
  }

  return (
    <div className="App">

      { loader }

      <div class='container'>
        <div class='row'>
          <div class='col-6 mx-auto'>

            <h2> Nova Empresa </h2>
            <div class={cls}> {message} </div>

            <Form onSubmit={handleSubmit} ref={formRef}>
              <br />
              Nome
              <Input type='text' name='nome' class='form-control'/>
              <br />
              Sigla
              <Input type='text' name='sigla' class='form-control' onKeyUp={controlSigla}/>
              <br />
              Logo
              <input type='file' name='logo' accept='image/jpg,image/png,image/jpeg' class='form-control' onChange={changeHandler}/>
              <br />

              <div class='col-12 text-right'>
                <button type='submit' class='btn btn-success'> Registrar </button>
                &nbsp;
                <Link to={'/empresa'} class='btn btn-light'> Voltar </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
