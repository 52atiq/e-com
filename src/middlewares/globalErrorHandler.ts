import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
    error,
  });
};

export default globalErrorHandler;

// For better way 

// import { NextFunction, Request, Response } from "express";

// const globalErrorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const statusCode = err.statusCode || 500;

//   res.status(statusCode).json({
//     success: false,
//     message: err.message || "Something went wrong",
//     stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
//   });
// };

// export default globalErrorHandler;
