import { Request, Response } from "express";
import { EmployeeService } from "../services/EmployeeService";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { addEmployeeReq } from "../request";

export class EmployeeController {
  private employeeService: EmployeeService;

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  public createEmployee = async (req: Request, res: Response) => {
    const input = plainToClass(addEmployeeReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      await this.employeeService.create({
        nama: input.nama,
        email: input.email,
        password: input.password,
        id_divisi: input.id_divisi
      });
    } catch (error) {
      responseError({ res, message: error });
      return;
    }
    
    responseOk({ res });
  };

  public getEmployee = async (req: Request, res: Response) => {
    let data = await this.employeeService.get();
    responseOk({ res, data });
  };

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
