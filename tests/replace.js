const { readFile, writeFile, promises: fsPromises } = require("fs");

async function replaceInFile(filename, regexpStr, replacement) {
  const regexp = new RegExp(regexpStr, "g");
  try {
    const contents = await fsPromises.readFile(filename, "utf-8");
    const replaced = contents.replace(regexp, replacement);

    await fsPromises.writeFile(filename, replaced);
  } catch (err) {
    console.log(err);
  }
}

const regexpStr = `['"](center|left|right)['"]`;
replaceInFile("tests/testOut.js", regexpStr, "commonui.alignType.order");
