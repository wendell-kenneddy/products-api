import { JwtPayload } from "jsonwebtoken";
import { AccessLevel } from "../services/users";

export function validateAccessLevel(requiredLevel: AccessLevel, req: any) {
  const payload: JwtPayload = req.jwtPayload;
  if (Number(payload.userAccessLevel) < requiredLevel) throw new Error("forbidden access");
}
