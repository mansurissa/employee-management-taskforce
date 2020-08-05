import { resolve } from 'path';
import { readFile, utils } from 'xlsx';

const uploadPath = resolve(__dirname, '../excelLists/', 'employeesList.xlsx');

export const uploadExcel = async (req, res, next) => {
  if (!req.files) return next();

  const excelList = req.files.excel;
  await excelList.mv(uploadPath, (err) => {
    if (err) {
      console.log(err);
      return false;
    }
    return true;
  });
  return next();
};

export const readExcel = (req, res, next) => {
  const eL = readFile(uploadPath, { cellDates: true });
  const sheet = eL.Sheets.Sheet1;
  const finalList = utils.sheet_to_json(sheet).map((employee) => {
    return {
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      status: employee.status,
      position: employee.position,
      birth: `${employee.birthday.split('/')[2]}-${
        employee.birthday.split('/')[1]
      }-${employee.birthday.split('/')[0]}`,
      nId: employee.nid,
    };
  });
  req.employeeList = finalList;
  return next();
};
