import '../App.css';
import Menu from '../components/Menu.js';
import {Link} from "react-router-dom";
import Spinner from '../components/Spinner.js';
import {useState, useEffect} from 'react';

import HttpClient from '../httpClient/HttpClient.js';

export default function Estrategia ({}) {

  let [empresas, setEmpresas] = useState ([]);
  let [isLoading, setIsLoading] = useState (true);

  useEffect (() => {

    HttpClient.getEmpresa (null, function (est) {

      console.log (est)
      setEmpresas (est);
      setIsLoading (false);
    });
  }, []);

  function RenderTBodyEmpresas ({empresas}) {

    const tbody = empresas.map ((data, key) => {
      return (
        <tr>
          <td valign='middle'> { data.nome } </td>
          <td valign='middle'> { data.sigla } </td>
          <td> <img src={ HttpClient.api + 'images/' + data.logo } style={{width: 100}}/> </td>
          <td> <Link to={'/empresa/edit/' + data._id} class='btn btn-info btn-sm'> Ver </Link> </td>
        </tr>
      )
    });

    return <tbody> {tbody} </tbody>
  }

  if (isLoading) {
    return <Spinner title={'Carregando Empresas'} subtitle={'Por favor, aguarde...'}/>
  }
  else {
    return (
      <div className="App">
        <div class='container'>
          <div class='row'>
            <div class='col-10 mx-auto'>
              <br />

              <div class='row'>
                <div class='col-6'>
                  <h4> Empresas </h4>
                </div>
                <div class='col-6 text-right'>
                  <Link class='btn btn-primary' to='/empresa/nova'> Nova </Link>
                </div>
              </div>

              <br />
              <table class='table table-striped table-bordered'>
                <thead>
                  <tr>
                    <th> Nome </th>
                    <th style={{width: 100}}> Sigla </th>
                    <th style={{width: 100}}> Imagem </th>
                    <th class='text-center' style={{width: 70}}> </th>
                  </tr>
                </thead>

                <RenderTBodyEmpresas empresas={empresas} />

              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
