// src/modules/user/controllers/UserController.ts

import { Request, Response } from "express";
import { UserService } from "../services/UserService";

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

  // Metode lainnya untuk menangani permintaan HTTP terkait pengguna
}
