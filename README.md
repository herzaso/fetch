fetch
=============
The fetch API is a great replacement for XHR, allowing for a more modern usage
with Promises.
However, once you start using it, you realize that there are some features that
are missing from the implementation, and this is where this implementation comes
in.

this implementation is an opinionated fetch polyfill (XHR fallback) that enables
progress events, cancellable calls, timeouts and ETag support.

## Installation

### NPM
```sh
npm install --save isomorphic-fetch es6-promise
```

## Usage
Progress handlers are defined the same as in XHR. The handlers are passed to
fetch in the options object by defining ```onProgress``` and
```onUploadProgress```.

```js
function onProgress(event) {
  if (event.lengthComputable) {
    var percent = Math.floor((event.loaded / event.total) * 100);
    console.log(percent);
  }
}

fetch('http://some.api/', { onProgress });
```

## License
This code is provided under MIT license, basically allowing you to do anything
with it but without warranty of any kind.

## Notice

**This package is incomplete, as it is a work in progress.**

**Suggestions, comments and help will be greatly appreciated.**
