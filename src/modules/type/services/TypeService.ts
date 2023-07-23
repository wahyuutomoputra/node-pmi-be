import { TypeRepository } from "../repositories/TypeRepository";
import { IType, addType } from "../types";

export class TypeService {
  private typeRepository: TypeRepository;

  constructor(typeRepository: TypeRepository) {
    this.typeRepository = typeRepository;
  }

  public async create(data: addType) {
    // Validasi dan logika bisnis terkait pembuatan pengguna
    return await this.typeRepository.create(data);
  }

  public async get(): Promise<IType[]> {
    return await this.typeRepository.get();
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
