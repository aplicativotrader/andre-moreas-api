import {Link} from "react-router-dom";
import { Form } from '@unform/web';
import Input from '../misc/Input';

import { useRef, useState } from 'react';
import HttpClient from '../httpClient/HttpClient';
import Spinner from '../components/Spinner';
import * as XLSX from 'xlsx';

export default function Usuario ({}) {

  const formRef = useRef(null);

  const [mailList, setMailList] = useState (null);
  const [isLoading, setIsLoading] = useState (false);

  const [cls, setCls] = useState ('');
  const [message, setMessage] = useState ('');

  const processData = dataString => {

    setMailList(dataString.split (','));
  }

  function handleSubmit ( data ) {

    if (mailList != null) {
      HttpClient.removeEmLote (mailList, (status) => {

        setIsLoading (false);
        setCls ('alert alert-success');
        setMessage ('Usuários registrados')
      });
    }
  }

  const handleFileUpload = e => {

    setIsLoading (true);

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
       /* Parse data */
       const bstr = evt.target.result;
       const wb = XLSX.read(bstr, { type: 'binary' });
       /* Get first worksheet */
       const wsname = wb.SheetNames[0];
       const ws = wb.Sheets[wsname];
       /* Convert array of arrays */
       const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
       processData(data);
    };
   reader.readAsBinaryString(file);
  }

  let loader = '';

  if (isLoading) {
    loader = <Spinner title='Aguarge' subtitle='Carregando...' />
  }

  return (

    <div className="App">
    {}
      <div class='container'>
        <div class='row'>
          <div class='col-10 mx-auto'>
            <br />

            <div class='row'>
              <div class='col-6 mx-auto'>
                <h4> Desabilitar Usuário </h4>
                Em Lote
                <div class={cls}> {message} </div>
                <br/>
                Importar .CSV
                <input type='file'
                        class='form-control'
                        accept='.csv'
                        onChange={handleFileUpload}
                      />

                <br />
                <div class='col-12 text-right'>
                  <button class='btn btn-success' onClick={handleSubmit}> Salvar </button>
                  &nbsp;
                  <Link to={'/usuario'} class='btn btn-light'> Voltar </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
