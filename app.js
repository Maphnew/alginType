const fs = require("fs");
const readline = require('readline');

const findJSfile = (fileList) => {
    const regexpStr = `.js$`;
    const regexp = new RegExp(regexpStr,"g");
    fileList.forEach((file) => {
        if (file.match(regexp)) {
            return file;
        }
    })
}

const readDirectory = (dir) => {
    fs.readdir(dir, (err, fileList) => {
        const jsFile = findJSfile(fileList)
        console.log(jsFile)
    })
};

const dirName = 'files';
readDirectory(dirName);

async function processLineByLine(messageCode) {
    const fileStream = fs.createReadStream('test.js');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        // console.log(`Line from file: ${line}`);
        const regexpStr = `({.*${messageCode}.*align[ ]*:[ ]*)['"](center|left|right)['"]`;
        const regexp = new RegExp(regexpStr,"g");
        if(line.match(regexp)) {
            console.log('match', line);
        }
    }
}

const messages = [
    'A00615',
    'A00920',
    'A05500',
    'A00885',
    'A00968',
    'A01143'
]

messages.forEach((message) => {
    processLineByLine(message);
})
