import { Knex } from "knex";
import { IInstance, addInstance } from "../types";

export class InstanceRepository {
  private knex: Knex;
  private table: string;

  constructor(knex: Knex) {
    this.knex = knex;
    this.table = "instances";
  }

  public async create(data: addInstance) {
    return await this.knex(this.table).insert(data);
  }

  public async get(): Promise<IInstance[]> {
    return await this.knex<IInstance>(this.table);
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
