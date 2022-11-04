var glob = require("glob");

const allFilesJS = async (dirName) => {
  return new Promise((resolve, reject) => {
    glob(`${dirName}/**/*.js`, (err, files) => {
      err != null ? reject(err) : resolve(files);
    });
  });
};

const main = async (dirName) => {
  const filesJS = await allFilesJS(dirName);
  return filesJS;
};

module.exports = main;
