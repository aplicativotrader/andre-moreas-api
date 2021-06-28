import ls from 'local-storage'

function getData (key, callback) {

  callback (ls.get(key));
}

function setData (key, data, callback) {

  ls.set (key, data);
  callback ();
}

export default {
  getData,
  setData
}
