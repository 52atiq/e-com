import httpStatus from "http-status";
import { Request, Response } from "express";


import roleService from "./role.service";
import catchAsync from "../../shared/utils/catchAsync";
import sendResponse from "../../shared/utils/sendResponse";

class RoleController {
  create = catchAsync(async (req: Request, res: Response) => {
    const result = await roleService.createRole(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Role created successfully",
      data: result,
    });
  });

  getAll = catchAsync(async (_req: Request, res: Response) => {
    const result = await roleService.getRoles();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Roles retrieved successfully",
      data: result,
    });
  });

  getById = catchAsync(async (req: Request, res: Response) => {
    const result = await roleService.getRole(req.params.id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Role retrieved successfully",
      data: result,
    });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const result = await roleService.updateRole(req.params.id as string, req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Role updated successfully",
      data: result,
    });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    await roleService.deleteRole(req.params.id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Role deleted successfully",
      data: null,
    });
  });
}

export default new RoleController();

// import { Request, Response, NextFunction } from "express";
// import roleService from "./role.service";

// class RoleController {
//   async create(req: Request, res: Response, next: NextFunction) {
//     try {
//       const result = await roleService.createRole(req.body);

//       res.status(201).json({
//         success: true,
//         message: "Role created successfully",
//         data: result,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async getAll(req: Request, res: Response, next: NextFunction) {
//     try {
//       const result = await roleService.getRoles();

//       res.status(200).json({
//         success: true,
//         data: result,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async getById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const result = await roleService.getRole(req.params.id as string);

//       res.status(200).json({
//         success: true,
//         data: result,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async update(req: Request, res: Response, next: NextFunction) {
//     try {
//       const result = await roleService.updateRole(req.params.id  as string, req.body);

//       res.status(200).json({
//         success: true,
//         message: "Role updated successfully",
//         data: result,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async delete(req: Request, res: Response, next: NextFunction) {
//     try {
//       await roleService.deleteRole(req.params.id as string);

//       res.status(200).json({
//         success: true,
//         message: "Role deleted successfully",
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// }

// export default new RoleController();
