import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsIn,
} from "class-validator";

export class addBorrowerReq {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  tgl_lahir!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  nik!: string;

  @IsDefined()
  @IsNotEmpty()
  id_instansi!: number;

  @IsDefined()
  @IsNotEmpty()
  no_telp!: string;
}

export class paginateBorrowerReq {
  page!: number;
  search!: string;
  limit!: number;
}

export class getByIdReq {
  @IsDefined()
  @IsNotEmpty()
  id_user!: number;
}

export class editBorrowerReq extends addBorrowerReq {
  @IsDefined()
  @IsNotEmpty()
  id_peminjam!: number;
}
