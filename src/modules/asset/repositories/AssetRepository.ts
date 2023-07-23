import { Knex } from "knex";
import { IAsset, addAsset } from "../types";

export class AssetRepository {
  private knex: Knex;
  private table: string;

  constructor(knex: Knex) {
    this.knex = knex;
    this.table = "assets";
  }

  public async create(data: addAsset) {
    return await this.knex(this.table).insert(data);
  }

  public async get(): Promise<IAsset[]> {
    return await this.knex<IAsset>(this.table);
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
