import { Request, Response } from "express";
import { CreateUserService } from "../services/users/CreateUserService";
import { GetOneUserService } from "../services/users/GetOneUserService";
import { GetManyUsersService } from "../services/users/GetManyUsersService";
import { queryPageSchema } from "../utils/queryPageSchema";
import { DeleteOneUserService } from "../services/users/DeleteOneUserService";
import { validateAccessLevel } from "../utils/validateAccessLevel";

export class UsersController {
  create = async (req: Request, res: Response) => {
    validateAccessLevel(3, req);

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
    const id = (req as any).jwtPayload.userID;
    const dbUser = await new GetOneUserService().execute(id);
    let data = {};

    if (dbUser) {
      const { userID, userName, userEmail, userAccessLevel } = dbUser;
      data = { userID, userName, userEmail, userAccessLevel };
    }

    return res.status(200).json({
      data,
    });
  };

  getMany = async (req: Request, res: Response) => {
    validateAccessLevel(2, req);
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
    const userID = String((req as any).jwtPayload.userID);
    await new DeleteOneUserService().execute(userID);
    return res.status(200).json({
      message: "User deleted successfully.",
    });
  };
}
