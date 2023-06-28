import { Request, Response } from "express";
import { RoleService } from "../services/RoleService";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { plainToClass } from "class-transformer";
import { addRoleReq } from "../request";
import { validate } from "class-validator";

export class RoleController {
  private roleService: RoleService;

  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  public createRole = async (req: Request, res: Response) => {
    const input = plainToClass(addRoleReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      await this.roleService.create({
        name_role: input.name,
      });
    } catch (error) {
      responseError({ res });
      return;
    }

    responseOk({ res });
  };

  public getRole = async (req: Request, res: Response) => {
    let data = await this.roleService.get();
    responseOk({ res, data });
  };

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
