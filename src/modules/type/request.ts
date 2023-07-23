import {
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsArray,
    IsIn,
  } from "class-validator";
  
  export class addTypeReq {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name!: string;

  }
  