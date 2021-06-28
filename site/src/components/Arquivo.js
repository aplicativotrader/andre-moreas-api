import '../App.css';
import Menu from '../components/Menu.js';
import {useState, useRef, useEffect} from 'react';
import {Link} from "react-router-dom";
import Spinner from '../components/Spinner.js';

import HttpClient from '../httpClient/HttpClient';

function Arquivo () {

  let [isLoading, setIsLoading] = useState (true);
  let [posts, setPosts] = useState ([]);

  useEffect (() => {
    setIsLoading (true);
    HttpClient.getArquivo (null, (response) => {
      setPosts (response);
      setIsLoading (false);
    })
  }, [])

  let loading = '';
  if (isLoading) {
    loading = <Spinner title={'Carregando Arquivos'} subtitle={'Por favor, aguarde...'}/>
  }
  else {
    loading = '';
  }

  function RenderTBodyArquivos ({imagems}) {

    const imagemsList = imagems.map ((v, k) => {
      return (
        <tr>
          <td> {v.titulo} </td>
          <td> {v.subtitulo} </td>
          <td> <a href={HttpClient.api + 'images/' + v.arquivo} target='_BLANK'> Ver </a> </td>
          <td> <Link to={'/post/arquivo/edit/' + v._id} class='btn btn-primary'> Editar </Link> </td>
        </tr>
      )
    })

    return imagemsList
  }

  return (

    <div className="App">

      <div class='container'>
        {loading}
        <div class='row'>
          <div class='col-6'>
            <h4> Post/Arquivos </h4>
          </div>
          <div class='col-6 text-right'>
            <Link class='btn btn-primary' to='/post/arquivo/novo'> Novo </Link>
          </div>
        </div>

        <br />
        <table class='table table-striped table-bordered'>
          <thead>
            <tr>
              <th> Título </th>
              <th> Subtítulo </th>
              <th> Arquivo </th>
              <th class='text-center' style={{width: 70}}> </th>
            </tr>
          </thead>
          <tbody>
            <RenderTBodyArquivos imagems={posts} />
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Arquivo;
