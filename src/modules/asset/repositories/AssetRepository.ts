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
    console.log(insert.toString());
    return insert;
  }

  public async get(): Promise<IAsset[]> {
    return await this.knex<IAsset>(this.table);
  }

  public async getPaginatedAssets(param: {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
    status?: string;
  }): Promise<{
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
      param.status = param.status ?? "";

      const countQuery = this.knex("assets as a")
        .join("divisions as d", "a.id_divisi", "d.id_divisi")
        .join("types as t", "a.id_jenis", "t.id_jenis")
        .where("a.nama_asset", "like", `%${param.searchTerm}%`)
        .count("a.id_asset as total");

      if (param.status !== "") {
        countQuery.andWhere("a.status", param.status);
      }

      // console.log(countQuery.toSQL().toNative());
      const countResult = await countQuery;

      let total = countResult[0].total as number;
      if (total == 0) total = 1;
      // const { total } = totalRows;
      const totalPages = Math.ceil(total / param.pageSize);

      if (param.pageNumber > totalPages) {
        param.pageNumber = totalPages;
      }

      const offset = (param.pageNumber - 1) * param.pageSize;

      // Fetch paginated assets
      const assetsQuery = this.knex("assets as a")
        .join("divisions as d", "a.id_divisi", "d.id_divisi")
        .join("types as t", "a.id_jenis", "t.id_jenis")
        .select("a.*", "d.nama_divisi", "t.nama_jenis")
        .where("a.nama_asset", "like", `%${param.searchTerm}%`)
        .limit(param.pageSize)
        .offset(offset);

      if (param.status !== "") {
        assetsQuery.andWhere("a.status", param.status);
      }

      const assets: IPaginateAsset[] = await assetsQuery;

      return {
        assets,
        total,
        totalPages,
        currentPage: param.pageNumber,
      };
    } catch (error) {
      throw error;
    }
  }

  public async countByStatus(status: string): Promise<number> {
    try {
      const data = await this.knex("assets")
        .count("id_asset as total")
        .where("status", status);

      return (data[0].total as number) ?? 0;
    } catch (error) {
      throw error;
    }
  }

  public async totalHarga(): Promise<number> {
    try {
      const data = await this.knex("assets").sum("harga_perolehan as total");
      return (data[0].total as number) ?? 0;
    } catch (error) {
      throw error;
    }
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
