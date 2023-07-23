import { LoanRepository } from "../repositories/LoanRepository";
import { LoanDetailRepository } from "../../loan_detail/repositories/LoanDetailRepository";
import { ILoan, addLoan } from "../types";

export class LoanService {
  private loanRepository: LoanRepository;
  private loanDetailRepository: LoanDetailRepository;

  constructor(loanRepository: LoanRepository, loanDetailRepository: LoanDetailRepository) {
    this.loanRepository = loanRepository;
    this.loanDetailRepository = loanDetailRepository;
  }
  

  public async create(data: addLoan, idAsset: number[]) {
    // Validasi dan logika bisnis terkait pembuatan pengguna
    let id = await this.loanRepository.create(data);

    return await this.loanDetailRepository.insertBatch(id,idAsset)


  }

  public async get(): Promise<ILoan[]> {
    return await this.loanRepository.get();
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
