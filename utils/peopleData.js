const { faker } = require('@faker-js/faker');
const people = [
  {
    name: 'Persona Prueba', documento: 'V-27175476',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Enrique Gonzales', documento: 'V-23444222',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Ramon Cabello', documento: 'V-33444225',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Carlos Rondon', documento: 'V-13444226',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Javier Moros', documento: 'V-23444227',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Samuel Henriquez', documento: 'V-3444228',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Andres Baute', documento: 'V-4444229',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Ramses Silva', documento: 'V-5444220',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Anntonnio Di Caprio', documento: 'E-2444220',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Keanu Reves', documento: 'E-3444220',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Inversiones TecnoSpark', documento: 'J-22444220',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Repuestos Multimarca Tech', documento: 'J-33444220',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Cristal Clear Water', documento: 'J-66444220',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Gruas La Gonzalera', documento: 'J-89444220',
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
];

module.exports = { people };
