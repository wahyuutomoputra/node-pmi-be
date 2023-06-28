import { Router } from "express";
import { RoleController } from "../modules/role/controllers/RoleController";
import { RoleRepository } from "../modules/role/repositories/RoleRepository";
import { RoleService } from "../modules/role/services/RoleService";
import { Knex } from "knex";

const router = Router();

export default function RoleRoutes(knexInstance: Knex) {
  const userRepository = new RoleRepository(knexInstance);
  const userService = new RoleService(userRepository);
  const userController = new RoleController(userService);

  router.post("/", userController.createRole);
  router.get("/", userController.getRole);
  // tambahkan rute-rute lain yang terkait dengan entitas pengguna

  return router;
}
