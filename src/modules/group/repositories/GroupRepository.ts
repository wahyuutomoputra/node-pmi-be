import { Knex } from "knex";
import { IGroup, addGroup } from "../types";

export class GroupRepository {
  private knex: Knex;
  private table: string;

  constructor(knex: Knex) {
    this.knex = knex;
    this.table = "groups";
  }

  public async create(data: addGroup) {
    return await this.knex(this.table).insert(data);
  }

  public async get(): Promise<IGroup[]> {
    return await this.knex<IGroup>(this.table);
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
