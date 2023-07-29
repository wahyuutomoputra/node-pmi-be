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
    @IsString()
    @IsIn(["1", "0"])
    id_instansi!: number;
  }

  export class paginateBorrowerReq {
    @IsDefined()
    @IsNotEmpty()
    page!: number;
  
    search!: string;
    limit!: number;
  }
  