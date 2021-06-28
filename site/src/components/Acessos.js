import '../App.css';
import Menu from '../components/Menu.js';
import {useState, useRef, useEffect} from 'react';

import { Form } from '@unform/web';
import Input from '../misc/Input';
import Select from '../misc/Select';

import HttpClient from '../httpClient/HttpClient';
import { useHistory } from 'react-router-dom'

function Acessos () {

  const [acessos, setAcessos] = useState ([])
  const [mesAno, setMesAno] = useState ('')
  const formRef = useRef(null);
  let history = useHistory();

  const meses = [
    {
      value: '01',
      label: 'Janeiro'
    },
    {
      value: '02',
      label: 'Fevereiro'
    },
    {
      value: '03',
      label: 'Março'
    },
    {
      value: '04',
      label: 'Abril'
    },
    {
      value: '05',
      label: 'Maio'
    },
    {
      value: '06',
      label: 'Junho'
    },
    {
      value: '07',
      label: 'Julho'
    },
    {
      value: '08',
      label: 'Agosto'
    },
    {
      value: '09',
      label: 'Setembro'
    },
    {
      value: '10',
      label: 'Outubro'
    },
    {
      value: '11',
      label: 'Novembro'
    },
    {
      value: '12',
      label: 'Dezembro'
    }
  ]

  function handleSubmit (data) {

    if (data.mes != '' && data.ano != '') {
      setMesAno (data.mes + '/' + data.ano)

      HttpClient.getAcessosMensal (data.mes, data.ano, (response) => {

        setAcessos (response)
      })
    }
    else alert ('Selecione Mês e Ano.')
  }

  function RenderTbody ({list}) {

    const r = list.map ((data, key) => {

                return (
                  <tr>
                    <td> {data.email} </td>
                  </tr>
                )
              })

    return r;
  }

  return (

    <div className="App">

      <div class='container'>
        <h3> Acessos Mensais </h3>

        <Form onSubmit={handleSubmit} ref={formRef}>
          <div class='row'>
            <div class='col-3'>
              <br/>
              <b> Mês: </b>
              <Select
                name='mes'
                options={meses}
                class='form-control'
              />
            </div>
            <div class='col-3'>
              <br/>
              <b> Ano: </b>
              <Input type='text' name='ano' class='form-control'/>
            </div>
            <div>
              <br/>
              <div class='col-12 text-right'>
              <br />
                <button class='btn btn-success'> Buscar </button>
              </div>
            </div>
          </div>
        </Form>

        <br/><br/>
        <div class='col-10'>
          Acessos no período <b> {mesAno} </b> <br/>
          Número de acessos no período: <b> {acessos.length} </b>

          <table class='table table-bordered table-striped'>
            <thead>
              <tr>
                <th> Email </th>
              </tr>
            </thead>
            <tbody>
              <RenderTbody list={acessos}/>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Acessos;
