import httpStatus from "http-status";
import { Request, Response } from "express";
import userService from "./user.service";
import catchAsync from "../../shared/utils/catchAsync";
import sendResponse from "../../shared/utils/sendResponse";

class UserController {
  // create = catchAsync(async (req: Request, res: Response) => {
  //   const result = await userService.createUser(req.body);

  //   sendResponse(res, {
  //     success: true,
  //     statusCode: httpStatus.CREATED,
  //     message: "User created successfully",
  //     data: result,
  //   });
  // });

  getAll = catchAsync(async (_req: Request, res: Response) => {
    const result = await userService.getUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
      data: result,
    });
  });

  getById = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getUser(req.params.id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved successfully",
      data: result,
    });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.updateUser(req.params.id as string, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User updated successfully",
      data: result,
    });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    await userService.deleteUser(req.params.id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User deleted successfully",
      data: null,
    });
  });
}

export default new UserController();
