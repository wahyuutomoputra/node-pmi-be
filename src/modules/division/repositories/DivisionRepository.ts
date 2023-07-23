import { Knex } from "knex";
import { IDivision, addDivision } from "../types";

export class DivisionRepository {
  private knex: Knex;
  private table: string;

  constructor(knex: Knex) {
    this.knex = knex;
    this.table = "divisions";
  }

  public async create(data: addDivision) {
    return await this.knex(this.table).insert(data);
  }

  public async get(): Promise<IDivision[]> {
    return await this.knex<IDivision>(this.table);
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
