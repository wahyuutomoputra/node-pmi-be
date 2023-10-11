import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class addUserReq {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  fullname!: string;

  group_id!: number;
  password?: string;
  tgl_lahir!: string;
}

export class getByIdReq {
  @IsDefined()
  @IsNotEmpty()
  id_user!: number;
}

