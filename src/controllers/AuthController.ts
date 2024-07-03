import { Request, Response } from "express";
import { CreateUserService } from "../services/users/CreateUserService";
import { JWTHandler } from "../utils/JWTHandler";
import { ValidateLoginService } from "../services/auth/ValidateLoginService";
import { UserWithID } from "../services/users";

export class AuthController {
  signup = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await new CreateUserService().execute({ userAccessLevel: 1, ...data });
    const { accessToken, refreshToken } = this.generateTokens(user);
    res
      .header("Authorization", accessToken)
      .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" })
      .json({ message: "User successfully signed up." });
  };

  login = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await new ValidateLoginService().execute(data);
    const { accessToken, refreshToken } = this.generateTokens(user);
    res
      .header("Authorization", accessToken)
      .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" })
      .json({ message: "Login successful." });
  };

  private generateTokens(user: UserWithID) {
    const accessToken = JWTHandler.generateAccessToken(user);
    const refreshToken = JWTHandler.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }
}
