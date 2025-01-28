const { faker } = require('@faker-js/faker');
const { format } = require('date-fns');

const generateTransfers = (accountsPersons) => {
  let transfers = [];
  for (let i = 0; i < 2000; i++) {
    let cuentaClienteIndex = Math.floor(Math.random() * accountsPersons.length);
    let cuentaContraParteIndex = Math.floor(Math.random() * accountsPersons.length);

    while (cuentaContraParteIndex === cuentaClienteIndex) {
      cuentaContraParteIndex = Math.floor(Math.random() * accountsPersons.length);
    }
    transfers.push({
      Codigo_Cuenta_Cliente: accountsPersons[cuentaClienteIndex].account_id,
      Codigo_de_Cuenta_del_Cliente_Contra_parte: accountsPersons[cuentaContraParteIndex].account_id,
      Tipo_de_Transferencia_Electronica: 1,
      Fecha_de_Transferencia: format(faker.date.recent(), 'dd/MM/yyyy hh:mm a'),
      Referencia_de_Ia_Transferencia: faker.number.int(100000000, 99999999),
      Monto_de_la_Transferencia: faker.number.int(100, 100000),
    });
  }
  return transfers;
};

const generateAlertas = (persons, transfers) => {
  const alertas = [];
  const mallaData = [];
  const canalesOperaciones = {
    'Web': 'Pagos a terceros',
    'Pago Movil': 'App',
    'Tarjeta': 'Consumo'
  };
  const canales = Object.keys(canalesOperaciones);
  for (let i = 0; i < 10; i++) {
    let person = persons[i];
    let malla = [];
    for (let i = 0; i < transfers.length; i++) {
      let isOrigin = transfers[i].Codigo_Cuenta_Cliente === person.accounts[0];
      let isDestination = transfers[i].Codigo_de_Cuenta_del_Cliente_Contra_parte === person.accounts[0];

      if (isOrigin || isDestination) {
        const targetAccountCode = isOrigin ? transfers[i].Codigo_de_Cuenta_del_Cliente_Contra_parte : transfers[i].Codigo_Cuenta_Cliente;
        const targetClient = persons.find((p) => p.accounts.includes(targetAccountCode));
        const CLIENTE = `${targetClient.name}`;
        const canal = faker.helpers.arrayElement(canales);

        malla.push({
          REFERENCIA: transfers[i].Referencia_de_Ia_Transferencia,
          IP: faker.internet.ip(),
          IP_NO_FINANCIERA: faker.internet.ip(),
          OBSERVACIONES: faker.lorem.sentence(),
          CANAL: canal,
          TIPO_DE_OPERACION: canalesOperaciones[canal],
          FECHA_TX: transfers[i].Fecha_de_Transferencia,
          TIPO_DOCUMENTO_ORIGEN: isOrigin ? person.documento.toString().substring(0, 1) : targetClient.documento.toString().substring(0, 1),
          DOCUMENTO_ORIGEN: isOrigin ? person.documento.toString().substring(2, 10) : targetClient.documento.toString().substring(2, 10),
          CLIENTE_ORIGEN: isOrigin ? person.name : CLIENTE,
          CUENTA_ORIGEN: isOrigin ? person.accounts[0] : targetAccountCode,
          TIPO_DOCUMENTO: isDestination ? person.documento.toString().substring(0, 1) : targetClient.documento.toString().substring(0, 1),
          DOCUMENTO: isDestination ? person.documento.toString().substring(2, 10) : targetClient.documento.toString().substring(2, 10),
          CLIENTE_DESTINO: isDestination ? person.name : CLIENTE,
          CUENTA_DESTINO: isDestination ? person.accounts[0] : targetAccountCode,
          MONTO: transfers[i].Monto_de_la_Transferencia,
        });
      }
    }
    mallaData.push({ person, malla });
    alertas.push({
      'TIPO DE PERSONA': person.documento.toString().substring(0, 1),
      IDENTIFICACION: person.documento.toString().substring(2, 10),
      APELLIDO: person.name.split(' ')[1],
      NOMBRE: person.name.split(' ')[0],
      TELEFONO: `+58${person.telefono}`,
      CORREO: `${person.name.toLowerCase().toString().replace(' ', '')}@gmail.com`,
      CELULAR: `+58${person.telefono}`,
      CLIENTE: `${person.name}`,
      DOMICILIO: person.domicilio,
      'TIPO REGISTRO': 'Registro Automático',
      CANAL: 'Transferencia a terceros',
      INSTRUMENTO: 'Cuenta Corriente',
      DESCRIPCION: 'Transacciones sospechosas',
      MONTO: faker.number.int(100, 100000),
    });
  }
  return { malla: mallaData, alertas };
};

const generateAcciones = (alertas) => {
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
        FECHA: format(faker.date.between({
          from: new Date('2024-01-01T00:00:00.000Z'),
          to: new Date('2024-06-01T00:00:00.000Z'),
        }), 'dd/MM/yyyy hh:mm a'),
      };
      acciones.push(accion);
    }
  }
  return acciones;
};

module.exports = { generateTransfers, generateAlertas, generateAcciones };
