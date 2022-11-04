const { readFile, promises: fsPromises } = require("fs");

const checkFile = async (filename, regexpStr) => {
  const regexp = new RegExp(regexpStr, "g");
  try {
    const contents = await fsPromises.readFile(filename, "utf-8");
    const matchedLines = contents.match(regexp);
    return matchedLines?.length > 0;
  } catch (err) {
    console.log("checkFile error:", err);
  }
  return false;
};

const multipleCheck = async (files, regexpStr) => {
  const mapped = await Promise.all(
    files.map(async (file) => {
      const hasMsGrid = await checkFile(file, regexpStr);
      if (hasMsGrid) {
        return file;
      }
    })
  );
  return mapped.filter((file) => (file ? file : false));
};

module.exports = multipleCheck;
