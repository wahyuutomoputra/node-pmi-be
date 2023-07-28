import { Knex } from "knex";
import { IAsset, IPaginateAsset, addAsset } from "../types";

export class AssetRepository {
  private knex: Knex;
  private table: string;

  constructor(knex: Knex) {
    this.knex = knex;
    this.table = "assets";
  }

  public async create(data: addAsset) {
    const insert = await this.knex(this.table).insert(data);
    console.log(insert.toString())
    return insert
  }

  public async get(): Promise<IAsset[]> {
    return await this.knex<IAsset>(this.table);
  }

  public async getPaginatedAssets(
    pageNumber: number,
    pageSize: number,
    searchTerm: string
  ): Promise<{
    assets: IPaginateAsset[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    try {
      // const totalRows: { total: number } = (await this.knex(this.table)
      //   .count("id_asset as total")
      //   .first()) as {
      //   total: 0;
      // };
      const countQuery = await this.knex("assets as a")
        .join("divisions as d", "a.id_divisi", "d.id_divisi")
        .join("types as t", "a.id_jenis", "t.id_jenis")
        .where("a.nama_asset", "like", `%${searchTerm}%`)
        .count("a.id_asset as total");

      const total = countQuery[0].total as number;
      // const { total } = totalRows;
      const totalPages = Math.ceil(total / pageSize);

      if (pageNumber > totalPages) {
        pageNumber = totalPages;
      }

      const offset = (pageNumber - 1) * pageSize;

      // Fetch paginated assets
      const assets: IPaginateAsset[] = await this.knex("assets as a")
        .join("divisions as d", "a.id_divisi", "d.id_divisi")
        .join("types as t", "a.id_jenis", "t.id_jenis")
        .select("a.*", "d.nama_divisi", "t.nama_jenis")
        .where("a.nama_asset", "like", `%${searchTerm}%`)
        .limit(pageSize)
        .offset(offset);

      return {
        assets,
        total,
        totalPages,
        currentPage: pageNumber,
      };
    } catch (error) {
      throw error;
    }
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
