export interface ILoan {
  id_peminjaman: number;
  id_peminjam: number;
  id_pegawai: number;
  status: string;
  tgl_pinjam: Date;
  tgl_pengembalian: Date;
  tgl_deadline: Date;
}

export interface addLoan {
  id_peminjam?: number;
  id_pegawai?: number;
  status?: string;
  tgl_pinjam?: Date;
  tgl_pengembalian?: Date;
  tgl_deadline?: Date;
}

export interface createLoan {
  listOfAssetss: number[];
  tgl_pinjam: string;
  tgl_deadline: string;
  id_peminjam: number;
  id_pegawai: number;
}

export interface ISelectAsset {
  id_asset: number;
  nama_asset: string;
  nama_divisi: string;
}

export interface ISelectLoan {
  id_peminjaman: number;
  tgl_pinjam: Date;
  tgl_deadline: Date;
  status: string;
}
export interface ISelectLoanByDivisi extends ISelectLoan {
  id_divisi: number;
}
