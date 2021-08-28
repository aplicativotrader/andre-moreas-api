var express = require('express');
var router = express.Router();
var PostModel = require ('../config/post');
var PushModel = require ('../config/push');

const { v4: uuidv4 } = require('uuid');

router.get('/fetch/:page/:filtros', function(req, res, next) {

  PostModel.getPosts (req.params.page, JSON.parse (req.params.filtros), (response) => {

    res.send (response)
  })
});

router.get('/get/:id', function(req, res, next) {


});

// vídeo
router.get ('/video/pages/:page', function (req, res) {

  PostModel.getVideos (null, req.params.page, (videos) => {

    res.send (videos);
  })
});

router.get ('/video/:id', function (req, res) {

  PostModel.getVideos (req.params.id, 1, (video) => {

    res.send (video[0]);
  })
})

router.post ('/video/registry', function (req, res, next) {

  let data = req.body;

  if (
      (!data.hasOwnProperty('titulo') || data.titulo == '')
      || (!data.hasOwnProperty('subtitulo') || data.subtitulo == '')
      || (!data.hasOwnProperty('link') || data.link == '')
    ) {

    res.send ({
              status: 'error',
              message: 'Os campos "Título", "Subtítulo" e "Link" devem ser informados.'
                });
    return ;
  }

  let doc = {
    titulo: data.titulo,
    subtitulo: data.subtitulo,
    link: data.link
  }

  PostModel.addVideo (doc, function (status) {


    if (status.result.ok == 1) {

      if (data.hasOwnProperty ('push')) {

        PushModel.sendPush (data.push.title, data.push.body, () => {});
      }

      res.json ({
        status: 'ok',
        message: 'Vídeo registrado com sucesso!'
      });
    }
    else {

      res.json ({
        status: 'error',
        message: 'Erro ao salvar estratégia.'
      });
    }
  });
})

router.put ('/video/update', function (req, res) {

  let data = req.body;

  if (
      (!data.hasOwnProperty('_id') || data._id == '')
      || (!data.hasOwnProperty('titulo') || data.titulo == '')
      || (!data.hasOwnProperty('subtitulo') || data.subtitulo == '')
      || (!data.hasOwnProperty('link') || data.link == '')
    ) {

    res.send ({
              status: 'error',
              message: 'Os campos "Título", "Subtítulo" e "Link" devem ser informados.'
                });
    return ;
  }

  let doc = {
    _id: data._id,
    titulo: data.titulo,
    subtitulo: data.subtitulo,
    link: data.link
  }

  PostModel.updateVideo (doc, (response) => {

    if (response.result.ok == 1) {

      if (data.hasOwnProperty ('push')) {

        PushModel.sendPush (data.push.title, data.push.body, () => {});
      }

      res.json ({
        status: 'ok',
        message: 'Vídeo atualizado com sucesso!'
      });
    }
    else {

      res.json ({
        status: 'error',
        message: 'Erro ao salvar vídeo.'
      });
    }
  });
})

// imagem
router.get ('/imagem/pages/:page', function (req, res) {

  PostModel.getImagem (null, req.params.page, (imagems) => {

    res.send (imagems);
  })
});

router.get ('/imagem/:id', function (req, res) {

  PostModel.getImagem (req.params.id, 1, (imagem) => {

    res.send (imagem[0]);
  })
})

router.post ('/imagem/registry', (req, res) => {

  let data = req.body

  if (
    (!data.hasOwnProperty ('titulo') || data.titulo == '')
    || (!data.hasOwnProperty ('sub_titulo') || data.titulo == '')
    || (
        (!data.hasOwnProperty ('link') || data.link == '')
        && (!data.hasOwnProperty ('texto') || data.texto == '')
        && (!data.hasOwnProperty ('imagem') || data.imagem == '')
      )
  ) {

    res.send ({
      status: 'error',
      message: "Os campos Mensagem, título e mais um campo complementar são obrigatórios."
    });
    return;
  }


  // salvo no storage

  // cria imagens
  //let imageList = [];

  /*if (data.hasOwnProperty ('imagem') && data.imagem != '') {
    data.imagem.forEach (imagem => {

      var base64Data = imagem.replace("data:image/png;base64,", "");
      base64Data = base64Data.replace("data:image/jpg;base64,", "");
      base64Data = base64Data.replace("data:image/jpeg;base64,", "");

      let imageBuffer = new Buffer(base64Data, 'base64');

      let fileName = uuidv4() + '.png';
      require("fs").writeFile( "public\/images\/" + fileName, imageBuffer, (err) => {})

      imageList.push (fileName);
    })
  }*/

  PostModel.addImagem (data.titulo, data.sub_titulo, data.link, data.texto, data.imagem, (response) => {

    if (data.hasOwnProperty ('push')) {

      PushModel.sendPush (data.push.title, data.push.body, () => {});
    }

    res.json ({
      status: 'ok',
      message: 'Post de Imagem registrado com sucesso'
    });
  })
})

router.put ('/imagem/update', (req, res) => {

  let data = req.body

  if (
    (!data.hasOwnProperty ('titulo') || data.titulo == '')
    || (!data.hasOwnProperty ('sub_titulo') || data.titulo == '')
    || (
        (!data.hasOwnProperty ('link') || data.link == '')
        && (!data.hasOwnProperty ('texto') || data.texto == '')
      )
  ) {

    res.send ({
      status: 'error',
      message: "Os campos Mensagem, título e mais um campo complementar são obrigatórios."
    });
    return;
  }

  // passou a ser salvo no firestorage
  // cria imagens
  /*let imageList = [];

  if (data.hasOwnProperty ('imagem') && data.imagem != '') {
    data.imagem.forEach (imagem => {

      var base64Data = imagem.replace("data:image/png;base64,", "");
      base64Data = base64Data.replace("data:image/jpg;base64,", "");
      base64Data = base64Data.replace("data:image/jpeg;base64,", "");

      let imageBuffer = new Buffer(base64Data, 'base64');

      let fileName = uuidv4() + '.png';
      require("fs").writeFile( "public\/images\/" + fileName, imageBuffer, (err) => {})

      imageList.push (fileName);
    })
  }

  if (Object.keys (imageList).length == 0) {
    imageList = null; // remove imagem do update, preservando as ja existentes.
  }*/

  PostModel.updateImagem (data._id, data.titulo, data.sub_titulo, data.link, data.texto, data.imagem, (response) => {

    if (data.hasOwnProperty ('push')) {

      PushModel.sendPush (data.push.title, data.push.body, () => {});
    }

    res.json ({
      status: 'ok',
      message: 'Post de Imagem atualizado com sucesso'
    });
  })
})

// arquivos

router.get ('/arquivo/pages/:page', (req, res) => {

  PostModel.getArquivo (null, req.params.page, (response) => {
    res.send (response);
  })
})

router.get ('/arquivo/:_id', (req, res) => {

  PostModel.getArquivo (req.params._id, 1, (response) => {
    res.send (response[0]);
  })
})

router.post ('/arquivo/registry', (req, res) => {

  let data = req.body;

  if (
    (!data.hasOwnProperty ('titulo') || data.titulo == '')
    || (!data.hasOwnProperty ('subtitulo') || data.subtitulo == '')
    || (!data.hasOwnProperty ('arquivo') || data.arquivo == '')
  ) {

    res.send ({
      status: 'error',
      message: 'todos os campos são obrigatórios'
    })

    return;
  }

  ///

  // passou a ser salvo no fire storage

  /*var base64Data = data.arquivo.replace("data:application/pdf;base64,", "");
  base64Data = base64Data.replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
  base64Data = base64Data.replace("data:application/vnd.ms-excel;base64,", "");

  let imageBuffer = new Buffer(base64Data, 'base64');

  let fileName = uuidv4() + '.' + data.ext;
  require("fs").writeFile( "public\/images\/" + fileName, imageBuffer, (err) => {})

  data.arquivo = fileName
  */
  PostModel.addArquivo (data, (status) => {

    if (status.result.ok == 1) {

      if (data.hasOwnProperty ('push')) {

        PushModel.sendPush (data.push.title, data.push.body, () => {});
      }

      res.json ({
        status: 'ok',
        message: 'Arquivo registrado com sucesso!'
      });
    }
    else {

      res.json ({
        status: 'error',
        message: 'Erro ao salvar estratégia.'
      });
    }
  })
})

router.put ('/arquivo/update', (req, res) => {

  let data = req.body;

  if (
    (!data.hasOwnProperty ('titulo') || data.titulo == '')
    || (!data.hasOwnProperty ('subtitulo') || data.subtitulo == '')
  ) {

    res.send ({
      status: 'error',
      message: 'todos os campos são obrigatórios'
    })

    return;
  }

  //
  // passou a ser salvo no fire storage

  /*var base64Data = data.arquivo.replace("data:application/pdf;base64,", "");
  base64Data = base64Data.replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
  base64Data = base64Data.replace("data:application/vnd.ms-excel;base64,", "");

  let imageBuffer = new Buffer(base64Data, 'base64');

  let fileName = uuidv4() + '.' + data.ext;
  require("fs").writeFile( "public\/images\/" + fileName, imageBuffer, (err) => {})

  data.arquivo = fileName*/

  // caso nao tenha arquivo enviado
  if (data.arquivo == undefined) {
    delete data['arquivo']
  }

  PostModel.updateArquivo (data, (status) => {

    if (status.result.ok == 1) {

      if (data.hasOwnProperty ('push')) {

        PushModel.sendPush (data.push.title, data.push.body, () => {});
      }

      res.json ({
        status: 'ok',
        message: 'Arquivo alterado com sucesso!'
      });
    }
    else {

      res.json ({
        status: 'error',
        message: 'Erro ao salvar estratégia.'
      });
    }
  })
})

router.get ('/call/pages/:page', (req, res) => {

  PostModel.getCall (null, req.params.page, (response) => {
    res.send (response);
  })
});

router.get ('/call/get/:_id', (req, res) => {

  PostModel.getCall (req.params._id, 1, (response) => {
    res.send (response[0])
  })
});

router.post ('/call/registry', (req, res) => {

  let data = req.body;

  if (
    (!data.hasOwnProperty ('tipo_call') || data.tipo_call == '')
    || (!data.hasOwnProperty ('empresa') || data.empresa == '')
    || (!data.hasOwnProperty ('titulo') || data.titulo == '')
    || (!data.hasOwnProperty ('capital') || data.capital == '')
    || (!data.hasOwnProperty ('entrada') || data.entrada == '')
    || (!data.hasOwnProperty ('parcial') || data.parcial == '')
    || (!data.hasOwnProperty ('loss') || data.loss == '')
    || (!data.hasOwnProperty ('final') || data.final == '')
    || (!data.hasOwnProperty ('estrategia') || data.estrategia == '')
  ) {

    res.send ({
      status: 'error',
      message: 'Todos os campos são obrigatórios.'
    })
    return;
  }

  data.status = 'Ativo'
  data.is_entrada = 'N'
  data.is_loss    = 'N'
  data.is_parcial = 'N'
  data.is_final = 'N'

  PostModel.addCall (data, (status) => {

    if (status.result.ok == 1) {

      if (data.hasOwnProperty ('push')) {

        PushModel.sendPush (data.push.title, data.push.body, () => {});
      }

      res.json ({
        status: 'ok',
        message: 'Call registrado com sucesso!'
      });
    }
    else {

      res.json ({
        status: 'error',
        message: 'Erro ao salvar call.'
      });
    }
  })
})

router.put ('/call/update', (req, res) => {

  let data = req.body;

  if (
    (!data.hasOwnProperty ('tipo_call') || data.tipo_call == '')
    || (!data.hasOwnProperty ('empresa') || data.empresa == '')
    || (!data.hasOwnProperty ('titulo') || data.titulo == '')
    || (!data.hasOwnProperty ('capital') || data.capital == '')
    || (!data.hasOwnProperty ('entrada') || data.entrada == '')
    || (!data.hasOwnProperty ('parcial') || data.parcial == '')
    || (!data.hasOwnProperty ('loss') || data.loss == '')
    || (!data.hasOwnProperty ('final') || data.final == '')
    || (!data.hasOwnProperty ('estrategia') || data.estrategia == '')
  ) {
    console.log ("############################ LOGGGGGGG ###########################", data)
    res.send ({
      status: 'error',
      message: 'Todos os campos são obrigatórios.'
    })
    return;
  }

  PostModel.updateCall (data, (status) => {});

  if (data.hasOwnProperty ('push')) {

    PushModel.sendPush (data.push.title, data.push.body, () => {});
  }

  res.json ({
    status: 'ok',
    message: 'Call atualizado com sucesso!'
  });

})

router.post ('/delete', (req, res) => {

  PostModel.deletePost (req.body._id, () => {
    res.send ({status: 'ok'});
  });
})

router.get ('/num-pages/:type', (req, res) => {

  PostModel.getNumPages (req.params.type, (posts) => {

    let numPosts = posts.length
    let numPages = 0

    if (numPosts > 0) {
      numPages = Math.ceil (numPosts / 50)
    }

    res.json ({
      numPages: numPages
    });
  })
})

module.exports = router;
