"use strict";

const stat = require("fs").stat;
const path = require("path");

const _ = require("lodash");

const readDir = require("./read_directory");

module.exports = function readThemes(themePath) {
  let originalTree;

  return readDir(themePath).then(files => {
    originalTree = files;

    return Promise.all(Object.keys(files).map(file => {
      return statFile(path.join(themePath, file)).then(stat => {
        return stat.isDirectory();
      }).then(is => {
        if (is) {
          return file;
        }
      });
    }));
  })
  .then(directories => {
    directories = _.compact(directories);
    let themes = {};

    directories.forEach(dir => {
      themes[dir] = originalTree[dir];
    });

    return themes;
  });
}

function statFile(file) {
  return new Promise(function (resolve, reject) {
    stat(file, function (err, fileStat) {
      resolve(fileStat);
    });
  });
}
