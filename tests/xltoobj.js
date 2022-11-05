const readExcel = require("../src/readExcel");

const excel = "alignType.xlsx";

const main = async () => {
  const xlData = await readExcel(excel);
  for (const data in xlData) {
    console.log(data, xlData[data]);
  }
};

main();
