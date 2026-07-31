import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `APi Not Found or Route Not Found: ${req.originalUrl}`,
  });
};

export default notFound;


