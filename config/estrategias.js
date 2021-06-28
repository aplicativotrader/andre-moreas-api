require('dotenv').config();
var mongoCliente = require ('../config/db');
var mongo = require('mongodb');

async function getEstrategia (estrategiaId, callback) {

  let query = {};

  if (estrategiaId != undefined && estrategiaId != null) {

    query = {
      _id: new mongo.ObjectID(estrategiaId)
    };
  }

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("estrategias");

    let list = await collection.find (query).toArray ();

    callback (list);

  } finally {

    //mongoCliente.close ();
  }
}

async function insertEstrategia (estrategia, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("estrategias");

    let doc = {
      estrategia: estrategia,
      status: "A"
    };

    let status = await collection.insertOne (doc);
    callback(status);
  }
  catch (e) {
    console.log (e);
  }
  finally {

    //await mongoCliente.close ();
  }
}

async function updateEstrategia (_id, estrategia, state, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("estrategias");

    const ret = await collection.updateOne (
                                              {_id: new mongo.ObjectID(_id)},
                                              {
                                                $set: {
                                                  "estrategia": estrategia,
                                                  "status": state
                                                }
                                              }
                                            );

    callback (ret)
  }
  catch (e) {
    console.log (e)
  }
}

module.exports = {
  getEstrategia,
  insertEstrategia,
  updateEstrategia
}
