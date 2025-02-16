import { NormalizedUser, User, UserWithID, userSchema } from ".";
import { query } from "../../db";
import { hash } from "bcrypt";

export class CreateUserService {
  async execute(data: User): Promise<UserWithID> {
    await userSchema.validate(data);
    const encryptedPassword = await this.encryptPassword(data.userPassword);
    const result = await query(
      `WITH user_insert AS (
        INSERT INTO users (user_name, user_password, user_email, user_access_level)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      ), order_insert AS (
        INSERT INTO orders (customer_id)
        VALUES ((SELECT user_id FROM user_insert))
      ) SELECT * FROM user_insert`,
      [data.userName, encryptedPassword, data.userEmail, data.userAccessLevel]
    );
    const normalizedUser = result.rows[0] as NormalizedUser;
    return {
      userID: normalizedUser.user_id,
      ...data,
      userPassword: encryptedPassword,
    };
  }

  private async encryptPassword(password: string) {
    const encryptedPassword = await hash(password, 10);
    return encryptedPassword;
  }
}
