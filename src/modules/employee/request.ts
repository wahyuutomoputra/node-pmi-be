import {
    IsDefined,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsArray,
  } from "class-validator";
  
  export class addEmployeeReq {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    nama!: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    email!: string;
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password!: string;
    
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    id_divisi!: number;
  }
  