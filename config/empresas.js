require('dotenv').config();
var mongoCliente = require ('../config/db');
var mongo = require('mongodb');

async function getEmpresas (_id, callback) {

  let query = {};

  if (_id != null && _id != undefined) {

    query = {
      _id: new mongo.ObjectID(_id)
    }
  }

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("empresas");

    let list = await collection.find (query).toArray ();

    callback (list);

  } finally {

    //mongoCliente.close ();
  }
}

async function insertEmpresa (nome, sigla, logo, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("empresas");

    let doc = {
      nome: nome,
      sigla: sigla,
      logo: logo
    };

    let status = await collection.insertOne (doc);
    callback(status);
  }
  catch (e) {
    console.log (e);
  }

}

async function updateEmpresa (_id, nome, sigla, logo, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("empresas");

    const ret = await collection.updateOne (
                                              {_id: new mongo.ObjectID(_id)},
                                              {
                                                $set: {
                                                  "nome": nome,
                                                  "sigla": sigla,
                                                  "logo": logo
                                                }
                                              }
                                            );

    callback (ret);

  }
  catch (e) {
    console.log (e);
  }
}

module.exports = {
  insertEmpresa,
  getEmpresas,
  updateEmpresa
}
