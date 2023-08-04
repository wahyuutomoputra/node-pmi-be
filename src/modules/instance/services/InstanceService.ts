import { InstanceRepository } from "../repositories/InstanceRepository";
import { IInstance, addInstance } from "../types";

export class InstanceService {
  private instanceRepository: InstanceRepository;

  constructor(instanceRepository: InstanceRepository) {
    this.instanceRepository = instanceRepository;
  }

  public async create(data: addInstance) {
    // Validasi dan logika bisnis terkait pembuatan pengguna
    return await this.instanceRepository.create(data);
  }

  public async get(): Promise<IInstance[]> {
    return await this.instanceRepository.get();
  }

  public async getPaginatedInstance(param: {
    pageNumber: number;
    searchTerm: string;
    limit?: number;
  }) {
    param.limit = param.limit ?? 20;
    param.searchTerm = param.searchTerm ?? "";

    return await this.instanceRepository.getPaginatedInstance({
      pageNumber: param.pageNumber,
      pageSize: param.limit,
      searchTerm: param.searchTerm,
    });
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
