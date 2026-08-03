import httpStatus from "http-status";
import { Request, Response } from "express";
import authService from "./auth.service";
import catchAsync from "../../shared/utils/catchAsync";
import sendResponse from "../../shared/utils/sendResponse";

class AuthController {
  register = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.register(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: result,
    });
  });

  login = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Login successful",
      data: result,
    });
  });

  refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    const result = await authService.refreshToken(refreshToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Access token generated successfully",
      data: result,
    });
  });

  logout = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    await authService.logout(refreshToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Logout successful",
      data: null,
    });
  });
}

export default new AuthController();
