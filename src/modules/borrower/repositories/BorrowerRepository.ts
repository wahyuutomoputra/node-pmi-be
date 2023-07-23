import { Knex } from "knex";
import { IBorrower, addBorrower } from "../types";

export class BorrowerRepository {
  private knex: Knex;
  private table: string;

  constructor(knex: Knex) {
    this.knex = knex;
    this.table = "borrowers";
  }

  public async create(data: addBorrower) {
    return await this.knex(this.table).insert(data);
  }

  public async get(): Promise<IBorrower[]> {
    return await this.knex<IBorrower>(this.table);
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
