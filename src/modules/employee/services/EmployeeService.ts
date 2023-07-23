import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { IEmployee, addEmployee } from "../types";

export class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  public async create(data: addEmployee) {
    // Validasi dan logika bisnis terkait pembuatan pengguna
    return await this.employeeRepository.create(data);
  }

  public async get(): Promise<IEmployee[]> {
    return await this.employeeRepository.get();
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
