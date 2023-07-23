import { Router } from "express";
import { DivisionController } from "../modules/division/controllers/DivisionController";
import { DivisionRepository } from "../modules/division/repositories/DivisionRepository";
import { DivisionService } from "../modules/division/services/DivisionService";
import { Knex } from "knex";

const router = Router();

export default function RoleRoutes(knexInstance: Knex) {
  const userRepository = new DivisionRepository(knexInstance);
  const userService = new DivisionService(userRepository);
  const userController = new DivisionController(userService);

  router.post("/", userController.createDivision);
  router.get("/", userController.getDivision);
  // tambahkan rute-rute lain yang terkait dengan entitas pengguna

  return router;
}
