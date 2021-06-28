import '../App.css';
import Menu from '../components/Menu.js';
import {useState, useRef, useEffect} from 'react';
import {Link} from "react-router-dom";
import Spinner from '../components/Spinner.js';

import HttpClient from '../httpClient/HttpClient';

function Call () {

  let [isLoading, setIsLoading] = useState (true);
  let [posts, setPosts] = useState ([]);

  useEffect (() => {

    HttpClient.getCall (null, (response) => {

      setPosts (response);
      setIsLoading (false);
    })

  }, [])

  let loading = '';
  if (isLoading) {
    loading = <Spinner title={'Carregando Calls'} subtitle={'Por favor, aguarde...'}/>
  }
  else {
    loading = '';
  }

  function RenderTBodyCalls ({posts}) {

    const callList = posts.map ((v, k) => {
      return (
        <tr>
          <td> {v.titulo} </td>
          <td> {v.empresa.nome} </td>
          <td> {v.tipo_call} </td>
          <td> {v.status} </td>
          <td> <Link to={'/post/call/editar/' + v._id} class='btn btn-primary'> Editar </Link> </td>
        </tr>
      )
    })

    return callList
  }

  return (

    <div className="App">

      <div class='container'>
        {loading}
        <div class='row'>
          <div class='col-6'>
            <h4> Post/Call </h4>
          </div>
          <div class='col-6 text-right'>
            <Link class='btn btn-primary' to='/post/call/novo'> Novo </Link>
          </div>
        </div>

        <br />
        <table class='table table-striped table-bordered'>
          <thead>
            <tr>
              <th> Título </th>
              <th> Empresa </th>
              <th> Tipo </th>
              <th> Status </th>
              <th class='text-center' style={{width: 70}}> </th>
            </tr>
          </thead>
          <tbody>
            <RenderTBodyCalls posts={posts} />
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Call;
