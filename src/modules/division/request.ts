import {
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsArray,
    IsIn,
  } from "class-validator";
  
  export class addDivisionReq {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name!: string;

  }
  