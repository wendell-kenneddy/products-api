import { Request, Response } from "express";
import { CreateUserService } from "../services/users/CreateUserService";
import { GetOneUserService } from "../services/users/GetOneUserService";
import { GetManyUsersService } from "../services/users/GetManyUsersService";
import { queryPageSchema } from "../utils/queryPageSchema";
import { DeleteOneUserService } from "../services/users/DeleteOneUserService";

export class UsersController {
  create = async (req: Request, res: Response) => {
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
    const id = req.params.id;
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
    const id = req.params.id;
    await new DeleteOneUserService().execute(id);
    return res.status(200).json({
      message: "User deleted successfully.",
    });
  };
}
