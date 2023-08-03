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

  public async getPaginatedAssets(param: {
    pageNumber: number;
    searchTerm: string;
    status?: string;
  }) {
    return await this.assetRepository.getPaginatedAssets({
      pageNumber: param.pageNumber,
      pageSize: 10,
      searchTerm: param.searchTerm,
      status: param.status,
    });
  }

  public async dashboard() {
    try {
      const [dipinjam, booked, rusak, tersedia, totalHarga] = await Promise.all(
        [
          this.assetRepository.countByStatus("dipinjam"),
          this.assetRepository.countByStatus("booked"),
          this.assetRepository.countByStatus("rusak"),
          this.assetRepository.countByStatus("tersedia"),
          this.assetRepository.totalHarga(),
        ]
      );

      return {
        dipinjam: dipinjam + booked,
        rusak,
        tersedia,
        totalAsset: dipinjam + rusak + tersedia + booked,
        totalHarga,
      };
    } catch (error) {}
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
