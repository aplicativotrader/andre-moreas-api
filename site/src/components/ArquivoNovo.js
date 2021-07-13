import React from "react";
import '../App.css';
import Menu from '../components/Menu.js';
import Spinner from '../components/Spinner.js'
import {Link} from "react-router-dom";

import { Form } from '@unform/web';
import Input from '../misc/Input';
import Radio from "../misc/Radio";
import {useState, useRef} from 'react';
import HttpClient from '../httpClient/HttpClient.js';

import FileHelper from '../helper/FileHelper';

export default function ArquivoNovo ({}) {

  const formRef = useRef(null);

  const [isFetching, setIsFetching] = useState (false);
  const [cls, setCls] = useState ('');
  const [message, setMessage] = useState ('');

  // file upload control
  const [ext, setExt] = useState ();
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  // -- //

  const [pushFields, setPushFields] = useState ('');

  let loader = '';

  function handleSubmit(data) {

    if (!isFilePicked) {

      setCls ('alert alert-danger');
      setMessage ('Selecione um arquivo.');

      return false;
    }

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
    
    //le dados da imagem
    FileHelper.readFileData (selectedFile, (fileData) => {

      setIsFetching (true);
      data.arquivo = fileData;
      data.ext = ext;

      HttpClient.addArquivo (data, (response) => {

        if (response.status == 'ok') {
          setCls ('alert alert-success')
        }
        else {
          setCls ('alert alert-success')
        }

        setMessage (response.message)
        setIsFetching (false)
      })
    });
  }

  const changeHandler = (event) => {
    let h = event.target.files[0].name.split ('.')
    setExt (h[h.length -1].toLowerCase ())
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
	};

  if (isFetching) {
    loader = <Spinner title={'Registrando post de arquivo'} subtitle={'Aguerde enquanto processamos sua solicitação'}/>
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

            <h2> Post/Arquivo - Novo </h2>
            <div class={cls}> {message} </div>

            <Form onSubmit={handleSubmit} ref={formRef}>
              <br />
              Título
              <Input type='text' name='titulo' class='form-control'/>
              <br />
              Subtítulo
              <Input type='text' name='subtitulo' class='form-control' />
              <br />
              Arquivo
              <br/>
              <small> PDF, Excel </small>
              <input type='file' name='arquivo' accept='application/pdf, .xls, .xlsx' class='form-control' onChange={changeHandler}/>
              <br />

              Push
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
                <Link to={'/post/arquivo'} class='btn btn-light'> Voltar </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
