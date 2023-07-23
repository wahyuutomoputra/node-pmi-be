import { Request, Response } from "express";
import { TypeService } from "../services/TypeService";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { addTypeReq } from "../request";

export class TypeController {
  private typeService: TypeService;

  constructor(typeService: TypeService) {
    this.typeService = typeService;
  }

  public createType = async (req: Request, res: Response) => {
    const input = plainToClass(addTypeReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      await this.typeService.create({
        nama_jenis: input.name,
      });
    } catch (error) {
      responseError({ res });
      return;
    }
    
    responseOk({ res });
  };

  public getType = async (req: Request, res: Response) => {
    let data = await this.typeService.get();
    responseOk({ res, data });
  };

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
