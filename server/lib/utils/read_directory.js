"use strict";

const fs = require("fs");
const path = require("path");
const readdir = fs.readdir;
const stat = fs.stat;

function readDirPromise(dir) {
  return new Promise(function (resolve, reject) {
    readdir(dir, function (err, files) {
      resolve(files);
    });
  });
}

function statFile(file) {
  return new Promise(function (resolve, reject) {
    stat(file, function (err, stat) {
      resolve(stat);
    });
  });
}

module.exports = function readDirectory(directoryPath) {
  return readDirPromise(directoryPath).then(files => {
    return Promise.all(files.map(file => {
      const absolutePath = path.join(directoryPath, file);

      return statFile(absolutePath).then(stat => {
        return {
          name: file,
          path: absolutePath,
          stat: stat
        };
      });
    })).then(files => {
      return Promise.all(files.map(file => {
        if (file.stat.isDirectory()) {
          return readDirectory(file.path).then(readFiles => {
            file.content = readFiles;
            return file;
          });
        }

        file.content = file.path;
        return file;
      }));
    });
  }).then(files => {
    const tree = {};

    files.forEach(file => {
      tree[file.name] = file.content;
    });

    return tree;
  });
}
