var express = require('express');
var router = express.Router();
var PushModel = require ('../config/push');

router.post('/', function(req, res) {

  PushModel.sendPush (req.body.title, req.body.body, () => {

    res.sendStatus (200);
  });
});

router.post ('/register', function (req, res) {

  if (!req.body.hasOwnProperty ('push_token') || req.body.push_token == '') {

    res.send ({
      status: 'error',
      message: 'Push token inválido.'
    });
  }

  PushModel.addPushToken (req.body.push_token, (response) => {

    Promise.resolve (response)
      .then (status => {
        if (status.result.ok == 1) {

          res.json ({
            status: 'ok',
            message: 'Token registrado com sucesso!'
          });
        }
        else {

          res.json ({
            status: 'error',
            message: 'Erro ao salvar token.'
          });
        }
      });
  })
});

module.exports = router;
