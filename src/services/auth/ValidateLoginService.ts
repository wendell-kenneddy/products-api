import { compare } from "bcrypt";
import { LoginData, NormalizedUser, userLoginSchema } from "../users";
import { query } from "../../db";
import { DataParser } from "../../utils/DataParser";

export class ValidateLoginService {
  async execute(data: LoginData) {
    await userLoginSchema.validate(data);
    const result = await query("SELECT * FROM users WHERE user_email = $1", [data.userEmail]);

    if (!result.rowCount) throw new Error("login fail");
    const dbUser: NormalizedUser = result.rows[0];
    const isValidPassword = await compare(data.userPassword, dbUser.user_password);
    if (!isValidPassword) throw new Error("login fail");

    return DataParser.parseNormalizedUser(dbUser);
  }
}
