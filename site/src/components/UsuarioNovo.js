import {Link} from "react-router-dom";
import { Form } from '@unform/web';
import Input from '../misc/Input';

import { useRef, useState } from 'react';
import HttpClient from '../httpClient/HttpClient';

export default function Usuario ({}) {

  const formRef = useRef(null);

  const [cls, setCls] = useState ('');
  const [message, setMessage] = useState ('');

  function handleSubmit (data) {

    if (!data.hasOwnProperty ('email') || data.email == '' ) {

      setCls ('alert alert-danger');
      setMessage ('Preencha o e-mail');

      return ;
    }

    HttpClient.addUsuario (data.email, (response) => {

      if (response.status) {

        setCls ('alert alert-success');
        setMessage (response.message);
      }
      else {

        setCls ('alert alert-danger');
        setMessage (response.message);
      }
    });
  }

  return (

    <div className="App">
      <div class='container'>
        <div class='row'>
          <div class='col-10 mx-auto'>
            <br />

            <div class='row'>
              <div class='col-6 mx-auto'>
                <h4> Novo Usuário </h4>

                <div class={cls}> {message} </div>

                <Form onSubmit={handleSubmit} ref={formRef}>

                  E-mail
                  <Input type='email' name='email' class='form-control' />

                  <br />
                  <div class='col-12 text-right'>
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
