import { Router } from "express";
import { TypeController } from "../modules/type/controllers/TypeController";
import { TypeRepository } from "../modules/type/repositories/TypeRepository";
import { TypeService } from "../modules/type/services/TypeService";
import { Knex } from "knex";

const router = Router();

export default function RoleRoutes(knexInstance: Knex) {
  const userRepository = new TypeRepository(knexInstance);
  const userService = new TypeService(userRepository);
  const userController = new TypeController(userService);

  router.post("/", userController.createType);
  router.get("/", userController.getType);
  // tambahkan rute-rute lain yang terkait dengan entitas pengguna

  return router;
}
