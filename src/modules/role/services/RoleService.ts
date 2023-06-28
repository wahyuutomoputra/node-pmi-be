import { RoleRepository } from "../repositories/RoleRepository";
import { IRole, addRole } from "../types";

export class RoleService {
  private roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;
  }

  public async create(data: addRole) {
    // Validasi dan logika bisnis terkait pembuatan pengguna
    return await this.roleRepository.create(data);
  }

  public async get(): Promise<IRole[]> {
    const data = await this.roleRepository.get();
    return data;
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
