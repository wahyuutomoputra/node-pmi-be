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

  const loanService = new LoanService(
    loanRepository,
    loanDetailRepository,
  );
  const loanController = new LoanController(loanService);

  router.post("/", loanController.addLoan);
  router.get("/divisi", loanController.getlLoanDivisi);
  router.get("/all", loanController.getlLoanAll);
  router.get("/:id", loanController.getlLoanById);

  return router;
}
