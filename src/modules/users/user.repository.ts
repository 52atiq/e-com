import { CreationAttributes } from "sequelize";

import User from "./user.model";

class UserRepository {
  async create(payload: CreationAttributes<User>) {
    return await User.create(payload);
  }

  async findAll() {
    return await User.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id: string) {
    return await User.findByPk(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: { email },
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
}

export default new UserRepository();
