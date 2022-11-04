const XLSX = require("xlsx");
const workbook = XLSX.readFile("alignType.xlsx");
const sheet_name_list = workbook.SheetNames;
const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
module.exports = xlData;
