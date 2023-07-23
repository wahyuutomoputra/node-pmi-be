export interface IAsset {
    id_asset: number;
    nama_asset: string | null;
    id_jenis: number;
    tgl_masuk: Date;
    masa_manfaat: number;
    harga_perolehan: number;
    tarif: number;
    status: string;
    id_divisi: number;
  }
  
  export interface addAsset {
    id_divisi?: number;
    id_jenis?: number;
    nama_asset?: string;
    status?: string;
    tgl_masuk?: Date;
    masa_manfaat?: number;
    harga_perolehan?: number;
    tarif?: number;
  }
  