import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({ message: "Unauthorized access." });
  }

  const [, token] = String(authorization).split(" ");
  verify(token, String(process.env.TOKEN_SECRET), (err, payload) => {
    if (err) {
      res.status(403).json({ message: "Forbidden access." });
    }

    (req as any).jwtPayload = payload as JwtPayload;
  });

  next();
};
