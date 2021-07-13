require('dotenv').config();
var mongoCliente = require ('../config/db');
var mongo = require('mongodb');

async function getPosts (page, filtro, callback) {

  const limit = 10;
  const skipIndex = (page - 1) * limit;
  const results = {};

  let query = {};

  if (!filtro.tudo) {

    if (filtro.type != null && filtro.type != 'null') {
      query.type = filtro.type
    }

    if (filtro.type == 'call') {
      if (filtro.hasOwnProperty('tipoCall') && filtro.tipoCall != null && filtro.tipoCall != filtro.tipoCall != 'null') {
        query.tipo_call = filtro.tipoCall
      }
      if (filtro.hasOwnProperty('statusCall') && filtro.statusCall != null && filtro.statusCall != filtro.statusCall != 'null') {
        query.status = filtro.statusCall
      }
    }

  }

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post");

    if (filtro.type == 'info') {

      let posts = await collection.find({$or: [{type: 'imagem'}, {type: 'arquivo'}]})
                                .limit (limit)
                                .skip (skipIndex)
                              .toArray ();

      callback (posts);
    }
    else {

      let posts = await collection.find (query)
                                .sort ({changed: -1, created: -1})
                                .limit (limit)
                                .skip (skipIndex)
                              .toArray ();

      callback (posts);
    }

  }
  finally {}
}

// videos
async function getVideos (_id, callback) {

  let query = {type: 'video'};

  if (_id != null && _id != undefined) {
    query._id = new mongo.ObjectID(_id)
  }

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post");

    let videos = await collection.find (query).toArray ();

    callback (videos);
  }
  finally {}
}

async function addVideo (doc, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post");

    doc.type = 'video';

    let date = new Date ();
    doc.created = date
    doc.changed = date

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

async function updateVideo (doc, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post");
    let date = new Date ();

    let status = await collection.updateOne (
                                              {_id: new mongo.ObjectID(doc._id)},
                                              {
                                                $set: {
                                                  titulo: doc.titulo,
                                                  subtitulo: doc.subtitulo,
                                                  link: doc.link,
                                                  changed: new Date ()
                                                }
                                              }
                                            );

    callback (status);
  }
  finally {}
}
// -- //

// imagens

async function getImagem (_id, callback) {

  let query = {type: 'imagem'};

  if (_id != null && _id != undefined) {
    query._id = new mongo.ObjectID(_id)
  }

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post");

    let videos = await collection.find (query).toArray ();

    callback (videos);
  }
  finally {}
}

async function addImagem (titulo, subtitulo, link, texto, imagem, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post")

    let doc = {
      titulo: titulo,
      subtitulo: subtitulo,
      link: link,
      texto: texto,
      imagem: imagem,
      type: 'imagem'
    }

    let date = new Date ();
    doc.created = date
    doc.changed = date

    let status = await collection.insertOne (doc);
    callback (status);
  }
  finally {}
}

async function updateImagem (_id, titulo, subtitulo, link, texto, imagem, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post")

    let doc = {
      titulo: titulo,
      subtitulo: subtitulo,
      link: link,
      texto: texto,
      changed: new Date ()
    }

    if (imagem != null) {
      doc.imagem = imagem
    }

    let status = await collection.updateOne ({_id: new mongo.ObjectID(_id)},
                                              {
                                                $set: doc
                                              });
    callback (status);
  }
  finally {}
}

// arquivo
async function getArquivo (_id, callback) {

  let query = {type: 'arquivo'};

  if (_id != null && _id != undefined) {
    query._id = new mongo.ObjectID(_id)
  }

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post");

    let arquivos = await collection.find (query).toArray ();

    callback (arquivos);
  }
  finally {}
}


async function addArquivo (doc, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post");
    let date = new Date ();

    doc.type = 'arquivo';
    doc.created = date
    doc.changed = date

    let status = await collection.insertOne (doc);
    callback(status);
  }
  catch (e) {
    console.log (e);
  }
  finally {}
}

async function updateArquivo (doc, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post");
    doc.changed = new Date ();

    let _id = doc._id
    delete doc['_id']

    let status = await collection.updateOne (
                                              {_id: new mongo.ObjectID(_id)},
                                              {
                                                $set: doc
                                              }
                                            );

    callback (status);
  }
  finally {}
}

// call
async function getCall (_id, callback) {

  let query = {type: 'call'};

  if (_id != null && _id != undefined) {
    query._id = new mongo.ObjectID(_id)
  }

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post");

    let arquivos = await collection.find (query)
                                    .sort ({"empresa.nome": 1, "empresa.sigla": 1})
                                  .toArray ();

    callback (arquivos);
  }
  finally {}
}

async function addCall (doc, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post");
    let date = new Date ();

    doc.type = 'call';
    doc.created = date
    doc.changed = date

    let status = await collection.insertOne (doc);
    callback(status);
  }
  catch (e) {
    console.log (e);
  }
  finally {}
}

async function updateCall (doc, callback) {

  getCall (doc._id, (call) => {

    let updates = [];
    let date = new Date ();

    call = call[0]

    if (call.hasOwnProperty ('update')) {
      updates = call.update
    }

    if (doc.capital != call.capital) {

      updates.push ({
                      titulo: 'Capital alterado para ' + doc.capital,
                      data: date
                    })
    }

    if (doc.entrada != call.entrada) {

      updates.push ({
                    titulo: 'Preço de entrada alterado para ' + doc.entrada,
                    data: date
                  })
    }

    if (doc.loss != call.loss) {

      updates.push ({
                    titulo: 'Preço stop loss alterado para ' + doc.loss,
                    data: date
                  })
    }

    if (doc.parcial != call.parcial) {

      updates.push ({
                    titulo: 'Preço parcial alterado para ' + doc.parcial,
                    data: date
                  })
    }

    if (doc.final != call.final) {

      updates.push ({
                    titulo: 'Preço final alterado para ' + doc.final,
                    data: date
                  })
    }

    if (doc.is_entrada != call.is_entrada) {

      updates.push ({
                    titulo: 'Preço Entrada bateu ' + doc.entrada,
                    data: date
                  })
    }

    if (doc.is_loss != call.is_loss) {

      updates.push ({
                    titulo: 'Preço Stop loss bateu para ' + doc.loss,
                    data: date
                  })
    }

    if (doc.is_parcial != call.is_parcial) {

      updates.push ({
                    titulo: 'Preço Parcial bateu ' + doc.parcial,
                    data: date
                  })
    }

    if (doc.is_final != call.is_final) {

      updates.push ({
                    titulo: 'Preço Final bateu ' + doc.final,
                    data: date
                  })
    }

    mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("post");

    let status = collection.updateOne ({_id: new mongo.ObjectID (doc._id)}, {
                                              $set: {
                                                status: doc.status,
                                                tipo_call: doc.tipo_call,
                                                titulo: doc.titulo,
                                                capital: doc.capital,
                                                entrada: doc.entrada,
                                                loss: doc.loss,
                                                parcial: doc.parcial,
                                                final: doc.final,
                                                estrategia: doc.estrategia,
                                                status: doc.status,
                                                is_entrada: doc.is_entrada,
                                                is_loss: doc.is_loss,
                                                is_parcial: doc.is_parcial,
                                                is_final: doc.is_final,
                                                changed: date,
                                                update: updates
                                              }
                                            });

    callback (true)
  })
}

module.exports = {
  getVideos,
  addVideo,
  updateVideo,
  addImagem,
  getImagem,
  updateImagem,
  getArquivo,
  addArquivo,
  updateArquivo,
  getCall,
  addCall,
  getPosts,
  updateCall
}
