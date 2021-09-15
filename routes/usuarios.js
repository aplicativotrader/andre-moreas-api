var express = require('express');
var router = express.Router();
var UsuarioModel = require ('../config/usuario');

router.get ('/get/:page/:nome/:email', (req, res) => {

  UsuarioModel.getUsuario (null, req.params.page, req.params.nome, req.params.email, (response) => {

    res.send (response);
  })
})

router.get ('/get-by-id/:_id', (req, res) => {

  UsuarioModel.getUsuario (req.params._id, 1, 0, 0, (response) => {

    res.send (response[0]);
  })
})

router.post ('/create', (req, res) => {

  if (!req.body.hasOwnProperty ('email') || req.body.email == '') {

    res.send ({
      status: 'error',
      message: 'O e-mail deve ser informado.'
    })

    return ;
  }

  UsuarioModel.addUsuario (req.body.email, (response) => {

    res.send (response)
  })
})

router.put ('/update/:_id', (req, res) => {

  let data = req.body

  if (
    (!data.hasOwnProperty ('email') || data.email == '')
    || (!data.hasOwnProperty ('tipo') || data.tipo == '')
    || (!data.hasOwnProperty ('status') || data.status == '')
    || (!data.hasOwnProperty ('nome') || data.nome == '')
    ) {


    res.send ({
      status: 'error',
      message: 'Todos os campos são obrigatórios'
    })

    return ;
  }

  UsuarioModel.updateUsuario (req.params._id, data.email, data.status, data.tipo, data.nome, (response) => {

    res.send (response)
  })
})

router.post ('/create-lote', (req, res) => {

  let mailList = req.body.mail_list;

  if (Object.keys (mailList).length == 0) {

    req.send ({
      status: 'error',
      message: 'Nenhum e-mail na lista enviada.'
    })

    return;
  }

  mailList.forEach((email => {

    UsuarioModel.addUsuario (email, (response) => {})
  }));

  res.send ({
    status: 'ok'
  })
})

router.delete ('/remove-lote', (req, res) => {

  let mailList = req.body.mail_list;

  if (Object.keys (mailList).length == 0) {

    req.send ({
      status: 'error',
      message: 'Nenhum e-mail na lista enviada.'
    })

    return;
  }

  mailList.forEach((email => {

    UsuarioModel.rmUsuario (email, (response) => {})
  }));

  res.send ({
    status: 'ok'
  })
})

router.post ('/cadastrar', (req, res) => {

  let data = req.body;

  if (
      (!data.hasOwnProperty ('nome') || data.nome == '')
      || (!data.hasOwnProperty ('celular') || data.celular == '')
      || (!data.hasOwnProperty ('email') || data.email == '')
    ) {

      res.send ({
        status: 'error',
        message: 'Todos os campos são obrigatórios.'
      })

      return;
    }

    UsuarioModel.cadastrar (data.nome, data.celular, data.email, (response) => {

      res.send (response)
    })
})

router.get ('/check/:email/:tipo', (req, res) => {

  let email = req.params.email
  let tipo = req.params.tipo


  if (tipo == 'usuario') {

    UsuarioModel.checkUsuario (email, (response) => {
      res.send (response)
    })
  }
  else {
    UsuarioModel.checkAdm (email, (response) => {
      res.send (response)
    })
  }
})

router.get ('/update-acesso/:_id/:deviceId', (req, res) => {

  UsuarioModel.updateAcesso (req.params._id, req.params.deviceId)
  res.send ('ok')
})


router.get ('/get-by-email/:email', (req, res) => {

  UsuarioModel.getByEmail (req.params.email, (response) => {

    res.send (response)
  })
})

router.get ('/update-acessos/:_id/:email/:deviceId', (req, res) => {

  UsuarioModel.updateAcesso (req.params._id, req.params.deviceId)
  UsuarioModel.acessoMensal (req.params.email)
  res.send ('ok')
})

router.get ('/get-acessos-mensais/:mes/:ano', (req, res) => {

  UsuarioModel.getAcessosMensais (req.params.mes, req.params.ano, response => {
    res.send (response)
  })
})

router.get ('/pages/num-pages/:nome/:email', (req, res) => {

  let filters = {}

  if (req.params.nome != 0) {
    filters.nome = {$regex: new RegExp(req.params.nome, 'i') }
  }

  if (req.params.email != 0) {
    filters.email = {$regex: new RegExp(req.params.email, 'i') }
  }

  UsuarioModel.getNumPages (filters, (users) => {

    let numUsu = users.length
    let numPages = 0

    if (numUsu > 0) {
      numPages = Math.ceil (numUsu / 50)
    }

    res.json ({
      numPages: numPages
    });
  })
})

module.exports = router
