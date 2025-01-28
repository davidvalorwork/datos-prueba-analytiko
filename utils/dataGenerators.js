const { faker } = require('@faker-js/faker');

const bank_codes = [
  { code: '0102', name: 'BANCO DE VENEZUELA' },
  { code: '0172', name: 'BANCAMIGA BANCO MICROFINANCIERO C A' },
  { code: '0114', name: 'BANCARIBE' },
  { code: '0171', name: 'BANCO ACTIVO' },
  { code: '0166', name: 'BANCO AGRICOLA DE VENEZUELA' },
  { code: '0175', name: 'BANCO BICENTENARIO DEL PUEBLO' },
  { code: '0128', name: 'BANCO CARONI' },
  { code: '0163', name: 'BANCO DEL TESORO' },
  { code: '0115', name: 'BANCO EXTERIOR' },
  { code: '0151', name: 'BANCO FONDO COMUN' },
  { code: '0173', name: 'BANCO INTERNACIONAL DE DESARROLLO' },
  { code: '0105', name: 'BANCO MERCANTIL' },
  { code: '0191', name: 'BANCO NACIONAL DE CREDITO' },
  { code: '0138', name: 'BANCO PLAZA' },
  { code: '0137', name: 'BANCO SOFITASA' },
  { code: '0104', name: 'BANCO VENEZOLANO DE CREDITO' },
  { code: '0168', name: 'BANCRECER' },
  { code: '0134', name: 'BANESCO' },
  { code: '0146', name: 'BANGENTE' },
  { code: '0174', name: 'BANPLUS' },
  { code: '0108', name: 'BBVA PROVINCIAL' },
  { code: '0157', name: 'DELSUR BANCO UNIVERSAL' },
  { code: '0169', name: 'MI BANCO' },
];

const getRandomBankCode = (codes) => {
  let randomIndex = Math.floor(Math.random() * codes.length);
  return codes[randomIndex].code;
};

const getAccounts = () => {
  return {
    cuenta: getRandomBankCode(bank_codes) + faker.number.bigInt(100000000000000000000, 999999999999999999999).toString().slice(4),
  };
};

module.exports = { getAccounts };
