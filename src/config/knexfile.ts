// knexfile.ts

import { Knex } from "knex";

const config: Knex.Config = {
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "your_database_user",
    password: "your_database_password",
    database: "your_database_name",
  },
};

export default config;
