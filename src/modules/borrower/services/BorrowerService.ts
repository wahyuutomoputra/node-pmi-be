import { BorrowerRepository } from "../repositories/BorrowerRepository";
import { IBorrower, addBorrower, editBorrower } from "../types";

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

  public async getPaginatedBorrower(param: {
    pageNumber: number;
    searchTerm: string;
    limit?: number;
  }) {
    param.limit = param.limit ?? 20;
    param.searchTerm = param.searchTerm ?? "";

    return await this.borrowerRepository.getPaginatedBorrower({
      pageNumber: param.pageNumber,
      pageSize: param.limit,
      searchTerm: param.searchTerm,
    });
  }

  public async getById(id: number) {
    return await this.borrowerRepository.getById(id);
  }

  public async update(data: editBorrower) {
    return await this.borrowerRepository.update(data);
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
