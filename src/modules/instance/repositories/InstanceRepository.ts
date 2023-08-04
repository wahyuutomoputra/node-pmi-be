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

  public async getPaginatedInstance(param: {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
  }): Promise<{
    instance: IInstance[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    try {
      const countQuery = this.knex("instances as b")
        .where("b.nama_instansi", "like", `%${param.searchTerm}%`)
        .count("b.id_instansi as total");

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

      // Fetch paginated
      const dataQuery = this.knex("instances as b")
        .select("b.*")
        .where("b.nama_instansi", "like", `%${param.searchTerm}%`)
        .limit(param.pageSize)
        .offset(offset);

      const data: IInstance[] = await dataQuery;

      return {
        instance: data,
        total,
        totalPages,
        currentPage: param.pageNumber,
      };
    } catch (error) {
      throw error;
    }
  }

  // Metode lainnya untuk berinteraksi dengan entitas pengguna dalam database
}
