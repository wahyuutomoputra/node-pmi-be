import { AssetRepository } from "../repositories/AssetRepository";
import { IAsset, addAsset } from "../types";
import { useRupiah } from "../../../helper/useRupiah";

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
    let data = await this.assetRepository.getPaginatedAssets({
      pageNumber: param.pageNumber,
      pageSize: 10,
      searchTerm: param.searchTerm,
      status: param.status,
    });

    const tanggalSekarang = new Date();

    data.assets = data.assets.map((x) => {
      const selisihMilisecond =
        tanggalSekarang.getTime() - new Date(x.tgl_masuk).getTime();
      const milisecondPerTahun = 1000 * 60 * 60 * 24 * 365.25; // Rata-rata tahun dalam milisecond
      const milisecondPerBulan = milisecondPerTahun / 12; // Rata-rata bulan dalam milisecond

      const umurTahun = Math.floor(selisihMilisecond / milisecondPerTahun);
      const umurBulan = Math.floor(
        (selisihMilisecond % milisecondPerTahun) / milisecondPerBulan
      );
      const umurHari = Math.floor(
        (selisihMilisecond % milisecondPerBulan) / (1000 * 60 * 60 * 24)
      );

      let umurString = "";

      if (umurTahun > 0) {
        umurString += `${umurTahun} tahun, `;
      }

      if (umurBulan > 0) {
        umurString += `${umurBulan} bulan, `;
      }

      if (umurHari > 0) {
        umurString += `${umurHari} hari`;
      }

      let tarifDesimal = x.tarif / 100;
      let penyusutan = x.harga_perolehan * tarifDesimal;
      let totalPenyusutan = penyusutan * umurTahun;

      if (umurTahun >= x.masa_manfaat) {
        totalPenyusutan = penyusutan * x.masa_manfaat;
      }

      return {
        ...x,
        umur: umurString,
        harga: useRupiah(x.harga_perolehan),
        penyusutan: useRupiah(penyusutan),
        totalPenyusutan: useRupiah(totalPenyusutan),
      };
    });

    return data;
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

  public async harga_asset() {
    const data = await this.assetRepository.harga_asset();
    return data.map((x) => {
      return {
        ...x,
        harga: useRupiah(x.harga),
      };
    });
  }

  public async penyusutan() {
    const data = await this.assetRepository.penyusutan();
    return data.map((x) => {
      return {
        ...x,
        total_harga_perolehan: useRupiah(x.total_harga_perolehan),
        total_penyusutan: useRupiah(x.total_penyusutan),
      };
    });
  }

  public async update(data: addAsset, id_asset: number) {
    return await this.assetRepository.update(data, id_asset);
  }

}
