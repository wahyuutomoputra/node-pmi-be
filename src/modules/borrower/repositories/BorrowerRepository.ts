import { Knex } from "knex";
import { IBorrower, IPaginateBorrower, addBorrower } from "../types";

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

  public async getPaginatedBorrower(param: {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
  }): Promise<{
    borrower: IPaginateBorrower[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    try {
      const countQuery = this.knex("borrowers as b")
        .join("instances as i", "b.id_instansi", "i.id_instansi")
        .where("b.nama_peminjam", "like", `%${param.searchTerm}%`)
        .count("b.id_peminjam as total");

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
      const dataQuery = this.knex("borrowers as b")
        .join("instances as i", "b.id_instansi", "i.id_instansi")
        .select("b.*", "i.nama_instansi")
        .where("b.nama_peminjam", "like", `%${param.searchTerm}%`)
        .limit(param.pageSize)
        .offset(offset);

      const data: IPaginateBorrower[] = await dataQuery;

      return {
        borrower: data,
        total,
        totalPages,
        currentPage: param.pageNumber,
      };
    } catch (error) {
      throw error;
    }
  }
}
