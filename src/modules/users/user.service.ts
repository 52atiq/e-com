import httpStatus from "http-status";

import ApiError from "../../shared/errors/ApiError";

import userRepository from "./user.repository";
import User from "./user.model";

class UserService {
  async createUser(payload: Partial<User>) {
    const exists = await userRepository.findByEmail(payload.email!);

    if (exists) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
    }

    return await userRepository.create(payload as any);
  }

  async getUsers() {
    return await userRepository.findAll();
  }

  async getUser(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  }

  async updateUser(id: string, payload: Partial<User>) {
    const user = await userRepository.update(id, payload);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  }

  async deleteUser(id: string) {
    const user = await userRepository.delete(id);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    return user;
  }
}

export default new UserService();
