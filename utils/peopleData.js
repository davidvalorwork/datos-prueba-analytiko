const { faker } = require('@faker-js/faker');
const people = [
  {
    name: 'Persona Prueba', documento: 'V-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Enrique Gonzales', documento: 'V-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Ramon Cabello', documento: 'V-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Carlos Rondon', documento: 'V-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Javier Moros', documento: 'V-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Samuel Henriquez', documento: 'V-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Andres Baute', documento: 'V-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Ramses Silva', documento: 'V-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Anntonnio Di Caprio', documento: 'E-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Keanu Reves', documento: 'E-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Inversiones TecnoSpark', documento: 'J-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Repuestos Multimarca Tech', documento: 'J-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Cristal Clear Water', documento: 'J-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
  {
    name: 'Gruas La Gonzalera', documento: 'J-'+faker.number.int(10000000, 99999990),
    telefono: faker.number.int(100000000000, 999999999999),
    domicilio: faker.location.streetAddress(),
  },
];

module.exports = { people };
