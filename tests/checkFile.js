const { readFile, writeFile, promises: fsPromises } = require("fs");

async function checkFile(filename, regexpStr, replacement) {
  const regexp = new RegExp(regexpStr, "g");
  try {
    const contents = await fsPromises.readFile(filename, "utf-8");
    const matchedLines = contents.match(regexp);
    const n = null;
    console.log(matchedLines?.length);
    if (n?.length > 0) {
      console.log("baam");
    }
  } catch (err) {
    console.log(err);
  }
}

const fileName = "tests/testOut.js";
// const regexpStr = `({.*A00920.*align[ ]*:[ ]*)['"](center|left|right)['"]`;
const regexpStr = `({.*align[ ]*:[ ]*)['"](center|left|right)['"]`;
checkFile(fileName, regexpStr);
