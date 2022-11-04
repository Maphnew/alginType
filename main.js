const readExcel = require("./src/readExcel");
const allFilesJS = require("./src/allFileJS");
const filteredJS = require("./src/filteredJS");

const dirName = "files";
const excel = "alignType.xlsx";
const main = async (excel, dirName) => {
  const JSfiles = await allFilesJS(dirName);
  const xlData = readExcel(excel);
  const filtered = await filteredJS(JSfiles, `({.*align[ ]*:[ ]*)['"](center|left|right)['"]`);
  console.log(filtered);
};
main(excel, dirName);
