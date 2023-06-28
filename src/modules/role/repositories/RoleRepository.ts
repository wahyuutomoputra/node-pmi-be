import { Knex } from "knex";
import { IRole, addRole } from "../types";

export class RoleRepository {
  private knex: Knex;
  private table: string;

  constructor(knex: Knex) {
    this.knex = knex;
    this.table = "roles";
  }

  public async create(data: addRole) {
    return await this.knex(this.table).insert(data);
  }

  public async get(): Promise<IRole[]> {
    return await this.knex<IRole>(this.table);
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
