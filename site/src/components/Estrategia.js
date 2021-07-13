import '../App.css';
import Menu from '../components/Menu.js';
import {Link} from "react-router-dom";
import Spinner from '../components/Spinner.js';
import {useState, useEffect} from 'react';

import HttpClient from '../httpClient/HttpClient.js';

export default function Estrategia ({}) {

  let [estrategias, setEstrategias] = useState ([]);
  let [isLoading, setIsLoading] = useState (true);

  useEffect (() => {

    HttpClient.getEstrategia (null, function (est) {

      console.log (est)
      setEstrategias (est);
      setIsLoading (false);
    });
  }, []);

  function RenderTBodyEstrategias ({estrategias}) {

    function setStatus (st) {
      if (st == 'A') return 'Ativo';
      else return 'Inativo';
    }

    const tbody = estrategias.map ((data, key) => {
      return (
        <tr>
          <td> { data.estrategia } </td>
          <td> { setStatus (data.status) } </td>
          <td> <Link to={'/estrategia/edit/' + data._id} class='btn btn-info btn-sm'> Ver </Link> </td>
        </tr>
      )
    });

    return <tbody> {tbody} </tbody>
  }

  if (isLoading) {
    return <Spinner title={'Carregando Estratégias'} subtitle={'Por favor, aguarde...'}/>
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
                  <h4> Estratégias </h4>
                </div>
                <div class='col-6 text-right'>
                  <Link class='btn btn-primary' to='/estrategia/nova'> Nova </Link>
                </div>
              </div>

              <br />
              <table class='table table-striped table-bordered'>
                <thead>
                  <tr>
                    <th> Estratégia </th>
                    <th style={{width: 100}}> Status </th>
                    <th class='text-center' style={{width: 70}}> </th>
                  </tr>
                </thead>

                <RenderTBodyEstrategias estrategias={estrategias} />

              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
