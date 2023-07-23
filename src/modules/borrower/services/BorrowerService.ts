import { BorrowerRepository } from "../repositories/BorrowerRepository";
import { IBorrower, addBorrower } from "../types";

export class BorrowerService {
  private borrowerRepository: BorrowerRepository;

  constructor(borrowerRepository: BorrowerRepository) {
    this.borrowerRepository = borrowerRepository;
  }
  
  public async create(data: addBorrower) {
    // Validasi dan logika bisnis terkait pembuatan pengguna
    return await this.borrowerRepository.create(data);
  }

  public async get(): Promise<IBorrower[]> {
    return await this.borrowerRepository.get();
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
