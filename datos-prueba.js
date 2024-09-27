const XLSX = require('xlsx');
const axios = require('axios');
const { faker, fa } = require('@faker-js/faker');
const fs = require('fs');

function createWorkbook(data, sheetName) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  return workbook;
}

const people = [
  {
    name: 'Adonis',
    lastname: 'Georgiou',
  },
  {
    name: 'Apolo',
    lastname: 'Pappas',
  },
  {
    name: 'Ares',
    lastname: 'Papadopoulos',
  },
  {
    name: 'Noah',
    lastname: 'Anderson',
  },
  {
    name: 'Oliver',
    lastname: 'Brown',
  },
  {
    name: 'James',
    lastname: 'Jones',
  },
  {
    name: 'Elijah',
    lastname: 'Smith',
  },
];
const bank_codes = [
  '0001',
  '0102',
  '0104',
  '0105',
  '0108',
  '0114',
  '0115',
  '0128',
  '0134',
  '0137',
  '0138',
  '0146',
  '0151',
  '0156',
  '0157',
  '0163',
  '0166',
  '0168',
  '0169',
  '0171',
  '0172',
  '0173',
  '0174',
  '0175',
  '0177',
  '0178',
  '0191',
  '0601',
];
const getRandomBankCode = (codes) => {
  let randomIndex = Math.floor(Math.random() * codes.length);
  return codes[randomIndex];
};
const getPerson = () => {
  return {
    nombre: faker.person.firstName(),
    apellido: faker.person.lastName(),
    telefono: faker.number.int(100000000000, 999999999999),
    identificacion: faker.number.int(400000000, 999999999),
    tipo_persona: 'V',
    domicilio: faker.location.streetAddress(),
  };
};

const getAccounts = () => {
  return {
    cuenta:
      getRandomBankCode(bank_codes) +
      faker.number
        .bigInt(100000000000000000000, 999999999999999999999)
        .toString()
        .slice(4),
  };
};

(async () => {
  let persons = [];
  for (let i = 0; i < 100; i++) persons.push(getPerson());
  persons = persons.map((person) => {
    person.identificacion = person.identificacion.toString().substring(0, 8);
    return person;
  });
  const customers = persons.map((person) => {
    return {
      cliente_id: person.identificacion,
      nombre_cliente: `${person.nombre} ${person.apellido}`,
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
    // Check if the person should have multiple accounts
    if (i % 3 == 0) {
      person.accounts = [accounts[ia], accounts[ia + 1], accounts[ia + 2]];
      ia += 3; // Increment ia by 3 to avoid account duplication
    } else {
      // Assign a single account to the person if not already assigned
      if (!person.accounts) {
        person.accounts = [accounts[ia]];
        ia++; // Increment ia to move to the next account
      }
    }
  }
  const accountsPersons = [];
  for (let person of persons) {
    person.accounts.map((account) => {
      accountsPersons.push({
        cliente_id: person.identificacion,
        account_id: account,
      });
    });
  }
  console.log(accountsPersons.length);
  let transfers = [];
  for (let i = 0; i < 2000; i++) {
    let cuentaClienteIndex = Math.floor(Math.random() * accountsPersons.length);
    let cuentaContraParteIndex = Math.floor(
      Math.random() * accountsPersons.length
    );

    // Asegurar que las cuentas no sean iguales
    while (cuentaContraParteIndex === cuentaClienteIndex) {
      cuentaContraParteIndex = Math.floor(
        Math.random() * accountsPersons.length
      );
    }
    transfers.push({
      Codigo_Cuenta_Cliente: accountsPersons[cuentaClienteIndex].account_id,
      Codigo_de_Cuenta_del_Cliente_Contra_parte:
        accountsPersons[cuentaContraParteIndex].account_id,
      Tipo_de_Transferencia_Electronica: 1,
      Fecha_de_Transferencia: faker.date.recent(),
      Referencia_de_Ia_Transferencia: faker.number.int(100000000, 99999999),
      Monto_de_la_Transferencia: faker.number.int(100, 100000),
    });
  }

  const alertas = [];
  for (let i = 0; i < 10; i++) {
    let person = persons[i];
    let malla = [];
    for (let i = 0; i < transfers.length; i++) {
      // Determine if the current person is the origin or destination of the transfer
      let isOrigin = transfers[i].Codigo_Cuenta_Cliente === person.accounts[0];
      let isDestination =
        transfers[i].Codigo_de_Cuenta_del_Cliente_Contra_parte ===
        person.accounts[0];

      if (isOrigin || isDestination) {
        // Determine the target account code based on whether the person is the origin or destination
        const targetAccountCode = isOrigin
          ? transfers[i].Codigo_de_Cuenta_del_Cliente_Contra_parte
          : transfers[i].Codigo_Cuenta_Cliente;
        const targetClient = persons.find((p) =>
          p.accounts.includes(targetAccountCode)
        );

        // Construct the CLIENTE_DESTINO or CLIENTE_ORIGEN string based on the context
        const CLIENTE = `${targetClient.nombre} ${targetClient.apellido}`;

        // Push the transaction data to malla with dynamic fields based on the context
        malla.push({
          REFERENCIA: transfers[i].Referencia_de_Ia_Transferencia,
          CANAL: 'Clavenet',
          TIPO_DE_OPERACION: 'Transferencia',
          FECHA_TX: transfers[i].Fecha_de_Transferencia,
          TIPO_DOCUMENTO_ORIGEN: 'V',
          DOCUMENTO_ORIGEN: isOrigin
            ? person.identificacion
            : targetClient.identificacion,
          CLIENTE_ORIGEN: isOrigin
            ? `${person.nombre} ${person.apellido}`
            : CLIENTE,
          CUENTA_ORIGEN: isOrigin ? person.accounts[0] : targetAccountCode,
          TIPO_DOCUMENTO: 'V',
          DOCUMENTO: isDestination
            ? person.identificacion
            : targetClient.identificacion,
          CLIENTE_DESTINO: isDestination
            ? `${person.nombre} ${person.apellido}`
            : CLIENTE,
          CUENTA_DESTINO: isDestination
            ? person.accounts[0]
            : targetAccountCode,
          MONTO_EJECUTADO: transfers[i].Monto_de_la_Transferencia,
          MONTO_RECIBIDO: faker.number.int(100, 100000),
          RETENIDO_DESTINO: faker.number.int(100, 100000),
          IP: faker.internet.ip(),
          IP_NO_FINANCIERA: faker.internet.ip(),
          ESPECIALISTA: people[Math.floor(Math.random() * people.length)].name,
          OBSERVACIONES: faker.lorem.sentence(),
        });
      }
    }
    XLSX.writeFile(
      createWorkbook(malla, `malla-${person.identificacion}`),
      `excels/malla-${person.identificacion}.xlsx`
    );
    const alerta = {
      'TIPO DE PERSONA': person.tipo_persona,
      IDENTIFICACION: person.identificacion,
      APELLIDO: person.apellido,
      NOMBRE: person.nombre,
      TELEFONO: person.telefono,
      CORREO: `${person.nombre.toLowerCase()}.${person.apellido.toLowerCase()}@gmail.com`,
      CELULAR: person.telefono,
      CLIENTE: `${person.nombre} ${person.apellido}`,
      DOMICILIO: person.domicilio,
      'TIPO REGISTRO': 'Registro Automatico',
      CANAL: 'Transferencia a terceros',
      INSTRUMENTO: 'Cuenta Corriente',
      DESCRIPCION: 'Transacciones sospechosas',
      MONTO: faker.number.int(100, 100000),
    };
    alertas.push(alerta);
  }

  const acciones = [];
  const actionsTypes = [
    'Inicio de sesion en el sistema',
    'Consulta de cuenta',
    'Transferencia',
    'Pago de Tarjetas',
    'Pago Debito',
    'Cambio de Correo',
    'Cambio de Contraseña',
    'Cambio de Telefono',
    'Cambio de Direccion',
    'Cerro sesion en el sistema',
    'Falló inicio de sesion',
    'Olvido contraseña',
  ];
  for (let alerta of alertas) {
    for (let i = 0; i < 30; i++) {
      let ip = faker.internet.ip();
      if (i % 2 == 0) ip = '10.30.30.11';
      const accion = {
        INSTRUMENTO: 'Cuenta Corriente',
        'TIPO PERSONA': alerta['TIPO DE PERSONA'],
        IDENTIFICACION: alerta.IDENTIFICACION,
        NOMBRE: alerta.NOMBRE,
        APELLIDO: alerta.APELLIDO,
        IP: ip,
        ACCION: faker.helpers.arrayElement(actionsTypes),
        FECHA: faker.date
          .between({
            from: '2024-01-01T00:00:00.000Z',
            to: '2024-06-01T00:00:00.000Z',
          })
          .toISOString(),
      };
      acciones.push(accion);
    }
  }

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
})();
