const XLSX = require("xlsx");

const readExcel = async (fileName) => {
  return new Promise((resolve, reject) => {
    const workbook = XLSX.readFile(fileName);
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    let jsonObj = {};

    for (const { messageCode, alignType } of xlData) {
      jsonObj[messageCode] = alignType;
    }
    resolve(jsonObj);
  });
};

module.exports = readExcel;
