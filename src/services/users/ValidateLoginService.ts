import { compare } from "bcrypt";
import { LoginData, NormalizedUser, userLoginSchema } from ".";
import { query } from "../../db";
import { DataParser } from "../../utils/DataParser";

export class ValidateLoginService {
  async execute(data: LoginData) {
    await userLoginSchema.validate(data);
    const result = await query("SELECT * FROM users WHERE user_email = $1", [data.userEmail]);

    if (!result.rowCount) throw new Error("Invalid email or password.");
    const dbUser: NormalizedUser = result.rows[0];
    const isValidPassword = await compare(data.userPassword, dbUser.user_password);
    if (!isValidPassword) throw new Error("Invalid email or password.");

    return new DataParser().parseNormalizedUser(dbUser);
  }
}
