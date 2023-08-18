import { Knex, knex } from "knex";

class Database {
  private static instance: Database;
  private knexInstance: Knex;

  private constructor() {
    // Inisialisasi dan konfigurasi instance Knex
    this.knexInstance = knex({
      client: process.env.DB_CLIENT,
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
    });

    // Test database connection
    this.knexInstance.raw("SELECT 1")
      .then(() => {
        console.log("Database connection established successfully.");
      })
      .catch((error) => {
        console.error("Error connecting to the database:", error.message);
        process.exit(1); // Terminate the application with an error code
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
