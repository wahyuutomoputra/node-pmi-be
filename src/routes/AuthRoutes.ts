import { Router } from "express";
import { AuthController } from "../modules/auth/controllers/AuthController";
import { EmployeeRepository } from "../modules/employee/repositories/EmployeeRepository";
import { AuthService } from "../modules/auth/services/AuthService";
import { Knex } from "knex";

const router = Router();

export default function AuthRoutes(knexInstance: Knex) {
  const employeeRepository = new EmployeeRepository(knexInstance);
  const authService = new AuthService(employeeRepository);
  const authController = new AuthController(authService);

  router.post("/login", authController.login);

  return router;
}
