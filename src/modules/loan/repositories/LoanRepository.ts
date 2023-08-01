import { Knex } from "knex";
import {
  IDetailLoan,
  ILoan,
  ILoanUser,
  ISelectAsset,
  ISelectLoan,
  ISelectLoanByDivisi,
  addLoan,
  createLoan,
} from "../types";
import { IDivision } from "../../division/types";

export class LoanRepository {
  private knex: Knex;
  private table: string;

  constructor(knex: Knex) {
    this.knex = knex;
    this.table = "loans";
  }

  public async create(data: addLoan): Promise<number> {
    const id: number = await this.knex(this.table)
      .insert(data)
      .returning("id_peminjaman");
    return id;
  }

  public async get(): Promise<ILoan[]> {
    return await this.knex<ILoan>(this.table);
  }

  public async add_loan(param: createLoan) {
    let unavailableItems = [];

    try {
      await this.knex.transaction(async (trx) => {
        // Pemeriksaan status dan filter barang dengan status 'tersedia'
        const availableItems: ISelectAsset[] = await this.knex("assets as a")
          .join("divisions as d", "a.id_divisi", "=", "d.id_divisi")
          .select("a.id_asset", "a.nama_asset", "nama_divisi")
          .whereIn("id_asset", param.listOfAssetss)
          .andWhere("status", "tersedia")
          .transacting(trx);

        const availableItemIds = availableItems.map((item) => item.id_asset);

        // Cek jika ada barang yang tidak tersedia
        unavailableItems = param.listOfAssetss.filter(
          (item) => !availableItemIds.includes(item)
        );

        if (unavailableItems.length > 0) {
          // Jika ada barang yang tidak tersedia, lemparkan error dengan daftar barang yang tidak tersedia

          const unavailableList = await this.knex<{
            nama_asset: string;
          }>("assets")
            .select("nama_asset")
            .whereIn("id_asset", unavailableItems)
            .transacting(trx);

          let nameAsset = "";
          unavailableList.forEach((x) => {
            nameAsset += ` ${x.nama_asset}, `;
          });

          throw new Error(`Beberapa barang tidak tersedia: ${nameAsset}`);
        }

        await this.knex("assets")
          .whereIn("id_asset", param.listOfAssetss)
          .update({ status: "booked" })
          .transacting(trx);

        const loanId: number = await this.knex(this.table)
          .insert({
            tgl_pinjam: param.tgl_pinjam,
            tgl_deadline: param.tgl_deadline,
            id_peminjam: param.id_peminjam,
            status: "diproses",
            id_pegawai: param.id_pegawai,
            keterangan: param.keterangan,
          })
          .transacting(trx)
          .returning("id_peminjaman");

        const loanItemsToInsert = availableItems.map((item) => ({
          id_peminjaman: loanId,
          id_asset: item.id_asset,
          is_approved: item.nama_divisi.toUpperCase() == "UMUM" ? 1 : 0,
        }));

        await this.knex("loan_details")
          .insert(loanItemsToInsert)
          .transacting(trx);
      });
    } catch (error) {
      throw error;
      //   console.log(error);
    }
  }

  public async get_loan_by_divisi(param: {
    id_divisi: number;
    page: number;
    pageSize: number;
    status?: string;
  }): Promise<{
    loan: ISelectLoanByDivisi[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    const { page, pageSize } = param;
    const offset = (page - 1) * pageSize;

    param.status = param.status ?? "diproses";

    const result: ISelectLoanByDivisi[] = await this.knex("loans as l")
      .select(
        "l.id_peminjaman",
        "l.tgl_pinjam",
        "l.tgl_deadline",
        "l.status",
        "d.id_divisi",
        "b.nama_peminjam",
        "l.keterangan"
      )
      .join("loan_details as ld", "l.id_peminjaman", "=", "ld.id_peminjaman")
      .join("assets as a", "ld.id_asset", "=", "a.id_asset")
      .join("divisions as d", "a.id_divisi", "=", "d.id_divisi")
      .join("borrowers as b", "l.id_peminjam", "=", "b.id_peminjam")
      .where("d.id_divisi", param.id_divisi)
      .andWhere("l.status", param.status)
      .groupBy(
        "l.id_peminjaman",
        "l.tgl_pinjam",
        "l.tgl_deadline",
        "l.status",
        "d.id_divisi",
        "b.nama_peminjam",
        "l.keterangan"
      )
      .offset(offset)
      .limit(pageSize);

    const totalRowsQuery = await this.knex("loans as l")
      .join("loan_details as ld", "l.id_peminjaman", "=", "ld.id_peminjaman")
      .join("assets as a", "ld.id_asset", "=", "a.id_asset")
      .join("divisions as d", "a.id_divisi", "=", "d.id_divisi")
      .join("borrowers as b", "l.id_peminjam", "=", "b.id_peminjam")
      .where("d.id_divisi", 1)
      .andWhere("l.status", param.status)
      .select(this.knex.raw("COUNT(DISTINCT l.id_peminjaman) as count"));

    const totalRows = totalRowsQuery ? (totalRowsQuery[0].count as number) : 0;
    const totalPages = Math.ceil(totalRows / pageSize);

    return {
      loan: result,
      total: totalRows,
      totalPages: totalPages,
      currentPage: param.page,
    };
  }

  public async get_divisi(id_divisi: number): Promise<IDivision> {
    const data: IDivision = await this.knex("divisions")
      .where("id_divisi", id_divisi)
      .first();
    return data;
  }

  public async get_loan_all(param: {
    page: number;
    pageSize: number;
    status?: string;
  }): Promise<{
    loan: ISelectLoan[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    const { page, pageSize } = param;
    const offset = (page - 1) * pageSize;

    param.status = param.status ?? "diproses";

    const totalRowsQuery = await this.knex("loans as l")
      .count("l.id_peminjaman as totalRows")
      .where("status", "diproses");

    const totalRows = totalRowsQuery[0].totalRows as number;
    const totalPages = Math.ceil(totalRows / param.pageSize);

    const result: ISelectLoan[] = await this.knex("loans as l")
      .select(
        "l.id_peminjaman",
        "l.tgl_pinjam",
        "l.tgl_deadline",
        "l.status",
        "l.keterangan"
      )
      .where("status", param.status)
      .offset(offset)
      .limit(pageSize);

    return {
      loan: result,
      total: totalRows,
      totalPages: totalPages,
      currentPage: param.page,
    };
  }

  public async get_loan_by_id(id_peminjaman: number): Promise<ILoanUser> {
    const data: ILoanUser = await this.knex("loans as l")
      .select("l.*", "b.nama_peminjam", "i.nama_instansi")
      .join("borrowers as b", "l.id_peminjam", "=", "b.id_peminjam")
      .join("instances as i", "b.id_instansi", "=", "i.id_instansi")
      .where("l.id_peminjaman", id_peminjaman)
      .first();
    return data;
  }

  public async get_loan_detail(id_peminjaman: number): Promise<IDetailLoan[]> {
    const result: IDetailLoan[] = await this.knex("loan_details as ld")
      .select("ld.*", "a.nama_asset")
      .join("assets as a", "ld.id_asset", "=", "a.id_asset")
      .where("ld.id_peminjaman", id_peminjaman);
    return result;
  }
}
