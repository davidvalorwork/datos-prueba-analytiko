const XLSX = require('xlsx');

function createWorkbook(data, sheetName) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  return workbook;
}

module.exports = { createWorkbook };
