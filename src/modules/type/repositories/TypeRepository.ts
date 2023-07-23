import { Knex } from "knex";
import { IType, addType } from "../types";

export class TypeRepository {
  private knex: Knex;
  private table: string;

  constructor(knex: Knex) {
    this.knex = knex;
    this.table = "types";
  }

  public async create(data: addType) {
    return await this.knex(this.table).insert(data);
  }

  public async get(): Promise<IType[]> {
    return await this.knex<IType>(this.table);
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
