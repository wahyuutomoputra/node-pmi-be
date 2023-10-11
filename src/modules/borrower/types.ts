export interface IBorrower {
  id_peminjam: number;
  nama_peminjam: string | null;
  tgl_lahir: string | null;
  id_instansi: number;
  nik: string;
  no_telp: string;
}

export interface addBorrower {
  id_instansi?: number;
  nama_peminjam?: string;
  nik?: string;
  tgl_lahir?: string;
  no_telp: string;
}

export interface IPaginateBorrower extends IBorrower {
  nama_instansi: string;
}

export interface editBorrower extends addBorrower {
  id_peminjam: number;
}
