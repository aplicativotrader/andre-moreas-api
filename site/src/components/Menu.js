import '../Menu.css';
import {Link} from "react-router-dom";

import FirebaseClient from '../httpClient/FirebaseClient';
import Storage from '../Storage/Storage';
import { Dropdown } from 'react-bootstrap';

import { useHistory } from 'react-router-dom'

export default function Menu ({isLogged}) {

  let history = useHistory();

  let menuItems = <ul class='menu'> </ul>

  if (isLogged) {

    menuItems = (
      <ul class='menu'>
        <Dropdown style={{display: 'inline'}}>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Posts
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/post/call"> Call </Dropdown.Item>
            <Dropdown.Item href="/post/imagem"> Imagem </Dropdown.Item>
            <Dropdown.Item href="/post/video"> Vídeo </Dropdown.Item>
            <Dropdown.Item href="/post/arquivo"> Arquivo </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <li> <Link to='/empresa'> Empresas </Link> </li>
        <li> <Link to='/usuario'> Usuários </Link> </li>
        <li> <Link to="/estrategia"> Estratégia </Link> </li>
        <li> <Link to="/wpp"> Whatsapp </Link> </li>
        <li> <Link to="/push"> Push </Link> </li>
        <li> <Link to="/acessos"> Acessos </Link> </li>
        <li> <a href='#' onClick={loggout}> Sair </a> </li>
      </ul>
    )
  }
  else {
    menuItems = <ul class='menu'> </ul>
  }

  function loggout () {
    FirebaseClient.loggout ((status) => {

      Storage.setData ('user', null, () => history.push ('/'));
    });

  }

  return (
    <header class='bg-dark'>

      <div class='container'>
        {menuItems}
      </div>
    </header>
  )


}
