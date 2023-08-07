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
  approveLoanReq,
  approveReq,
  createLoanReq,
  getLoanAllReq,
  getLoanCalendarReq,
  getLoanReq,
  pengembalianReq,
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
        keterangan: input.keterangan,
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

    // status[]=diproses&status[]=dikembalikan
    // status=diproses

    try {
      input.page = input.page ?? 1;
      let data = await this.loanService.get_loan_all(input.page, input.status);
      responseOk({ res, data });
    } catch (err) {
      responseError({ res, message: err });
      return;
    }
  };

  public getlLoanById = async (req: Request, res: Response) => {
    try {
      const id = (req.params.id as unknown as number) ?? 0;
      const id_divisi =
        (req.params.id_divisi as unknown as number) ?? undefined;

      let data = await this.loanService.get_loan_detail(id, id_divisi);
      responseOk({ res, data });
    } catch (err) {
      responseError({ res });
      return;
    }
  };

  public approve_divisi = async (req: Request, res: Response) => {
    const input = plainToClass(approveLoanReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      let data = await this.loanService.approve_divisi(
        input.list_approve,
        input.id_peminjaman,
        input.id_divisi
      );
      responseOk({ res, data });
    } catch (err) {
      responseError({ res });
      return;
    }
  };

  public approve = async (req: Request, res: Response) => {
    const input = plainToClass(approveReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }
    try {
      await this.loanService.approve(input.id_peminjaman);
    } catch (err) {
      responseError({ res, message: err });
      return;
    }

    responseOk({ res });
  };

  public reject = async (req: Request, res: Response) => {
    const input = plainToClass(approveReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }
    try {
      await this.loanService.reject(input.id_peminjaman);
    } catch (err) {
      responseError({ res, message: err });
      return;
    }

    responseOk({ res });
  };

  public pengembalian = async (req: Request, res: Response) => {
    const input = plainToClass(approveReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }
    try {
      await this.loanService.pengembalian(input.id_peminjaman);
    } catch (err) {
      responseError({ res, message: err });
      return;
    }

    responseOk({ res });
  };

  public calendar = async (req: Request, res: Response) => {
    const input = plainToClass(getLoanCalendarReq, req.query);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      let data = await this.loanService.get_loan_calendar(
        input.status,
        input.year
      );
      responseOk({ res, data });
    } catch (err) {
      responseError({ res, message: err });
      return;
    }
  };

  public pengembalian_with_status = async (req: Request, res: Response) => {
    const input = plainToClass(pengembalianReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }
    try {
      await this.loanService.pengembalian_with_status(
        input.id_peminjaman,
        input.list_asset
      );
    } catch (err) {
      responseError({ res, message: err });
      return;
    }

    responseOk({ res });
  };

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
