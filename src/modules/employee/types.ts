export interface IEmployee {
    id_pegawai: number;
    nama: string | null;
    email: string;
    password?: string | null;
    id_divisi: number;
  }
  
  export interface addEmployee {
    nama: string;
    email: string;
    password: string;
    id_divisi?: number;
  }
  