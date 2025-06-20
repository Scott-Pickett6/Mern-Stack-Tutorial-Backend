const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "mern_stack_tutorial",
    host: "localhost",
    port: 5432,
    dialect: 'postgres',
  },
};