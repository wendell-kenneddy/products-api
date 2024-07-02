import { NextFunction, Request, Response } from "express";

export const withoutAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  const message = "User already signed in.";

  if (authorization) res.status(401).json({ message });

  next();
};
