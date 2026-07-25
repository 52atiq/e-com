import { CreationAttributes } from "sequelize";
import Role from "./role.model";
import roleRepository from "./role.repository";
import { ICreateRole, IRole, IUpdateRole, RoleName } from "./role.types";

class RoleService {
  async createRole(payload: ICreateRole) {
    const exists = await roleRepository.findByName(payload.name);

    if (exists) {
      throw new Error("Role already exists");
    }

    return await roleRepository.create(payload);
  }

  async getRoles() {
    return await roleRepository.findAll();
  }

  async getRole(id: string) {
    return await roleRepository.findById(id);
  }

  async updateRole(id: string, payload: IUpdateRole) {
    return await roleRepository.update(id, payload);
  }

  async deleteRole(id: string) {
    return await roleRepository.delete(id);
  }
}

export default new RoleService();
