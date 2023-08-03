import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsIn,
  IsDate,
} from "class-validator";

export class addLoanReq {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  status!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsIn(["1", "0"])
  id_peminjam!: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsIn(["1", "0"])
  id_pegawai!: number;

  @IsDefined()
  @IsNotEmpty()
  @IsDate()
  tgl_pinjam!: Date;

  @IsDefined()
  @IsNotEmpty()
  @IsDate()
  tgl_pengembalian!: Date;

  @IsDefined()
  @IsNotEmpty()
  @IsDate()
  tgl_deadline!: Date;

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  id_asset!: number[];
}

export class createLoanReq {
  @IsDefined()
  @IsNotEmpty()
  listOfAssetss!: number[];

  @IsDefined()
  @IsNotEmpty()
  tgl_pinjam!: string;

  @IsDefined()
  @IsNotEmpty()
  tgl_deadline!: string;

  @IsDefined()
  @IsNotEmpty()
  id_peminjam!: number;

  @IsDefined()
  @IsNotEmpty()
  keterangan!: string;
}

export class getLoanAllReq {
  page!: number;
  status!: string | string[];
}
export class getLoanReq {
  @IsDefined()
  @IsNotEmpty()
  id_divisi!: number;
  page!: number;
  status!: string;
}

export class approveLoanReq {
  @IsDefined()
  @IsNotEmpty()
  list_approve!: number[];

  @IsDefined()
  @IsNotEmpty()
  id_peminjaman!: number;

  @IsDefined()
  @IsNotEmpty()
  id_divisi!: number;
}

export class approveReq {
  @IsDefined()
  @IsNotEmpty()
  id_peminjaman!: number;
}

export class getLoanCalendarReq {
  @IsDefined()
  @IsNotEmpty()
  year!: number;

  status!: string | string[];
}
