import { Router } from "express";
import { BorrowerController } from "../modules/borrower/controllers/BorrowerController";
import { BorrowerRepository } from "../modules/borrower/repositories/BorrowerRepository";
import { BorrowerService } from "../modules/borrower/services/BorrowerService";
import { Knex } from "knex";

const router = Router();

export default function RoleRoutes(knexInstance: Knex) {
  const borrowerRepository = new BorrowerRepository(knexInstance);
  const borrowerService = new BorrowerService(borrowerRepository);
  const borrowerController = new BorrowerController(borrowerService);

  router.post("/", borrowerController.createBorrower);
  router.get("/", borrowerController.getBorrower);
  router.get("/paginate", borrowerController.getPaginatedBorrower);
  // tambahkan rute-rute lain yang terkait dengan entitas pengguna

  return router;
}
