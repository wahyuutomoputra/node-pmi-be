import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { IEmployee, addEmployee } from "../types";
import bcrypt from "bcrypt";
export class EmployeeService {
  private employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  public async create(data: addEmployee) {
    const isAvailableEmail = await this.employeeRepository.isAvailableEmail(
      data.email
    );

    console.log(isAvailableEmail)

    if (!isAvailableEmail) {
      throw new Error("Email sudah digunakan");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;
    // Validasi dan logika bisnis terkait pembuatan pengguna
    return await this.employeeRepository.create(data);
  }

  public async get(): Promise<IEmployee[]> {
    return await this.employeeRepository.get();
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
