import httpStatus from "http-status";

import ApiError from "../../shared/errors/ApiError";

import { env } from "../../config/env";

import userRepository from "../users/user.repository";
import roleRepository from "../roles/role.repository";
import refreshTokenService from "../refreshTokens/refreshToken.service";


import { ILoginPayload, IRegisterPayload } from "./auth.types";
import { comparePassword, hashPassword } from "../../shared/utils/bcrypt";
import { createToken, verifyToken } from "../../shared/utils/jwt";

class AuthService {
  async register(payload: IRegisterPayload) {
    // const exists = await userRepository.findByEmail(payload.email);
    const exists = await userRepository.findByEmailWithPassword(payload.email);

    if (exists) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists");
    }

    const customerRole = await roleRepository.findCustomerRole();

    if (!customerRole) {
      throw new ApiError(httpStatus.NOT_FOUND, "Customer role not found");
    }

    const hashedPassword = await hashPassword(payload.password);

    const user = await userRepository.create({
      ...payload,
      password: hashedPassword,
      roleId: customerRole.id,
    });

    const jwtPayload = {
      userId: user.id,
      email: user.email,
      role: customerRole.name,
    };

    const accessToken = createToken(
      jwtPayload,
      env.jwtAccessSecret,
      env.jwtAccessExpiresIn,
    );

    const refreshToken = createToken(
      jwtPayload,
      env.jwtRefreshSecret,
      env.jwtRefreshExpiresIn,
    );

    await refreshTokenService.save(
      user.id,
      refreshToken,
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async login(payload: ILoginPayload) {
    const user = await userRepository.findByEmail(payload.email);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const matched = await comparePassword(payload.password, user.password);

    if (!matched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
    }


    const jwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role?.name,
    };

    const accessToken = createToken(
      jwtPayload,
      env.jwtAccessSecret,
      env.jwtAccessExpiresIn,
    );

    const refreshToken = createToken(
      jwtPayload,
      env.jwtRefreshSecret,
      env.jwtRefreshExpiresIn,
    );

    await refreshTokenService.save(
      user.id,
      refreshToken,
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    );

    await userRepository.updateLastLogin(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    const exists = await refreshTokenService.find(token);

    if (!exists) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
    }

    const decoded = verifyToken(token, env.jwtRefreshSecret);

    const accessToken = createToken(
      {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      },
      env.jwtAccessSecret,
      env.jwtAccessExpiresIn,
    );

    return {
      accessToken,
    };
  }

  async logout(token: string) {
    await refreshTokenService.revoke(token);

    return null;
  }
}

export default new AuthService();
