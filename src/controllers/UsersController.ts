import { hash } from "bcrypt";
import { Request, Response } from "express";
import { InferType, ObjectSchema, number, object, string } from "yup";
import { AccessLevel, User, UsersRepository } from "../repositories/UsersRepository";

const userSchema: ObjectSchema<User> = object({
  name: string().required("Name required."),
  password: string()
    .required("Password required.")
    .min(8, "Password must be at least 8 characters long."),
  email: string().required("E-mail required.").email("Invalid e-mail."),
  accessLevel: number<AccessLevel>().required("Invalid access level."),
});

const queryPageSchema = object({
  pageSize: number()
    .required("Page size required.")
    .integer("Page size must be an integer.")
    .min(1, "Page size must be greater than 1.")
    .max(10, "Page size must be equal to or lower than 10"),
  offset: number()
    .required("Offset required.")
    .integer("Offset must be an integer.")
    .min(0, "Offset must be equal to or greater than 0."),
});

const uuidSchema = string().required("ID required.").uuid("Invalid ID.");

export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  create = async (req: Request, res: Response) => {
    const user = req.body;
    await userSchema.validate(user);
    const encryptedPassword = await hash(user.password, 10);
    const userWithID = await this.usersRepository.create({ ...user, password: encryptedPassword });
    return res.status(200).json({ data: userWithID });
  };

  getOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    await uuidSchema.validate(id);
    const user = await this.usersRepository.getOne(id);
    return res.status(200).json({ data: user });
  };

  getMany = async (req: Request, res: Response) => {
    const queryPage: InferType<typeof queryPageSchema> = req.body;
    await queryPageSchema.validate(queryPage);
    const condition = `LIMIT ${queryPage.pageSize} OFFSET ${queryPage.offset}`;
    const page = await this.usersRepository.getMany(condition);
    return res.status(200).json({ data: page });
  };

  deleteOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    await uuidSchema.validate(id);
    await this.usersRepository.deleteOne(id);
    return res.status(200).json({ message: "User deleted successfully." });
  };

  updateOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    await uuidSchema.validate(id);
    await userSchema.validate(data);
    const updatedUser = await this.usersRepository.updateOne({ id, ...data });
    return res.status(200).json({ data: updatedUser });
  };
}
