const fs = require("fs");

const renameAddPostfix = (file, postfix) => {
  const attachPostfix = `${file}-${postfix}`;
  return new Promise((resolve, reject) => {
    fs.rename(file, attachPostfix, (error) => {
      if (error) {
        // Show the error
        console.log("renameFile", error);
        reject();
      } else {
        // List all the filenames after renaming
        console.log(`File Renamed: ${file} to ${attachPostfix}\n`);
        resolve();
      }
    });
  });
};

module.exports = renameAddPostfix;
