import { DivisionRepository } from "../repositories/DivisionRepository";
import { IDivision, addDivision } from "../types";

export class DivisionService {
  private divisionRepository: DivisionRepository;

  constructor(divisionRepository: DivisionRepository) {
    this.divisionRepository = divisionRepository;
  }

  public async create(data: addDivision) {
    // Validasi dan logika bisnis terkait pembuatan pengguna
    return await this.divisionRepository.create(data);
  }

  public async get(): Promise<IDivision[]> {
    return await this.divisionRepository.get();
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
