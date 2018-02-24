'use strict';

var fetchIsDefined = !!global.fetch;

function timelyPromise(promise, ms) {
  var timeout = new Promise((resolve, reject) => {
    var id = setTimeout(function() {
      clearTimeout(id);
      reject(new Error('timeout'));
    }, ms);
  })

  return Promise.race([promise, timeout]);
}

function fetch(uri, options = {}) {
  var defaults = {
    method: 'GET',
    headers: [],
    timeout: null
  };
  var op = Object.assign({}, defaults, options);
  var promise = op.onProgress || op.onUploadProgress || !fetchIsDefined ?
    new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(op.method, uri);
      xhr.onload = function() {
        resolve(xhr.responseText);
      }
      xhr.onerror = reject;
      xhr.onprogress = op.onProgress;
      xhr.upload.onprogress = op.onUploadProgress;
      op.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      })
      xhr.send(op.body);
    }) : fetch(uri, op);

  return op.timeout === null ?
    promise :
    timelyPromise(promise, op.timeout);
}

module.exports = fetch;
module.exports.timelyPromise = timelyPromise;

if (!fetchIsDefined) {
	global.fetch = module.exports;
}
