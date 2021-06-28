const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://system:andremoraes2021@andremoraes.vqvsu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;
