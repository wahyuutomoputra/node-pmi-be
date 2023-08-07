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
    return await this.knex("employees as e")
      .select("e.*", this.knex.raw("LOWER(d.nama_divisi) as nama_divisi"))
      .join("divisions as d", "e.id_divisi", "d.id_divisi")
      .where("email", "=", email)
      .first();
  }

  public async isAvailableEmail(email: string): Promise<boolean> {
    const result = await this.knex("employees as e")
      .select("id_pegawai")
      .where("email", "=", email)
      .first();

    return !result;
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
