import {
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsArray,
    IsIn,
    IsDate,
  } from "class-validator";
  
  export class addAssetReq {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name!: string;
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    status!: string;
  
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(["1", "0"])
    id_divisi!: number;
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(["1", "0"])
    id_jenis!: number;
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(["1", "0"])
    masa_manfaat!: number;
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(["1", "0"])
    harga_perolehan!: number;
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsIn(["1", "0"])
    tarif!: number;
    
    @IsDefined()
    @IsNotEmpty()
    @IsDate()
    tgl_masuk!: Date;
  }
  