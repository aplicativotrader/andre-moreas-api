import {Link, useParams} from "react-router-dom";
import { Form } from '@unform/web';
import Input from '../misc/Input';
import Radio from "../misc/Radio";

import { useRef, useState, useEffect } from 'react';
import HttpClient from '../httpClient/HttpClient';
import Spinner from '../components/Spinner';

export default function Usuario ({}) {

  let { _id } = useParams();

  const formRef = useRef(null);

  const [cls, setCls] = useState ('');
  const [message, setMessage] = useState ('');

  const [user, setUser] = useState ({});
  const [isLoading, setIsLoading] = useState (true);

  let loader = '';

  if (isLoading) {
    loader = <Spinner title='Carregando Usuário' subtitle='Por favor, aguarde...' />
  }

  useEffect (() => {

    HttpClient.getUsuarios (_id, function (resp) {
      
      setUser (resp);
      let tipo = resp.tipo;
      if (tipo == 'adm') tipo = 'admin'

      formRef.current.setFieldValue ('email', resp.email);
      formRef.current.setFieldValue ('status', resp.status);
      formRef.current.setFieldValue ('tipo', tipo);

      setIsLoading (false)
    })
  }, []);

  function handleSubmit (data) {

    if (!data.hasOwnProperty ('email') || data.email == '' ) {

      setCls ('alert alert-danger');
      setMessage ('Preencha o e-mail');

      return ;
    }
    else {

      HttpClient.updateUsuario (_id, data.email, data.tipo, data.status, (status) => {

        if (status) {

          setCls ('alert alert-success');
          setMessage ('Dados do usuário atualizados');
        }
        else {

          setCls ('alert alert-danger');
          setMessage ('O e-mail informado já está registrado.');
        }
      });
    }

  }

  return (

    <div className="App">
      {loader}
      <div class='container'>
        <div class='row'>
          <div class='col-10 mx-auto'>
            <br />

            <div class='row'>
              <div class='col-10 mx-auto'>
                <h4> Alterar Usuário </h4>

                <div class={cls}> {message} </div>

                <Form onSubmit={handleSubmit} ref={formRef}>

                  Editar
                  <Input type='email' name='email' class='form-control' />

                  <br />
                  <div class='col-12 text-center'>
                    <Radio
                      name="tipo"
                      options={[{ id: "admin", label: "Admin" }, { id: "usuario", label: "Usuario" }]}
                    />
                  </div>

                  <div class='col-12 text-center'>
                    <Radio
                      name="status"
                      options={[{ id: "Habilitado", label: "Habilitado" }, { id: "Desabilitado", label: "Desabilitado" }]}
                    />
                  </div>

                  <br />
                  <div class='col-12 text-center'>
                    <button class='btn btn-success'> Salvar </button>
                    &nbsp;
                    <Link to={'/usuario'} class='btn btn-light'> Voltar </Link>
                  </div>
                </Form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
