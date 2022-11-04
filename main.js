const readExcel = require("./src/readExcel");
const allFilesJS = require("./src/allFileJS");
const filteredJS = require("./src/filteredJS");
const { replaceAndDuplicate, removePostfix } = require("./src/replaceAndDuplicate");
const renameAddPostfix = require("./src/renameFile");

const dirName = "files";
const excel = "alignType.xlsx";
const checkRegex = `({.*align[ ]*:[ ]*)['"](center|left|right)['"]`;
const main = async (excel, dirName) => {
  const xlData = readExcel(excel);
  const JSfiles = await allFilesJS(dirName);
  const filtered = await filteredJS(JSfiles, checkRegex);
  for (const file of filtered) {
    await replaceAndDuplicate(file, "out", "A00615", "order");
  }
  for (const file of filtered) {
    await renameAddPostfix(file, "old");
  }
  const outFiles = filtered.map((file) => `${file}-out`);
  console.log(outFiles);
  for (const file of outFiles) {
    await removePostfix(file, "out");
  }

  console.log(xlData);
  console.log(JSfiles);
  console.log(filtered);
};
main(excel, dirName);
