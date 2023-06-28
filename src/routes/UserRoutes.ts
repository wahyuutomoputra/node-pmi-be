// src/routes/userRoutes.ts

import { Router } from "express";
import { UserController } from "../modules/user/controllers/UserController";
import { UserRepository } from "../modules/user/repositories/UserRepository";
import { UserService } from "../modules/user/services/UserService";
import { Knex } from "knex";

const router = Router();

export default function UserRoutes(knexInstance: Knex) {
  const userRepository = new UserRepository(knexInstance);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  router.post("/", userController.createUser);
  // tambahkan rute-rute lain yang terkait dengan entitas pengguna

  return router;
}
