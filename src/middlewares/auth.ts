import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import ApiError from "../shared/errors/ApiError";

import { env } from "../config/env";
import { verifyToken } from "../shared/utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const auth =
  (...roles: string[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized access");
      }

      const token = authorization.startsWith("Bearer ")
        ? authorization.split(" ")[1]
        : authorization;

      const decoded = verifyToken(token, env.jwtAccessSecret);

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role as string)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;

