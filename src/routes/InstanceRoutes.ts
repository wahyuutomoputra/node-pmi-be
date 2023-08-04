import { Router } from "express";
import { InstanceController } from "../modules/instance/controllers/InstanceController";
import { InstanceRepository } from "../modules/instance/repositories/InstanceRepository";
import { InstanceService } from "../modules/instance/services/InstanceService";
import { Knex } from "knex";

const router = Router();

export default function RoleRoutes(knexInstance: Knex) {
  const instanceRepository = new InstanceRepository(knexInstance);
  const instanceService = new InstanceService(instanceRepository);
  const instanceController = new InstanceController(instanceService);

  router.post("/", instanceController.createInstance);
  router.get("/", instanceController.getInstance);
  router.get("/paginate", instanceController.getPaginatedInstance);

  return router;
}
