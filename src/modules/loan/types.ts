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
  