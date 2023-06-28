import { GroupRepository } from "../repositories/GroupRepository";
import { IGroup, addGroup } from "../types";

export class GroupService {
  private groupRepository: GroupRepository;

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
  }

  public async create(data: addGroup) {
    // Validasi dan logika bisnis terkait pembuatan pengguna
    return await this.groupRepository.create(data);
  }

  public async get(): Promise<IGroup[]> {
    return await this.groupRepository.get();
  }

  // Metode lainnya untuk logika bisnis terkait pengguna
}
