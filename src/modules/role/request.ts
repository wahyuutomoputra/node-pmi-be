import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
} from "class-validator";

export class addRoleReq {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;
}
