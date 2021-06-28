
function readFileData (file, callback) {

  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e) {

    callback (e.target.result);
  }
}

function readFileList (fileList, callback) {

  let list = [];

  for (let i = 0; i < fileList.length; i++) {

    let reader = new FileReader();
    reader.readAsDataURL(fileList.item (i));
    reader.onload = function(e) {

      list.push ( e.target.result );
      if (i == (fileList.length - 1)) {

        callback (list);
        return;
      }

    }
  }


}

export default {
  readFileData,
  readFileList
}
