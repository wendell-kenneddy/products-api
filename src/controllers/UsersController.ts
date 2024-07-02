import { Request, Response } from "express";
import { CreateUserService } from "../services/users/CreateUserService";
import { GetOneUserService } from "../services/users/GetOneUserService";
import { GetManyUsersService } from "../services/users/GetManyUsersService";
import { queryPageSchema } from "../utils/queryPageSchema";
import { DeleteOneUserService } from "../services/users/DeleteOneUserService";
import { JWTHandler } from "../utils/JWTHandler";
import { ValidateLoginService } from "../services/users/ValidateLoginService";
import { JwtPayload } from "jsonwebtoken";

export class UsersController {
  signup = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await new CreateUserService().execute({ userAccessLevel: 1, ...data });
    const token = JWTHandler.generateAccessToken(user);
    res.json({ message: "User created successfully.", token });
  };

  login = async (req: Request, res: Response) => {
    const data = req.body;
    const user = await new ValidateLoginService().execute(data);
    const token = JWTHandler.generateAccessToken(user);
    res.json({ message: "Login successful.", token });
  };

  create = async (req: Request, res: Response) => {
    const payload: JwtPayload = (req as any).jwtPayload;
    const accessLevel = Number(payload.userAccessLevel);

    if (accessLevel < 3) res.status(403).json({ message: "Forbidden access." });

    const data = req.body;
    const { userID, userName, userEmail, userAccessLevel } = await new CreateUserService().execute(
      data
    );
    return res.status(200).json({
      data: {
        userID,
        userName,
        userEmail,
        userAccessLevel,
      },
    });
  };

  getOne = async (req: Request, res: Response) => {
    console.log((req as any).jwtPayload);
    const id = (req as any).jwtPayload.sub;
    const userWithID = await new GetOneUserService().execute(id);
    let data = {};

    if (userWithID) {
      const { userID, userName, userEmail, userAccessLevel } = userWithID;
      data = { userID, userName, userEmail, userAccessLevel };
    }

    return res.status(200).json({
      data,
    });
  };

  getMany = async (req: Request, res: Response) => {
    const accessLevel = Number((req as any).jwtPayload.userAccessLevel);
    if (accessLevel < 2) res.status(403).json({ message: "Forbidden access." });
    const queryPage: any = req.body;
    await queryPageSchema.validate(queryPage);
    const condition = `LIMIT ${queryPage.pageSize} OFFSET ${queryPage.offset}`;
    const page = (await new GetManyUsersService().execute(condition)).map(
      ({ userID, userName, userEmail, userAccessLevel }) => ({
        userID,
        userName,
        userEmail,
        userAccessLevel,
      })
    );
    return res.status(200).json({ data: page });
  };

  deleteOne = async (req: Request, res: Response) => {
    const id = String((req as any).jwtPayload.sub);
    await new DeleteOneUserService().execute(id);
    return res.status(200).json({
      message: "User deleted successfully.",
    });
  };
}
