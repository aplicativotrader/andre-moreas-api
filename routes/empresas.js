var express = require('express');
var router = express.Router();
var EmpresasModel = require ('../config/empresas');
const { v4: uuidv4 } = require('uuid');
/* GET home page. */

router.get('/get', function(req, res, next) {

  EmpresasModel.getEmpresas (null, (empresas) => {

    res.send (empresas);
  });

});

router.get('/get/:id', function(req, res, next) {

  EmpresasModel.getEmpresas (req.params.id, (empresas) => {

    res.send (empresas[0]);
  });
});

router.post ('/create', function (req, res) {

  let data = req.body;

  if (
      (!data.hasOwnProperty ('nome') || data.nome == '')
      || (!data.hasOwnProperty ('sigla') || data.sigla == '')
      || (!data.hasOwnProperty ('logo') || data.logo == '')
    ) {

      res.send ({
        status: 'error',
        message: 'Preencha todos os campos'
      });

      return ;
  }

  // cria imagem
  var base64Data = data.logo.replace("data:image/png;base64,", "");
  base64Data = base64Data.replace("data:image/jpg;base64,", "");
  base64Data = base64Data.replace("data:image/jpeg;base64,", "");

  let imageBuffer = new Buffer(base64Data, 'base64');

  let fileName = uuidv4() + '.png';

  require("fs").writeFile( "public\/images\/" + fileName, imageBuffer, function(err) {

    if (err) {
      res.send ({
        status: 'error',
        message: 'Erro ao salvar imagem.'
      });

      return ;
    }

    EmpresasModel.insertEmpresa (data.nome, data.sigla, fileName, (status) => {

      if (status.status == 'ok') {

        res.json ({
          status: 'ok',
          message: 'Estratégia registrada com sucesso!'
        });
      }
      else if (status.status == 'error') {

        res.send (status)
      }
      else {

        res.json ({
          status: 'error',
          message: 'Erro ao salvar estratégia.'
        });
      }
    });

  });
})

router.put ('/update', function (req, res) {

  let data = req.body;

  if (
      (!data.hasOwnProperty ('_id') || data._id == '')
      || (!data.hasOwnProperty ('nome') || data.nome == '')
      || (!data.hasOwnProperty ('sigla') || data.sigla == '')
    ) {

      res.send ({
        status: 'error',
        message: 'Preencha todos os campos'
      });

      return ;
  }

    // cria imagem
    let fileName = '';

    if (req.body.hasOwnProperty ('logo') && req.body.logo != undefined && req.body.logo != null) {

      var base64Data = data.logo.replace("data:image/png;base64,", "");
      base64Data = base64Data.replace("data:image/jpg;base64,", "");
      base64Data = base64Data.replace("data:image/jpeg;base64,", "");

      let imageBuffer = new Buffer(base64Data, 'base64');

      fileName = uuidv4() + '.png';
      require("fs").writeFile( "public\/images\/" + fileName, imageBuffer, function(err) {})
    }

    EmpresasModel.updateEmpresa (data._id, data.nome, data.sigla, fileName, (response) => {

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
})

module.exports = router;
