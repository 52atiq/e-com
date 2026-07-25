import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Route not found atiq: ${req.originalUrl}`,
  });
};

export default notFound;
