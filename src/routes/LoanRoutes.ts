import { Router } from "express";
import { LoanController } from "../modules/loan/controllers/LoanController";
import { LoanRepository } from "../modules/loan/repositories/LoanRepository";
import { LoanDetailRepository } from "../modules/loan_detail/repositories/LoanDetailRepository";
import { LoanService } from "../modules/loan/services/LoanService";
import { Knex } from "knex";

const router = Router();

export default function LoanRoutes(knexInstance: Knex) {
  const loanRepository = new LoanRepository(knexInstance);
  const loanDetailRepository = new LoanDetailRepository(knexInstance);

  const loanService = new LoanService(loanRepository, loanDetailRepository);
  const loanController = new LoanController(loanService);

  router.post("/", loanController.addLoan);
  router.get("/divisi", loanController.getlLoanDivisi);
  router.get("/all", loanController.getlLoanAll);
  router.post("/commit_approve", loanController.approve);
  router.post("/approve_divisi", loanController.approve_divisi);
  router.post("/commit_reject", loanController.reject);
  router.post("/pengembalian", loanController.pengembalian);
  router.get("/calendar", loanController.calendar);
  router.get("/:id", loanController.getlLoanById);
  router.get("/:id/:id_divisi", loanController.getlLoanById);

  return router;
}
