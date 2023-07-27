import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsEmail,
} from "class-validator";

export class loginReq {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password!: string;
}
