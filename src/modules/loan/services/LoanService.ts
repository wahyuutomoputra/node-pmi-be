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

  public async get_loan_all(page: number, status: string) {
    const loan = await this.loanRepository.get_loan_all({
      page,
      pageSize: 10,
      status,
    });
    return loan;
  }

  public async get_loan_detail(id_peminjaman: number) {
    try {
      const loan = await this.loanRepository.get_loan_by_id(id_peminjaman);
      const detail = await this.loanRepository.get_loan_detail(id_peminjaman);

      return {
        loan,
        detail,
      };
    } catch (error) {
      throw error;
    }
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
