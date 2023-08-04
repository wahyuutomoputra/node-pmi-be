import { LoanRepository } from "../repositories/LoanRepository";
import { LoanDetailRepository } from "../../loan_detail/repositories/LoanDetailRepository";
import { ILoan, addLoan, createLoan } from "../types";
import { AssetRepository } from "@modules/asset/repositories/AssetRepository";

export class LoanService {
  private loanRepository: LoanRepository;
  private loanDetailRepository: LoanDetailRepository;

  constructor(
    loanRepository: LoanRepository,
    loanDetailRepository: LoanDetailRepository
  ) {
    this.loanRepository = loanRepository;
    this.loanDetailRepository = loanDetailRepository;
  }

  public async create(data: addLoan, idAsset: number[]) {
    // Validasi dan logika bisnis terkait pembuatan pengguna
    let id = await this.loanRepository.create(data);

    return await this.loanDetailRepository.insertBatch(id, idAsset);
  }

  public async get(): Promise<ILoan[]> {
    return await this.loanRepository.get();
  }

  public async add_loan(data: createLoan) {
    return await this.loanRepository.add_loan({
      id_peminjam: data.id_peminjam,
      tgl_deadline: data.tgl_deadline,
      tgl_pinjam: data.tgl_pinjam,
      listOfAssetss: data.listOfAssetss,
      id_pegawai: data.id_pegawai,
      keterangan: data.keterangan,
    });
  }

  public async get_loan(id_divisi: number, page: number, status: string) {
    const loan = await this.loanRepository.get_loan_by_divisi({
      id_divisi,
      page,
      pageSize: 10,
      status,
    });
    return loan;
  }

  public async get_loan_all(page: number, status: string | string[]) {
    const loan = await this.loanRepository.get_loan_all({
      page,
      pageSize: 10,
      status,
    });
    return loan;
  }

  public async get_loan_detail(id_peminjaman: number, id_divisi?: number) {
    try {
      const loan = await this.loanRepository.get_loan_by_id(id_peminjaman);
      const detail = await this.loanRepository.get_loan_detail(
        id_peminjaman,
        id_divisi
      );
      let selectedAsset: number[] = [];

      detail.forEach((x) => {
        if (x.is_approved == 1) selectedAsset.push(x.id_asset);
      });

      return {
        loan,
        detail,
        selectedAsset,
      };
    } catch (error) {
      throw error;
    }
  }

  public async approve_divisi(
    list_approve: number[],
    id_peminjaman: number,
    id_divisi: number
  ) {
    return await this.loanRepository.approval_divisi(
      list_approve,
      id_peminjaman,
      id_divisi
    );
  }

  public async approve(id_peminjaman: number) {
    const loan = await this.loanRepository.approve(id_peminjaman);
    return loan;
  }

  public async reject(id_peminjaman: number) {
    const loan = await this.loanRepository.reject(id_peminjaman);
    return loan;
  }

  public async pengembalian(id_peminjaman: number) {
    const loan = await this.loanRepository.pengembalian(id_peminjaman);
    return loan;
  }

  public async get_loan_calendar(status: string | string[], year: number) {
    const loan = await this.loanRepository.get_loan_all({
      status,
      year,
    });

    let data = [];

    data = loan.loan.map((x) => {
      return {
        id: x.id_peminjaman,
        title: `${x.nama_peminjam} (${x.status}) - ${x.keterangan}`,
        start: new Date(x.tgl_pinjam),
        end: new Date(x.tgl_deadline),
        status: x.status,
      };
    });

    return data;
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
