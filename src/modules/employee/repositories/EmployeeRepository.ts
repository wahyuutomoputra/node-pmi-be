import { Knex } from "knex";
import { IEmployee, addEmployee, updateEmployee } from "../types";

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

  public async getPaginatedEmployee(param: {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
    status?: string;
  }): Promise<{
    employee: IEmployee[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    try {
      param.status = param.status ?? "";

      const countQuery = this.knex("employees as e")
        .join("divisions as d", "e.id_divisi", "d.id_divisi")
        .where("e.nama", "like", `%${param.searchTerm}%`)
        .count("e.id_pegawai as total");

      if (param.status !== "") {
        countQuery.andWhere("d.nama_divisi", param.status);
      }

      const countResult = await countQuery;

      let total = countResult[0].total as number;
      if (total == 0) total = 1;

      const totalPages = Math.ceil(total / param.pageSize);

      if (param.pageNumber > totalPages) {
        param.pageNumber = totalPages;
      }

      const offset = (param.pageNumber - 1) * param.pageSize;

      // Fetch paginated assets
      const empQuery = this.knex("employees as e")
        .select("e.*", "d.nama_divisi")
        .join("divisions as d", "e.id_divisi", "d.id_divisi")
        .where("e.nama", "like", `%${param.searchTerm}%`)
        .limit(param.pageSize)
        .offset(offset);

      if (param.status !== "") {
        empQuery.andWhere("d.nama_divisi", param.status);
      }

      let employee: IEmployee[] = await empQuery;

      employee = employee.map((x) => {
        const { password, ...rest } = x;
        return rest;
      });

      return {
        employee,
        total,
        totalPages,
        currentPage: param.pageNumber,
      };
    } catch (error) {
      throw error;
    }
  }

  public async update(data: updateEmployee, id_pegawai: number) {
    return await this.knex(this.table)
      .update(data)
      .where("id_pegawai", id_pegawai);
  }

  public async getById(id: number): Promise<IEmployee> {
    return await this.knex("employees as e")
      .select("e.*", "d.nama_divisi")
      .join("divisions as d", "e.id_divisi", "d.id_divisi")
      .where("id_pegawai", "=", id)
      .first();
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
