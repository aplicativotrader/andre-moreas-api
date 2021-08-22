require('dotenv').config();
var mongoCliente = require ('../config/db');
var mongo = require('mongodb');

const { Expo } = require('expo-server-sdk')

async function getPushToken (token, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("push");

    let list = await collection.find ({}).toArray ();

    callback (list);
  }
  finally {

  }
}

async function deletePushToken (token, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("push");

    await collection.deleteMany ({token: token}, (err, result) => {

      if (err) throw err;
      callback ('done');
    });
  }
  finally {}

}

async function addPushToken (token, callback) {

  try {

    await mongoCliente.connect();
    const collection = mongoCliente.db(process.env.DB_NAME).collection("push");

    // remove tokens já registrados para impedir duplicidade
    deletePushToken (token, (response) => {

      // registra novo token
      let doc = {
        token: token
      };

      let status = collection.insertOne (doc);
      callback(status);
    });
  }
  catch (e) {
    console.log (e);
  }
}

async function sendPush (title, body, callback) {

  let expo = new Expo();

  let messages = [];
  let pushList = [];

  getPushToken ('', (response) => {

    for (let pushToken of response) {
      pushList.push (pushToken.token);
    }
    console.log (pushList)
    for (let pushToken of pushList) {
      console.log (pushToken)
      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
      messages.push({
        to: pushToken,
        sound: 'default',
        title: title,
        body: body,
        data: {},
      })
    }

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log ('ticket')
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
          console.error(error);
        }
      }
    })();

    callback ('done');
  });
}

module.exports = {
  getPushToken,
  addPushToken,
  sendPush
}
