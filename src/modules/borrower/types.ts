export interface IBorrower {
    id_peminjam: number;
    nama_peminjam: string | null;
    tgl_lahir: string | null;
    id_instansi: number;
    nik: string;
  }
  
  export interface addBorrower {
    id_instansi?: number;
    nama_peminjam?: string;
    nik?: string;
    tgl_lahir?: string;
  }
  