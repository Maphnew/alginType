const readExcel = require("./src/readExcel");
const allFilesJS = require("./src/allFileJS");
const filteredJS = require("./src/filteredJS");
const { replaceAndDuplicate, removePostfix } = require("./src/replaceAndDuplicate");
const renameAddPostfix = require("./src/renameFile");
const removeOld = require("./src/removeOld");
const path = require("path");

// const dirName = path.join(__dirname, "files");
const dirName = "files";
const excel = "alignType.xlsx";
const checkRegex = `({.*align[ ]*:[ ]*)['"](center|left|right)['"]`;
const main = async (excel, dirName) => {
  const xlData = await readExcel(excel);
  const JSfiles = await allFilesJS(dirName);
  const filtered = await filteredJS(JSfiles, checkRegex);
  for (const file of filtered) {
    await replaceAndDuplicate(file, "out", xlData);
  }
  for (const file of filtered) {
    await renameAddPostfix(file, "old");
  }
  const outFiles = filtered.map((file) => `${file}-out`);
  for (const file of outFiles) {
    await removePostfix(file, "out");
  }
  const oldFiles = filtered.map((file) => `${file}-old`);
  console.log(oldFiles);
  for (const file of oldFiles) {
    await removeOld(file);
  }

  console.log(xlData);
  console.log(JSfiles);
  console.log(filtered);
};
main(excel, dirName);
