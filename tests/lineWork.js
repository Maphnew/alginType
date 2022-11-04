const { createReadStream, readFile, writeFile, promises: fsPromises } = require("fs");
const readline = require("readline");

async function processLineByLine(messageCode) {
  const fileStream = createReadStream("test.js");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const regexpStr = `({.*${messageCode}.*align[ ]*:[ ]*)['"](center|left|right)['"]`;
    const regexp = new RegExp(regexpStr, "g");
    if (line.match(regexp)) {
      console.log("match", line);
    }
  }
}

const messages = ["A00615", "A00920", "A05500", "A00885", "A00968", "A01143"];

messages.forEach((message) => {
  processLineByLine(message);
});
