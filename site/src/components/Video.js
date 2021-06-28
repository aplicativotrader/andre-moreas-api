import '../App.css';
import Menu from '../components/Menu.js';
import {useState, useRef, useEffect} from 'react';
import {Link} from "react-router-dom";
import Spinner from '../components/Spinner.js';

import HttpClient from '../httpClient/HttpClient';

function Video () {

  let [isLoading, setIsLoading] = useState (true);
  let [videos, setVideos] = useState ([]);

  useEffect (() => {
    setIsLoading (true);
    HttpClient.getVideos ((response) => {

      setVideos (response);
      setIsLoading (false);
    })
  }, [])

  let loading = '';
  if (isLoading) {
    loading = <Spinner title={'Carregando Vídeos'} subtitle={'Por favor, aguarde...'}/>
  }
  else {
    loading = '';
  }

  function RenderTBodyVideos ({videos}) {

    const videoList = videos.map ((v, k) => {
      return (
        <tr>
          <td> {v.titulo} </td>
          <td> {v.subtitulo} </td>
          <td> {v.link} </td>
          <td> <Link to={'/post/video/edit/' + v._id} class='btn btn-primary'> Editar </Link> </td>
        </tr>
      )
    })

    return videoList
  }

  return (

    <div className="App">

      <div class='container'>
        {loading}
        <div class='row'>
          <div class='col-6'>
            <h4> Post/Vídeo </h4>
          </div>
          <div class='col-6 text-right'>
            <Link class='btn btn-primary' to='/post/video/novo'> Novo </Link>
          </div>
        </div>

        <br />
        <table class='table table-striped table-bordered'>
          <thead>
            <tr>
              <th> Título </th>
              <th> Subtítulo </th>
              <th> Link </th>
              <th class='text-center' style={{width: 70}}> </th>
            </tr>
          </thead>
          <tbody>
            <RenderTBodyVideos videos={videos} />
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Video;
