import { NormalizedUser, UserWithID } from ".";
import { query } from "../../db";
import { DataParser } from "../../utils/DataParser";
import { uuidSchema } from "../../utils/uuidSchema";

export class GetOneUserService {
  async execute(id: string) {
    await uuidSchema.validate(id);
    const result = await query(`SELECT * FROM users WHERE user_id = $1`, [id]);
    let userWithID: UserWithID | null = null;

    if (result.rowCount) {
      const normalizedUser = result.rows[0] as NormalizedUser;
      userWithID = new DataParser().parseNormalizedUser(normalizedUser);
    }

    return userWithID;
  }
}
