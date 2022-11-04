const fs = require("fs");
const readline = require("readline");

const replaceAndDuplicate = (filename, postfix, messageCode, alignType) => {
  return new Promise((resolve, reject) => {
    const readFile = readline.createInterface({
      input: fs.createReadStream(filename),
      output: fs.createWriteStream(`${filename}-${postfix}`),
      terminal: false,
    });
    try {
      readFile.on("line", transformFn).on("close", function () {
        console.log(`Created "${this.output.path}"`);
        resolve();
      });
    } catch {
      reject("replaceAndDuplicate - rejected");
    }

    function transformFn(line) {
      const regexpStr = `({.*${messageCode}.*align[ ]*:[ ]*)['"](center|left|right)['"]`;
      const regexp = new RegExp(regexpStr, "g");
      let replacedLine;
      if (line.match(regexp)) {
        replacedLine = line.replace(/['"](center|left|right)['"]/, `commonui.alignType.${alignType}`);
      } else {
        replacedLine = line;
      }
      this.output.write(`${replacedLine}\n`);
    }
  });
};

const removePostfix = (file, postfix) => {
  console.log("removePostfix:", file, postfix);
  const removed = file.replace(`-${postfix}`, "");
  console.log(removed);
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

module.exports = { replaceAndDuplicate, removePostfix };
