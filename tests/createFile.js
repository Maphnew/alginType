const fs = require("fs");
const readline = require("readline");

const readFile = readline.createInterface({
  input: fs.createReadStream("tests/test.js"),
  output: fs.createWriteStream("tests/testOut.js"),
  terminal: false,
});

readFile.on("line", transform).on("close", function () {
  console.log(`Created "${this.output.path}"`);
});

function transform(line) {
  const regexpStr = `({.*A00615.*align[ ]*:[ ]*)['"](center|left|right)['"]`;
  const regexp = new RegExp(regexpStr, "g");
  let replacedLine;
  if (line.match(regexp)) {
    replacedLine = line.replace(/['"](center|left|right)['"]/, "commonui.alignType.order");
  } else {
    replacedLine = line;
  }
  this.output.write(`${replacedLine}\n`);
}
