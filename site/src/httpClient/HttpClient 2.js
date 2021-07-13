import env from "react-dotenv";

let api = "http://localhost:3000/";

function getEstrategia (estrategiaId, callback) {

  let uri = api + 'estrategias/get';

  if (estrategiaId != null) {
    uri += '/' + estrategiaId;
  }

  fetch (uri)
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });

}

function registraEstrategia (estrategia, callback) {

  let uri = api + 'estrategias/registry';
  let request = {
    estrategia: estrategia
  };

  fetch (uri, {
      method: 'post',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function updateEstrategia (_id, estrategia, status, callback) {

  let uri = api + 'estrategias/update';
  let request = {
    _id: _id,
    estrategia: estrategia,
    status: status
  };

  fetch (uri, {
      method: 'put',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function getEmpresa (_id, callback) {

  let uri = api + 'empresas/get';

  if (_id != null) {
    uri += '/' + _id;
  }

  fetch (uri)
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function registraEmpresa (nome, sigla, logo, callback) {

  let uri = api + 'empresas/create';
  let request = {
    nome: nome,
    sigla: sigla,
    logo: logo
  };

  fetch (uri, {
      method: 'post',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function updateEmpresa (_id, nome, sigla, logo, callback) {

  let uri = api + 'empresas/update';
  let request = {
    _id: _id,
    nome: nome,
    sigla: sigla,
    logo: logo
  };

  fetch (uri, {
      method: 'put',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function sendPushNotify (title, body, callback) {

  let uri = api + 'push';
  let request = {
    title: title,
    body: body
  }

  fetch (uri, {
      method: 'post',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.text ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

// post - video
function addVideo (video, callback) {

  let uri = api + 'post/video/registry';

  fetch (uri, {
      method: 'post',
      body: JSON.stringify(video),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function getVideos (callback) {

  let uri = api + 'post/video';

  fetch (uri)
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function getVideoById (_id, callback) {

  let uri = api + 'post/video/' + _id;

  fetch (uri)
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function updateVideo (video, callback) {

  let uri = api + 'post/video/update';

  fetch (uri, {
      method: 'put',
      body: JSON.stringify(video),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

// post - imagem
function getPostImagem (_id, callback) {

  let uri = api + 'post/imagem';

  if (_id != null && _id != undefined) {

    uri += '/' + _id
  }

  fetch (uri)
    .then ((response) => response.json ())
    .then((json) => {
      callback (json);
    })
    .catch((error) => {
      callback (error)
    });
}

function addPostImagem (imagem, callback) {

  let uri = api + 'post/imagem/registry';

  fetch (uri, {
      method: 'post',
      body: JSON.stringify(imagem),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function updatePostImagem (imagem, callback) {

  let uri = api + 'post/imagem/update';

  fetch (uri, {
      method: 'put',
      body: JSON.stringify(imagem),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

// arquivo
function getArquivo (_id, callback) {

  let uri = api + 'post/arquivo';

  if (_id != null && _id != undefined) {

    uri += '/' + _id
  }

  fetch (uri)
    .then ((response) => response.json ())
    .then((json) => {
      callback (json);
    })
    .catch((error) => {
      callback (error)
    });
}

function addArquivo (doc, callback) {

  let uri = api + 'post/arquivo/registry';

  fetch (uri, {
      method: 'post',
      body: JSON.stringify(doc),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function updateArquivo (doc, callback) {

  let uri = api + 'post/arquivo/update';

  fetch (uri, {
      method: 'put',
      body: JSON.stringify(doc),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

// call
function getCall (_id, callback) {

  let uri = api + 'post/call';

  if (_id != null && _id != undefined) {
    uri += '/' + _id;
  }

  fetch (uri)
    .then ((response) => response.json ())
    .then((json) => {

      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function addCall (doc, callback) {

  let uri = api + 'post/call/registry';

  fetch (uri, {
      method: 'post',
      body: JSON.stringify(doc),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function updateCall (call, callback) {

  let uri = api + 'post/call/update';

  fetch (uri, {
      method: 'put',
      body: JSON.stringify(call),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

// usuario
function getUsuarios (_id , callback) {

  let uri = api + 'usuarios/';

  if (_id != null && _id != undefined) {
    uri += _id;
  }

  fetch (uri)
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function updateUsuario (_id, email, tipo, status, callback) {

  let uri = api + 'usuarios/update/' + _id;

  let request = {
    email: email,
    tipo: tipo,
    status: status
  }

  fetch (uri, {
      method: 'put',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function addUsuario (email, callback) {

  let uri = api + 'usuarios/create';

  let request = {
    email: email
  }

  fetch (uri, {
      method: 'post',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function addEmLote (mailList, callback) {

  let uri = api + 'usuarios/create-lote';

  let request = {
    mail_list: mailList
  }

  fetch (uri, {
      method: 'post',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function removeEmLote (mailList, callback) {

  let uri = api + 'usuarios/remove-lote';

  let request = {
    mail_list: mailList
  }

  fetch (uri, {
      method: 'delete',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function checkAdm (email, callback) {

  let uri = api + 'usuarios/check/' + email + '/admin';

  fetch (uri)
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

function getAcessosMensal (mes, ano, callback) {

  let uri = api + 'usuarios/get-acessos-mensais/' + mes + '/' + ano;
  console.log (uri)
  fetch (uri)
    .then ((response) => response.json ())
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      callback (error)
    });
}

export default {
  api,
  registraEstrategia,
  getEstrategia,
  updateEstrategia,
  getEmpresa,
  registraEmpresa,
  updateEmpresa,
  sendPushNotify,
  addVideo,
  getVideos,
  getVideoById,
  updateVideo,
  getUsuarios,
  updateUsuario,
  addUsuario,
  addEmLote,
  removeEmLote,
  checkAdm,
  addPostImagem,
  getPostImagem,
  updatePostImagem,
  addArquivo,
  getArquivo,
  updateArquivo,
  addCall,
  getCall,
  updateCall,
  getAcessosMensal
}
