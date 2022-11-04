const readExcel = require("./src/readExcel");
const allFilesJS = require("./tests/globTest");

const dirName = "files";
const excel = "alignType.xlsx";
const main = async (excel, dirName) => {
  const JSfiles = await allFilesJS(dirName);
  const xlData = readExcel(excel);
  console.log(xlData);
  console.log(JSfiles);
};
main(excel, dirName);
