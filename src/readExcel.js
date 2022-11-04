const XLSX = require("xlsx");

const readExcel = (fileName) => {
  const workbook = XLSX.readFile(fileName);
  const sheet_name_list = workbook.SheetNames;
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return xlData;
};

module.exports = readExcel;
