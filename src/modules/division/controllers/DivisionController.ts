import { Request, Response } from "express";
import { DivisionService } from "../services/DivisionService";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { addDivisionReq } from "../request";

export class DivisionController {
  private divisionService: DivisionService;

  constructor(divisionService: DivisionService) {
    this.divisionService = divisionService;
  }

  public createDivision = async (req: Request, res: Response) => {
    const input = plainToClass(addDivisionReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      await this.divisionService.create({
        nama_divisi: input.name,
      });
    } catch (error) {
      responseError({ res });
      return;
    }
    
    responseOk({ res });
  };

  public getDivision = async (req: Request, res: Response) => {
    let data = await this.divisionService.get();
    responseOk({ res, data });
  };

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
