import { Router } from "express";
import { GroupController } from "../modules/group/controllers/GroupController";
import { GroupRepository } from "../modules/group/repositories/GroupRepository";
import { GroupService } from "../modules/group/services/GroupService";
import { Knex } from "knex";

const router = Router();

export default function RoleRoutes(knexInstance: Knex) {
  const userRepository = new GroupRepository(knexInstance);
  const userService = new GroupService(userRepository);
  const userController = new GroupController(userService);

  router.post("/", userController.createGroup);
  router.get("/", userController.getGroup);
  // tambahkan rute-rute lain yang terkait dengan entitas pengguna

  return router;
}
