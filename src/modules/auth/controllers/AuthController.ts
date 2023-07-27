import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { loginReq } from "../request";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public login = async (req: Request, res: Response) => {
    const input = plainToClass(loginReq, req.body);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      const data = await this.authService.login({
        email: input.email,
        password: input.password,
      });

      responseOk({ res, data });
    } catch (error) {
      responseError({ res });
      return;
    }
  };

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
