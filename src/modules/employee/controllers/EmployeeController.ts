import { Request, Response } from "express";
import { EmployeeService } from "../services/EmployeeService";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import {
  addEmployeeReq,
  editEmployeeReq,
  paginateEmployeeReq,
} from "../request";

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
        id_divisi: input.id_divisi,
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

  public getPaginatedEmployee = async (req: Request, res: Response) => {
    const input = plainToClass(paginateEmployeeReq, req.query);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    input.search = input.search ?? "";
    input.status = input.status ?? "";

    try {
      let data = await this.employeeService.getPaginatedEmployee({
        pageNumber: input.page,
        searchTerm: input.search,
        status: input.status,
      });
      responseOk({ res, data });
      return;
    } catch (error) {
      console.log(error);
      responseError({ res });
    }
  };

  public updateEmployee = async (req: Request, res: Response) => {
    const input = plainToClass(editEmployeeReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      await this.employeeService.update(
        {
          nama: input.nama,
          email: input.email,
          password: input.password,
          id_divisi: input.id_divisi,
        },
        input.id_pegawai
      );
    } catch (error) {
      responseError({ res, message: error });
      return;
    }

    responseOk({ res });
  };

  public getDetailEmployee = async (req: Request, res: Response) => {
    const id = (req.params.id as unknown as number) ?? 0;

    try {
      let data = await this.employeeService.getDetail(id);
      responseOk({ res, data });
    } catch (error) {
      console.log(error)
      responseError({ res });
    }
  };
}
