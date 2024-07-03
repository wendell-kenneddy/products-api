import { NextFunction, Request, Response } from "express";
import { getErrorResponse } from "../utils/getErrorResponse";

export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV == "development") console.log(err.message);
  const { status, message } = getErrorResponse(err);

  return res.status(status).json({ message });
}
