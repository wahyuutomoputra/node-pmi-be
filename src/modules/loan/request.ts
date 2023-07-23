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
  