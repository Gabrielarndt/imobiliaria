module.exports = {
    development: {
      username: 'seu_usuario',
      password: 'sua_senha',
      database: 'nome_do_banco_de_dados',
      host: 'localhost',
      dialect: 'postgres',
    },
    production: {
      use_env_variable: 'DATABASE_URL',
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  };
  