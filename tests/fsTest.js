const fs = require("fs");

const findJSfile = (dirName, fileList) => {
  console.log("all files and directories", fileList);
  const regexpStr = `.js$`;
  const regexp = new RegExp(regexpStr, "g");
  return fileList
    .filter((file) => {
      if (file.match(regexp)) {
        return file;
      }
    })
    .map((file) => `${dirName}/${file}`);
};

const readDirectory = async (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, list) => (err != null ? reject(err) : resolve(list)));
  });
};

const main = async (dirName) => {
  const fileList = await readDirectory(dirName);
  const JSfiles = findJSfile(dirName, fileList);
  console.log(JSfiles);
};

const dirName = "./files";
main(dirName);
