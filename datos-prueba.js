const XLSX = require('xlsx');
const { createWorkbook } = require('./utils/createWorkbook');
const { getAccounts } = require('./utils/dataGenerators');
const { generateTransfers, generateAlertas, generateAcciones } = require('./utils/generateData');
const { people } = require('./utils/peopleData');

const saveMallaForPersons = (mallaData) => {
  mallaData.forEach(({ person, malla }) => {
    XLSX.writeFile(
      createWorkbook(malla, `malla-${person.documento.toString().substring(2, 10)}`),
      `excels/malla-${person.documento.toString().substring(2, 10)}.xlsx`
    );
  });
};

(async () => {
  let persons = people;
  const customers = persons.map((person) => {
    return {
      cliente_id: person.documento.toString().substring(2, 10),
      nombre_cliente: `${person.name}`,
    };
  });
  let accounts = [];
  for (let i = 0; i < 400; i++) accounts.push(getAccounts());
  accounts = [
    ...new Set(
      accounts.map((account) => account.cuenta.toString().substring(0, 20))
    ),
  ];
  for (let i = 0, ia = 0; i < persons.length; i++) {
    let person = persons[i];
    if (i % 3 == 0) {
      person.accounts = [accounts[ia], accounts[ia + 1], accounts[ia + 2]];
      ia += 3;
    } else {
      if (!person.accounts) {
        person.accounts = [accounts[ia]];
        ia++;
      }
    }
  }
  const accountsPersons = [];
  for (let person of persons) {
    person.accounts.map((account) => {
      accountsPersons.push({
        cliente_id: person.documento.toString().substring(2, 10),
        account_id: account,
      });
    });
  }
  const transfers = generateTransfers(accountsPersons);
  const { malla, alertas } = generateAlertas(persons, transfers);
  const acciones = generateAcciones(alertas);

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(alertas);
  const worksheet2 = XLSX.utils.json_to_sheet(acciones);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Alertas');
  XLSX.utils.book_append_sheet(workbook, worksheet2, 'Acciones');
  XLSX.writeFile(workbook, 'excels/alertas.xlsx');
  XLSX.writeFile(
    createWorkbook(transfers, 'transfers'),
    'excels/transfers.xlsx'
  );
  XLSX.writeFile(
    createWorkbook(accountsPersons, 'accounts'),
    'excels/accounts.xlsx'
  );
  XLSX.writeFile(
    createWorkbook(customers, 'customers'),
    'excels/customers.xlsx'
  );
  saveMallaForPersons(malla);
})();
