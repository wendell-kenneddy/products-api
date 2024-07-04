import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWTHandler } from "../utils/JWTHandler";
import { getCookies } from "../utils/getCookies";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) throw new Error("unauthenticated access");

  const token = String(accessToken).split(" ")[1];
  verify(token, String(process.env.TOKEN_SECRET), (err, payload) => {
    if (err) {
      if (err.message == "jwt expired") {
        const cookies = getCookies(req);
        const refreshToken = cookies.refreshToken;
        if (!refreshToken) throw new Error("invalid token");

        verify(refreshToken, String(process.env.REFRESH_TOKEN_SECRET), (e, p) => {
          const refreshTokenPayload = p as JwtPayload;
          const tokenData = {
            userID: String(refreshTokenPayload.userID),
            userName: String(refreshTokenPayload.userName),
            userAccessLevel: Number(refreshTokenPayload.userID),
          };

          const newAccessToken = JWTHandler.generateAccessToken(tokenData);
          res.header("Authorization", newAccessToken);
          res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" });
          res.status(200).json({
            message: "New Access Token provided.",
          });
        });
      }

      throw new Error(err.message);
    }

    (req as any).jwtPayload = payload;
  });

  next();
};
