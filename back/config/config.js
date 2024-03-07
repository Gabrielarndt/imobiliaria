// module.exports = {
//     development: {
//       username: 'postgres',
//       password: 'admin',
//       database: 'imobiliaria',
//       host: 'localhost',
//       dialect: 'postgres',
//     },
//     production: {
//       use_env_variable: 'DATABASE_URL',
//       dialect: 'postgres',
//       dialectOptions: {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false,
//         },
//       },
//     },
//   };
//   // testConfig.js
module.exports = {
  database: 'imobiliaria',
  username: 'postgres',
  password: 'admin',
  host: 'localhost',
  dialect: 'postgres',
};
