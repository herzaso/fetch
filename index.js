'use strict';

/*
function onprogress(event) {
  if (event.lengthComputable) {
    var percent = Math.floor((event.loaded / event.total) * 100)
    console.log(percent)
  }
}
*/

function timelyPromise(promise, ms) {
  var timeout = new Promise((resolve, reject) => {
    var id = setTimeout(function() {
      clearTimeout(id);
      reject(new Error('timeout'));
    }, ms);
  })

  return Promise.race([promise, timeout]);
}

function xfetch(uri, options = {}, onprogress = null) {
  var defaults = {
    method: 'GET',
    headers: [],
    body: null,
    timeout: null
  };
  var op = Object.assign({}, defaults, options);
  var promise = onprogress ?
    new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(op.method, uri);
      xhr.onload = function() {
        resolve(xhr.responseText);
      }
      xhr.onerror = reject;
      xhr.onprogress = onprogress;
      xhr.upload.onprogress = onprogress;
      op.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      })
      xhr.send();
    }) :
    fetch(uri, op);

  return op.timeout === null ?
    promise :
    timelyPromise(promise, op.timeout);
}

module.exports = xfetch;
module.exports.timelyPromise = timelyPromise;
