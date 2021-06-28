import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginScreen from './components/Login.js';
import EstrategiaScreen from './components/Estrategia.js';
import EstrategiaNovaScreen from './components/EstrategiaNova.js';
import EstrategiaEditScreen from './components/EstrategiaEdit.js';
import UsuarioScreen from './components/Usuario';
import UsuarioNovoScreen from './components/UsuarioNovo';
import UsuarioEditScreen from './components/UsuarioEdit';
import UsuarioNovoLoteScreen from './components/UsuarioNovoLote';
import UsuarioRemoveLoteScreen from './components/UsuarioRemoveLote';
import EmpresaScreen from './components/Empresa';
import EmpresaNovaScreen from './components/EmpresaNova';
import EmpresaEditScreen from './components/EmpresaEdit';
import WppScreen from './components/Wpp';
import PushScreen from './components/Push';
import VideoScreen from './components/Video';
import VideoNovoScreen from './components/VideoNovo';
import VideoEditScreen from './components/VideoEdit';
import ImagemScreen from './components/Imagem';
import ImagemNovoScreen from './components/ImagemNovo';
import ImagemEditScreen from './components/ImagemEdit';
import ArquivoScreen from './components/Arquivo';
import ArquivoNovoScreen from './components/ArquivoNovo';
import ArquivoEditScreen from './components/ArquivoEdit';
import CallScreen from './components/Call';
import CallNovoScreen from './components/CallNovo';
import CallEditarScreen from './components/CallEditar';
import AcessosScreen from './components/Acessos';

import Menu from './components/Menu.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {useState, useEffect} from 'react';

import Storage from './Storage/Storage';
import FirebaseClient from './httpClient/FirebaseClient';

function App() {

  const [user, setUser] = useState (false);
  const [isLogged, setIslogged] = useState (false);

  useEffect ( () => {

    Storage.getData ('user', function (user) {
      setUser (user);

      FirebaseClient.checkAuth (user, function (status) {

        setIslogged (status)
      });
    });
  }, []);

  return (

    <Router>

      <Menu isLogged={isLogged} />

      <Switch>
        <Route path="/estrategia" exact={true}>
          <EstrategiaScreen />
        </Route>
        <Route path="/estrategia/nova" exact={true}>
          <EstrategiaNovaScreen />
        </Route>
        <Route path="/estrategia/edit/:_id" exact={true}>
          <EstrategiaEditScreen />
        </Route>
        <Route path="/usuario" exact={true}>
          <UsuarioScreen />
        </Route>
        <Route path="/usuario/novo" exact={true}>
          <UsuarioNovoScreen />
        </Route>
        <Route path="/usuario/edit/:_id" exact={true}>
          <UsuarioEditScreen />
        </Route>
        <Route path="/usuario/novo/lote" exact={true}>
          <UsuarioNovoLoteScreen />
        </Route>
        <Route path="/usuario/desabilitar/lote" exact={true}>
          <UsuarioRemoveLoteScreen />
        </Route>
        <Route path="/empresa" exact={true}>
          <EmpresaScreen />
        </Route>
        <Route path="/empresa/nova" exact={true}>
          <EmpresaNovaScreen />
        </Route>
        <Route path="/empresa/edit/:_id" exact={true}>
          <EmpresaEditScreen />
        </Route>
        <Route path="/wpp" exact={true}>
          <WppScreen />
        </Route>
        <Route path="/push" exact={true}>
          <PushScreen />
        </Route>
        <Route path="/post/video" exact={true}>
          <VideoScreen />
        </Route>
        <Route path="/post/video/novo" exact={true}>
          <VideoNovoScreen />
        </Route>
        <Route path="/post/video/edit/:_id" exact={true}>
          <VideoEditScreen />
        </Route>
        <Route path="/post/imagem" exact={true}>
          <ImagemScreen />
        </Route>
        <Route path="/post/imagem/novo" exact={true}>
          <ImagemNovoScreen />
        </Route>
        <Route path="/post/imagem/edit/:_id" exact={true}>
          <ImagemEditScreen />
        </Route>
        <Route path="/post/arquivo" exact={true}>
          <ArquivoScreen />
        </Route>
        <Route path="/post/arquivo/novo" exact={true}>
          <ArquivoNovoScreen />
        </Route>
        <Route path="/post/arquivo/edit/:_id" exact={true}>
          <ArquivoEditScreen />
        </Route>
        <Route path="/post/call" exact={true}>
          <CallScreen />
        </Route>
        <Route path="/post/call/novo" exact={true}>
          <CallNovoScreen />
        </Route>
        <Route path="/post/call/editar/:_id" exact={true}>
          <CallEditarScreen />
        </Route>
        <Route path="/acessos" exact={true}>
          <AcessosScreen />
        </Route>
        <Route path="/" exact={true}>
          <LoginScreen />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
