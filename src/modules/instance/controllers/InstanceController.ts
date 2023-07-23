import { Request, Response } from "express";
import { InstanceService } from "../services/InstanceService";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { addInstanceReq } from "../request";

export class InstanceController {
  private instanceService: InstanceService;

  constructor(instanceService: InstanceService) {
    this.instanceService = instanceService;
  }

  public createInstance = async (req: Request, res: Response) => {
    const input = plainToClass(addInstanceReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      await this.instanceService.create({
        nama_instansi: input.name,
      });
    } catch (error) {
      responseError({ res });
      return;
    }
    
    responseOk({ res });
  };

  public getInstance = async (req: Request, res: Response) => {
    let data = await this.instanceService.get();
    responseOk({ res, data });
  };

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
