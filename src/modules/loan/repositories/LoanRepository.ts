import { Knex } from "knex";
import {
  IDetailLoan,
  ILoan,
  ILoanUser,
  ISelectAsset,
  ISelectLoan,
  ISelectLoanByDivisi,
  Ipengembalian,
  addLoan,
  createLoan,
} from "../types";
import { IDivision } from "../../division/types";
import { format } from "date-fns";

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
          // is_approved: item.nama_divisi.toUpperCase() == "UMUM" ? 1 : 0,
          is_approved: 0,
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
    page?: number;
    pageSize?: number;
    status?: string | string[];
    year?: number;
  }): Promise<{
    loan: ISelectLoan[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    param.status = param.status ?? "";

    const count = this.knex("loans as l").count("l.id_peminjaman as totalRows");
    const resultQuery = this.knex("loans as l")
      .select(
        "l.id_peminjaman",
        "l.tgl_pinjam",
        "l.tgl_deadline",
        "l.status",
        "l.keterangan",
        "b.nama_peminjam"
      )
      .join("borrowers as b", "b.id_peminjam", "l.id_peminjam");

    if (param.page && param.pageSize) {
      const { page, pageSize } = param;
      const offset = (page - 1) * pageSize;
      resultQuery.offset(offset).limit(pageSize);
    }

    if (param.year) {
      count.whereRaw("YEAR(l.tgl_pinjam) = ?", [param.year]);
      resultQuery.whereRaw("YEAR(l.tgl_pinjam) = ?", [param.year]);
    }

    if (typeof param.status == "string" && param.status != "") {
      count.where("status", param.status);
      resultQuery.where("status", param.status);
    }

    if (Array.isArray(param.status)) {
      count.whereIn("status", param.status);
      resultQuery.whereIn("status", param.status);
    }

    const totalRowsQuery = await count;

    let totalRows = 0;
    let totalPages = 0;
    if (param.page && param.pageSize) {
      totalRows = totalRowsQuery[0].totalRows as number;
      totalPages = Math.ceil(totalRows / param.pageSize);
    }

    let result: ISelectLoan[] = await resultQuery;

    result = result.map((x) => {
      return {
        ...x,
        tgl_pinjam: format(new Date(x.tgl_pinjam), "yyyy-MM-dd"),
        tgl_deadline: format(new Date(x.tgl_deadline), "yyyy-MM-dd"),
      };
    });

    return {
      loan: result,
      total: totalRows,
      totalPages: totalPages,
      currentPage: param.page ?? 0,
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

  public async get_loan_detail(
    id_peminjaman: number,
    id_divisi?: number
  ): Promise<IDetailLoan[]> {
    const query = this.knex("loan_details as ld")
      .select("ld.*", "a.nama_asset", "a.asset_code", "d.nama_divisi")
      .join("assets as a", "ld.id_asset", "=", "a.id_asset")
      .join("divisions as d", "d.id_divisi", "a.id_divisi")
      .where("ld.id_peminjaman", id_peminjaman);

    if (id_divisi != undefined) {
      query.andWhere("a.id_divisi", id_divisi);
    }

    const result: IDetailLoan[] = await query;
    return result;
  }

  public async approval_divisi(
    list_approve: number[],
    id_peminjaman: number,
    id_divisi: number
  ) {
    const currentDate = new Date();

    try {
      return await this.knex.transaction(async (trx) => {
        // reset semua approval barang divisi yang dipinjam
        await trx("loan_details as ld")
          .join("assets as a", "ld.id_asset", "a.id_asset")
          .join("divisions as d", "d.id_divisi", "a.id_divisi")
          .where("d.id_divisi", id_divisi)
          .andWhere("id_peminjaman", id_peminjaman)
          .update({
            is_approved: 0,
            tgl_approve: null,
          });

        if (list_approve.length != 0) {
          // assign ulang barang divisi
          await trx("loan_details")
            .whereIn("id_asset", list_approve)
            .andWhere("id_peminjaman", id_peminjaman)
            .update({
              is_approved: 1,
              tgl_approve: format(currentDate, "yyyy-MM-dd"),
            });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  public async approve(id_peminjaman: number) {
    try {
      await this.knex.transaction(async (trx) => {
        await trx("loans").where("id_peminjaman", id_peminjaman).update({
          status: "dipinjam",
        });

        const detailLoan: IDetailLoan[] = await trx("loan_details as ld")
          .select("ld.*", "a.nama_asset", "a.asset_code")
          .join("assets as a", "ld.id_asset", "=", "a.id_asset")
          .where("ld.id_peminjaman", id_peminjaman);

        const approvedAssetIds = detailLoan
          .filter((loanDetail) => loanDetail.is_approved == 1)
          .map((loanDetail) => loanDetail.id_asset);

        const notApprovedAssetIds = detailLoan
          .filter((loanDetail) => loanDetail.is_approved == 0)
          .map((loanDetail) => loanDetail.id_asset);

        if (approvedAssetIds.length != 0) {
          await trx("assets").whereIn("id_asset", approvedAssetIds).update({
            status: "dipinjam",
          });
        }

        if (notApprovedAssetIds.length != 0) {
          await trx("assets").whereIn("id_asset", notApprovedAssetIds).update({
            status: "tersedia",
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  public async reject(id_peminjaman: number) {
    try {
      await this.knex.transaction(async (trx) => {
        await trx("loans").where("id_peminjaman", id_peminjaman).update({
          status: "ditolak",
        });

        const detailLoan: IDetailLoan[] = await trx("loan_details as ld")
          .select("ld.*", "a.nama_asset", "a.asset_code")
          .join("assets as a", "ld.id_asset", "=", "a.id_asset")
          .where("ld.id_peminjaman", id_peminjaman);

        const idBarang = detailLoan.map((x) => x.id_asset);

        if (idBarang.length != 0) {
          await trx("assets").whereIn("id_asset", idBarang).update({
            status: "tersedia",
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  public async pengembalian(id_peminjaman: number) {
    try {
      await this.knex.transaction(async (trx) => {
        await trx("loans")
          .where("id_peminjaman", id_peminjaman)
          .update({
            status: "dikembalikan",
            tgl_pengembalian: format(new Date(), "yyyy-MM-dd"),
          });

        const detailLoan: IDetailLoan[] = await trx("loan_details as ld")
          .select("ld.*", "a.nama_asset", "a.asset_code")
          .join("assets as a", "ld.id_asset", "=", "a.id_asset")
          .where("ld.id_peminjaman", id_peminjaman)
          .andWhere("ld.is_approved", 1);

        const idBarang = detailLoan.map((x) => x.id_asset);

        if (idBarang.length != 0) {
          await trx("assets").whereIn("id_asset", idBarang).update({
            status: "tersedia",
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  public async pengembalian_with_status(
    id_peminjaman: number,
    listAsset: Ipengembalian[]
  ) {
    try {
      return await this.knex.transaction(async (trx) => {
        // update loans
        await trx("loans")
          .where("id_peminjaman", id_peminjaman)
          .update({
            status: "dikembalikan",
            tgl_pengembalian: format(new Date(), "yyyy-MM-dd"),
          });

        for (const asset of listAsset) {
          let status = "tersedia";
          if (asset.status != "baik") {
            status = asset.status;
            await trx("loan_details")
              .where("id_detail_peminjaman", asset.id_detail_peminjaman)
              .update({
                status: status,
              });
          }

          await trx("assets").where("id_asset", asset.id_asset).update({
            status: status,
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  public async count_history(
    id_peminjam: number,
    status: string
  ): Promise<number> {
    try {
      const result = await this.knex("loans as l")
        .count("ld.id_detail_peminjaman as total")
        .join("loan_details as ld", "l.id_peminjaman", "=", "ld.id_peminjaman")
        .where("l.id_peminjam", id_peminjam)
        .andWhere("ld.status", status);

      const count = result[0].total as number;
      return count ?? 0;
    } catch (error) {
      throw error;
    }
  }
}
