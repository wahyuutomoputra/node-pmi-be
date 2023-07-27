import { Knex } from "knex";
import { IEmployee, addEmployee } from "../types";

export class EmployeeRepository {
  private knex: Knex;
  private table: string;

  constructor(knex: Knex) {
    this.knex = knex;
    this.table = "employees";
  }

  public async create(data: addEmployee) {
    return await this.knex(this.table).insert(data);
  }

  public async get(): Promise<IEmployee[]> {
    return await this.knex<IEmployee>(this.table);
  }

  public async getByEmail(email: string): Promise<IEmployee> {
    return await this.knex
      .select()
      .from(this.table)
      .where("email", "=", email)
      .first();
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
