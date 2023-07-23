import { AssetRepository } from "../repositories/AssetRepository";
import { IAsset, addAsset } from "../types";

export class AssetService {
  private assetRepository: AssetRepository;

  constructor(assetRepository: AssetRepository) {
    this.assetRepository = assetRepository;
  }

  public async create(data: addAsset) {
    // Validasi dan logika bisnis terkait pembuatan pengguna
    return await this.assetRepository.create(data);
  }

  public async get(): Promise<IAsset[]> {
    return await this.assetRepository.get();
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
