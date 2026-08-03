import { CreationAttributes } from "sequelize";

import User from "./user.model";
import Role from "../roles/role.model";


class UserRepository {
  async create(payload: CreationAttributes<User>) {
    return await User.create(payload);
  }

  // async findAll() {
  //   return await User.findAll({
  //     order: [["createdAt", "DESC"]],
  //   });
  // }

  async findAll() {
    return await User.findAll({
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  // async findById(id: string) {
  //   return await User.findByPk(id);
  // }

  async findById(id: string) {
    return await User.findByPk(id, {
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "name"],
        },
      ],
    });
  }

  // async findByEmail(email: string) {
  //   return await User.findOne({
  //     where: { email },
  //   });
  // }

  // findByEmail(email: string) {
  //   return User.findOne({
  //     where: {
  //       email,
  //     },
  //     include: [
  //       {
  //         model: Role,
  //         as: "role",
  //       },
  //     ],
  //   });
  // }

  async findByEmail(email: string) {
    return await User.scope("withPassword").findOne({
      where: {
        email,
      },
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "name"],
        },
      ],
    });
  }

  async update(id: string, payload: Partial<User>) {
    const user = await User.findByPk(id);

    if (!user) return null;

    return await user.update(payload);
  }

  async delete(id: string) {
    const user = await User.findByPk(id);

    if (!user) return null;

    await user.destroy();

    return user;
  }

  //  ###################################

  async updatePassword(id: string, password: string) {
    const user = await User.findByPk(id);

    if (!user) return null;

    return await user.update({
      password,
    });
  }

  async updateLastLogin(id: string) {
    const user = await User.findByPk(id);

    if (!user) return null;

    return await user.update({
      lastLogin: new Date(),
    });
  }

  async verifyUser(id: string) {
    const user = await User.findByPk(id);

    if (!user) return null;

    return await user.update({
      isVerified: true,
    });
  }

  // async findByEmailWithPassword(email: string) {
  //   return await User.findOne({
  //     where: {
  //       email,
  //     },
  //     attributes: {
  //       include: ["password"],
  //     },
  //   });
  // }

  async findByEmailWithPassword(email: string) {
    return await User.scope("withPassword").findOne({
      where: {
        email,
      },
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });
  }
}

export default new UserRepository();
