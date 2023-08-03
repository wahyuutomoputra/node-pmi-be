export interface ILoan {
  id_peminjaman: number;
  id_peminjam: number;
  id_pegawai: number;
  status: string;
  tgl_pinjam: Date;
  tgl_pengembalian: Date;
  tgl_deadline: Date;
  keterangan: string;
}

export interface ILoanUser extends ILoan {
  nama_peminjam: string;
  nama_instansi: string;
}

export interface IDetailLoan {
  nama_asset: string;
  id_detail_peminjaman: number;
  id_peminjaman: number;
  id_asset: number;
  is_approved: number;
  tgl_approve: Date;
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
  keterangan: string;
}

export interface ISelectAsset {
  id_asset: number;
  nama_asset: string;
  nama_divisi: string;
}

export interface ISelectLoan {
  id_peminjaman: number;
  tgl_pinjam: string;
  tgl_deadline: string;
  status: string;
  nama_peminjam: string;
  keterangan: string;
}
export interface ISelectLoanByDivisi extends ISelectLoan {
  id_divisi: number;
}
