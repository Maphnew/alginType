const fs = require("fs");

const addPostfix = (file, postfix) => {
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
const removePostfix = (file, postfix) => {
  const removed = file.replace(`-${postfix}`, "");
  return new Promise((resolve, reject) => {
    fs.rename(file, removed, (error) => {
      if (error) {
        reject("renameFile", error);
      } else {
        console.log(`File Renamed: ${file} to ${removed}\n`);
        resolve();
      }
    });
  });
};
module.exports = { addPostfix, removePostfix };
