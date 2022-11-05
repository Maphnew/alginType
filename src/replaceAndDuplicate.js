const fs = require("fs");
const readline = require("readline");

const replaceAndDuplicate = (filename, postfix, xlData) => {
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
      let replacedLine = line;
      for (const msgCode in xlData) {
        const regexpStr = `({.*${msgCode}.*align[ ]*:[ ]*)['"](center|left|right)['"]`;
        const regexp = new RegExp(regexpStr, "g");
        if (line.match(regexp)) {
          replacedLine = line.replace(/['"](center|left|right)['"]/, `commonui.alignType.${xlData[msgCode]}`);
          break;
        }
      }
      this.output.write(`${replacedLine}\n`);
    }
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

module.exports = { replaceAndDuplicate, removePostfix };
