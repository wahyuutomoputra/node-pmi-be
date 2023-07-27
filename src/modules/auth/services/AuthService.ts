import { createToken } from "../../../middleware/AuthMiddleware";
import { EmployeeRepository } from "../../employee/repositories/EmployeeRepository";
import { loginRes } from "../response";
import { login } from "../types";
import bcrypt from "bcrypt";

export class AuthService {
  private employeeRepository: EmployeeRepository;

  constructor(employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  public async login(user: login): Promise<loginRes> {
    const userData = await this.employeeRepository.getByEmail(user.email);
    if (!userData) {
      return {
        isLoggedIn: false,
        message: "no user found",
        user: null,
        token: "",
      };
    }

    const isValidPassword = await bcrypt.compare(
      user.password,
      userData.password ?? ""
    );

    if (!isValidPassword) {
      return {
        isLoggedIn: false,
        message: "password false",
        user: null,
        token: "",
      };
    }

    delete userData.password;

    const token = createToken(userData);

    return {
      isLoggedIn: true,
      message: "success",
      user: userData,
      token,
    };
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
