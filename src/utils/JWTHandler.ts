import { sign } from "jsonwebtoken";

export interface TokenPayload {
  userID: string;
  userName: string;
  userAccessLevel: number;
}

export class JWTHandler {
  static generateAccessToken(payload: TokenPayload): string {
    return sign(payload, String(process.env.TOKEN_SECRET), {
      subject: "user-token",
      expiresIn: 60 * 15,
    });
  }

  static generateRefreshToken(payload: TokenPayload) {
    return sign(payload, String(process.env.REFRESH_TOKEN_SECRET), {
      subject: "refresh-token",
      expiresIn: "1d",
    });
  }
}
