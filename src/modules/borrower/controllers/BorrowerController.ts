import { Request, Response } from "express";
import { BorrowerService } from "../services/BorrowerService";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { addBorrowerReq, paginateBorrowerReq } from "../request";

export class BorrowerController {
  private borrowerService: BorrowerService;

  constructor(borrowerService: BorrowerService) {
    this.borrowerService = borrowerService;
  }

  public createBorrower = async (req: Request, res: Response) => {
    const input = plainToClass(addBorrowerReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      await this.borrowerService.create({
        id_instansi: input.id_instansi,
        nama_peminjam: input.name,
        nik: input.nik,
        tgl_lahir: input.tgl_lahir,
      });
    } catch (error) {
      responseError({ res });
      return;
    }

    responseOk({ res });
  };

  public getBorrower = async (req: Request, res: Response) => {
    let data = await this.borrowerService.get();
    responseOk({ res, data });
  };

  public getPaginatedBorrower = async (req: Request, res: Response) => {
    const input = plainToClass(paginateBorrowerReq, req.query);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      let data = await this.borrowerService.getPaginatedBorrower({
        pageNumber: input.page,
        searchTerm: input.search,
        limit: input.limit,
      });
      responseOk({ res, data });
      return;
    } catch (error) {
      console.log(error);
      responseError({ res });
    }
  };

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
