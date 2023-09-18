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
  id_divisi!: number;

  @IsDefined()
  @IsNotEmpty()
  id_jenis!: number;

  @IsDefined()
  @IsNotEmpty()
  masa_manfaat!: number;

  @IsDefined()
  @IsNotEmpty()
  harga_perolehan!: number;

  @IsDefined()
  @IsNotEmpty()
  tarif!: number;

  @IsDefined()
  @IsNotEmpty()
  tgl_masuk!: Date;

  @IsDefined()
  @IsNotEmpty()
  asset_code!: string;
}

export class paginateAssets {
  @IsDefined()
  @IsNotEmpty()
  page!: number;

  search!: string;
  status!: string;
}

export class updateAssetReq extends addAssetReq {
  @IsDefined()
  @IsNotEmpty()
  id_asset!: number;

  @IsDefined()
  @IsNotEmpty()
  status!: string;
}

export class getByIdReq {
  @IsDefined()
  @IsNotEmpty()
  id_asset!: number;
}

