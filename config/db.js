const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://andremoraes01:Andre01*01@mongo71-farm10.kinghost.net/andremoraes01";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
process.env.TZ = 'America/Sao_Paulo' 
module.exports = client;
