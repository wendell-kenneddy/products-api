import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";

export function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  let message = "Something went wrong.";

  if (err instanceof ValidationError || err instanceof Error) message = err.message;

  return res.status(500).json({ message });
}
