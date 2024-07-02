import { sign } from "jsonwebtoken";
import { UserWithID } from "../services/users";

export interface JWTPayload {
  subject: string;
  userName: string;
  userAccessLevel: number;
}

export class JWTHandler {
  static generateAccessToken({ userID, userAccessLevel, userName }: UserWithID): string {
    return sign({ name: userName, userAccessLevel }, String(process.env.TOKEN_SECRET), {
      subject: userID,
      expiresIn: "12h",
    });
  }
}
