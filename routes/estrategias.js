var express = require('express');
var router = express.Router();
var EstrategiasModel = require ('../config/estrategias');

router.get('/get', function(req, res, next) {

  EstrategiasModel.getEstrategia (null, function (list) {

    res.send (list)
  })
});

router.get('/get/:id', function(req, res, next) {

  EstrategiasModel.getEstrategia (req.params.id, function (object) {

    res.send (object[0])
  })
});

router.post ('/registry', function (req, res, next) {

  if (!req.body.hasOwnProperty('estrategia') || req.body.estrategia == '') {

    res.send ({
              status: 'error',
              message: 'Uma estratégia deve ser informada.'
                });
    return ;
  }

  EstrategiasModel.insertEstrategia (req.body.estrategia, function (status) {


    if (status.result.ok == 1) {

      res.json ({
        status: 'ok',
        message: 'Estratégia registrada com sucesso!'
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

router.put ('/update', function (req, res) {

  let data = req.body;

  if (
      (!data.hasOwnProperty('_id') || data._id == '')
      || (!data.hasOwnProperty('estrategia') || data.estrategia == '')
      || (!data.hasOwnProperty('status') || data.status == '')
    ) {

    res.send ({
              status: 'error',
              message: 'Todos os campos são obrigatórios.'
                });
    return ;
  }

  EstrategiasModel.updateEstrategia (data._id, data.estrategia, data.status, function (response) {

    if (response.result.ok == 1) {

      res.json ({
        status: 'ok',
        message: 'Estratégia atualizada com sucesso!'
      });
    }
    else {

      res.json ({
        status: 'error',
        message: 'Erro ao salvar estratégia.'
      });
    }
  })
});

module.exports = router;
