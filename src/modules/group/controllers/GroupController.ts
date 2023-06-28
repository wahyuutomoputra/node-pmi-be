import { Request, Response } from "express";
import { GroupService } from "../services/GroupService";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { addGroupReq } from "../request";

export class GroupController {
  private groupService: GroupService;

  constructor(groupService: GroupService) {
    this.groupService = groupService;
  }

  public createGroup = async (req: Request, res: Response) => {
    const input = plainToClass(addGroupReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      await this.groupService.create({
        nama_group: input.name,
        is_internal: input.isInternal,
      });
    } catch (error) {
      responseError({ res });
      return;
    }
    
    responseOk({ res });
  };

  public getGroup = async (req: Request, res: Response) => {
    let data = await this.groupService.get();
    responseOk({ res, data });
  };

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
