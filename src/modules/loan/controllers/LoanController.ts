import { Request, Response } from "express";
import { LoanService } from "../services/LoanService";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import {
  addLoanReq,
  createLoanReq,
  getLoanAllReq,
  getLoanReq,
} from "../request";

export class LoanController {
  private loanService: LoanService;

  constructor(loanService: LoanService) {
    this.loanService = loanService;
  }

  public createLoan = async (req: Request, res: Response) => {
    const input = plainToClass(addLoanReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      await this.loanService.create(
        {
          id_pegawai: input.id_pegawai,
          id_peminjam: input.id_peminjam,
          status: input.status,
          tgl_deadline: input.tgl_deadline,
          tgl_pengembalian: input.tgl_pengembalian,
          tgl_pinjam: input.tgl_pinjam,
        },
        input.id_asset
      );
    } catch (error) {
      responseError({ res });
      return;
    }

    responseOk({ res });
  };

  public getlLoan = async (req: Request, res: Response) => {
    let data = await this.loanService.get();
    responseOk({ res, data });
  };

  public addLoan = async (req: Request, res: Response) => {
    const input = plainToClass(createLoanReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }
    try {
      await this.loanService.add_loan({
        id_peminjam: input.id_peminjam,
        tgl_deadline: input.tgl_deadline,
        listOfAssetss: input.listOfAssetss,
        tgl_pinjam: input.tgl_pinjam,
        id_pegawai: 1,
      });
    } catch (err) {
      responseError({ res, message: err });
      return;
    }

    responseOk({ res });
  };

  public getlLoanDivisi = async (req: Request, res: Response) => {
    const input = plainToClass(getLoanReq, req.query);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      input.page = input.page ?? 1;
      let data = await this.loanService.get_loan(
        input.id_divisi,
        input.page,
        input.status
      );
      responseOk({ res, data });
    } catch (err) {
      responseError({ res, message: err });
      return;
    }
  };

  public getlLoanAll = async (req: Request, res: Response) => {
    const input = plainToClass(getLoanAllReq, req.query);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      input.page = input.page ?? 1;
      let data = await this.loanService.get_loan_all(input.page, input.status);
      responseOk({ res, data });
    } catch (err) {
      responseError({ res, message: err });
      return;
    }
  };

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
