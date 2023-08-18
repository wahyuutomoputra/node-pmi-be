import { Router } from "express";
import { EmployeeController } from "../modules/employee/controllers/EmployeeController";
import { EmployeeRepository } from "../modules/employee/repositories/EmployeeRepository";
import { EmployeeService } from "../modules/employee/services/EmployeeService";
import { Knex } from "knex";

const router = Router();

export default function EmployeeRoutes(knexInstance: Knex) {
  const employeeRepository = new EmployeeRepository(knexInstance);
  const employeeService = new EmployeeService(employeeRepository);
  const employeeController = new EmployeeController(employeeService);

  router.post("/", employeeController.createEmployee);
  router.get("/", employeeController.getPaginatedEmployee);
  router.put("/", employeeController.updateEmployee);
  router.get("/:id", employeeController.getDetailEmployee);

  return router;
}
