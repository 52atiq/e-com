import { CreationAttributes } from "sequelize";
import Role from "./role.model";
import {  ICreateRole, IUpdateRole, RoleName } from "./role.types";

class RoleRepository {
  async create(payload: ICreateRole) {
    return await Role.create(payload);
  }

  async findAll() {
    return await Role.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id: string) {
    return await Role.findByPk(id);
  }

  async findByName(name: RoleName) {
    return await Role.findOne({
      where: { name },
    });
  }

  async update(id: string, payload: IUpdateRole) {
    const role = await Role.findByPk(id);

    if (!role) return null;

    return await role.update(payload);
  }

  async delete(id: string) {
    const role = await Role.findByPk(id);

    if (!role) return null;

    await role.destroy();

    return role;
  }

  // ##########################


async findCustomerRole() {
  return await Role.findOne({
    where: {
      name: RoleName.CUSTOMER,
    },
  });
}
}

export default new RoleRepository();
