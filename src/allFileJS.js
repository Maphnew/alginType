var glob = require("glob");

const allFilesJS = async (dirName) => {
  const path = `${dirName}/**/*.js`;
  return new Promise((resolve, reject) => {
    glob(path, (err, files) => {
      err != null ? reject(err) : resolve(files);
    });
  });
};

module.exports = allFilesJS;
