// src/modules/user/controllers/UserController.ts

import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import {
  responseError,
  responseErrorInput,
  responseOk,
} from "../../../helper/Response";
import { getByIdReq } from "../request";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public createUser = async (req: Request, res: Response) => {
    // Logika untuk membuat pengguna baru
    await this.userService.createUser(req.body);
    res.status(201).send("User created successfully");
  };

  public getById = async (req: Request, res: Response) => {
    const input = plainToClass(getByIdReq, req.query);
    const error = await validate(input);
    if (error.length > 0) {
      responseErrorInput({ res, error });
      return;
    }

    try {
      const data = await this.userService.getById(input.id_user);
      responseOk({ res, data });
    } catch (error) {
      console.log(error);
      responseError({ res, message: error });
      return;
    }
  };

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
