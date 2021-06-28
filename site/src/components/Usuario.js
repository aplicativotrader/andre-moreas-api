import {Link} from "react-router-dom";
import { useEffect, useState} from 'react';
import HttpClient from '../httpClient/HttpClient';
import Spinner from '../components/Spinner';

export default function Usuario ({}) {

  const [users, setUsers] = useState ([]);
  const [isLoading, setIsloading] = useState (true);

  useEffect ( () => {
    HttpClient.getUsuarios (null, (usuarios) => {
      
      setUsers (usuarios);
      setIsloading (false);
    })
  }, [])

  let loader = '';

  if (isLoading) {
    loader = <Spinner title='Carregando Usuários' subtitle='Por favor, aguarde...' />
  }

  function RenderUsuario () {

    const usu = users.map ( (data, key) => {

      return <tbody>
              <tr>
                <td> { data.nome } </td>
                <td> { data.email } </td>
                <td> { data.celular } </td>
                <td> { data.tipo } </td>
                <td> { data.status } </td>
                <td style={{width: 80}} class='text-center'> <Link to={'/usuario/edit/' + data._id} class='btn btn-info btn-sm'> Ver </Link> </td>
              </tr>
            </tbody>
    });

    return usu;
  }

  return (

    <div className="App">
      {loader}
      <div class='container'>
        <div class='row'>
          <div class='col-10 mx-auto'>
            <br />

            <div class='row'>
              <div class='col-6'>
                <h4> Usuários </h4>
              </div>
              <div class='col-12 text-right'>
                <Link class='btn btn-primary' to='/usuario/novo'> Novo </Link> &nbsp;
                <Link class='btn btn-outline-primary' to='/usuario/novo/lote'> Novo por Lote </Link> &nbsp;
                <Link class='btn btn-outline-danger' to='/usuario/desabilitar/lote'> Desabilitar por Lote </Link>
              </div>
            </div>

            <br/>

            <div class='row'>
              <div class='col-12 mx-auto'>
                <table class='table table-striped table-bordered'>
                  <thead>
                    <tr>
                      <th> Nome </th>
                      <th> E-mail </th>
                      <th> Celular </th>
                      <th> Tipo </th>
                      <th> Status </th>
                      <th> </th>
                    </tr>
                  </thead>
                  <RenderUsuario />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
