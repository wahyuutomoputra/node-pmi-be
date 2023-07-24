// // src/database/Database.ts

// import knex, { Knex } from "knex";

// export class Database {
//   private knex: Knex;

//   constructor() {
//     this.knex = knex({
//       client: "mysql2",
//       connection: {
//         host: "localhost",
//         user: "username",
//         password: "password",
//         database: "database_name",
//       },
//     });
//   }

//   public getKnexInstance() {
//     return this.knex;
//   }
// }

// src/database/Database.ts

import { Knex, knex } from "knex";

class Database {
  private static instance: Database;
  private knexInstance: Knex;

  private constructor() {
    // Inisialisasi dan konfigurasi instance Knex
    this.knexInstance = knex({
      client: "mysql2",
      connection: {
        host: "localhost",
        user: "root",
        password: "root",
        database: "skripsi",
      },
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getKnexInstance(): Knex {
    return this.knexInstance;
  }
}

export default Database;
