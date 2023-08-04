import {
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsArray,
    IsIn,
  } from "class-validator";
  
  export class addInstanceReq {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name!: string;
  }

  export class paginateInstanceReq {
    page!: number;
    search!: string;
    limit!: number;
  }
  