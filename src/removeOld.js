const fs = require("fs");

const removeOld = async (fileName) => {
  return new Promise((resolve, reject) => {
    fs.stat(fileName, function (err, stats) {
      // console.log(stats); //here we got all information of file in stats variable

      if (err) {
        return console.error(err);
      }

      fs.unlink(fileName, function (err) {
        if (err && err.code == "ENOENT") {
          // file doens't exist
          console.info("File doesn't exist, won't remove it.");
          reject("File doesn't exist, won't remove it.");
        } else if (err) {
          // other errors, e.g. maybe we don't have enough permission
          console.error("Error occurred while trying to remove file");
          reject("Error occurred while trying to remove file");
        } else {
          resolve("file deleted successfully");
        }
      });
    });
  });
};

module.exports = removeOld;
