#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

function throwError(err) {
  throw err;
}
function throwError(err) {
  throw err;
}

function prependSlash(string) {
  return string.charAt(0) === '/' ? string : '/' + string;
}

function generateFirebaseHeadersFromPushManifest(pushManifest) {
  return Object.keys(pushManifest).map((source) => {
    return {
      source: prependSlash(source),
      headers: [{
        key: "Link",
        value: Object.keys(pushManifest[source]).map((value) => {
          return [
            "<" + prependSlash(value) + ">",
            "rel=preload",
            "as=" + pushManifest[source][value].type
          ].join(";");
        }).join(',')
      }]
    };
  });
}

function readFilesFromPublicPath(publicPath) {
  const firebasePath = path.join(publicPath, "firebase.json");
  const readFirebaseFile = readFile(firebasePath).then(JSON.parse);
  const pushManifestPath = path.join(publicPath, "push-manifest.json");
  const generateHeaders = readFile(pushManifestPath)
    .then(JSON.parse)
    .then(generateFirebaseHeadersFromPushManifest);
  return Promise.all([readFirebaseFile, generateHeaders])
}

function addNewHeadersToFirebase(firebase, newHeaders) {
  debugger;
  const headers = (firebase.hosting.headers || []).concat(newHeaders);
  firebase.hosting.headers = headers;
  return firebase;
}

function removeDuplicatedHeaders(firebase) {
  debugger;
  const headers = firebase.hosting.headers.filter((header, index, self) => {
    return self.findIndex((t) => {
      return t.source === header.source;
    }) === index
  });
  firebase.hosting.headers = headers;
  return firebase;
}

readFile("firebase.json")
  .then(JSON.parse)
  .then((json) => json.hosting.public)
  .then((publicPath) => {
    const firebasePath = path.join(publicPath, "firebase.json");
    return readFilesFromPublicPath(publicPath)
      .then((results) => addNewHeadersToFirebase.apply(this, results))
      .then(removeDuplicatedHeaders)
      .then((data) => JSON.stringify(data, null, '  '))
      .then((data) => writeFile(firebasePath, data));
  })
  .catch(throwError);