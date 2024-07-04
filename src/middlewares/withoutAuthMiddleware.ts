import { NextFunction, Request, Response } from "express";

export const withoutAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization) throw new Error("unauthenticated only");
  next();
};
