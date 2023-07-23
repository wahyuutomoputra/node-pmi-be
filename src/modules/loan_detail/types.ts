export interface ILoanDetail {
    id_detail_peminjaman: number;
    id_peminjaman: number;
    id_asset: number;
    tgl_approve: Date;
    is_approved: number | null;
  }

  export interface addLoanDetail {
    id_detail_peminjaman?: number;
    id_peminjaman?: number;
    id_asset?: number;
    tgl_approve?: Date;
    is_approved?: number;
  }

  