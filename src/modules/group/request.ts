import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsIn,
} from "class-validator";

export class addGroupReq {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsIn(["1", "0"])
  isInternal!: number;
}
