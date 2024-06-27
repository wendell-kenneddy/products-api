import { NormalizedUser, UserWithID } from ".";
import { query } from "../../db";
import { DataParser } from "../../utils/DataParser";

export class GetManyUsersService {
  async execute(condition: string): Promise<UserWithID[]> {
    const result = await query(`SELECT * FROM users ${condition}`, []);
    return result.rowCount
      ? (result.rows as NormalizedUser[]).map((u) => new DataParser().parseNormalizedUser(u))
      : [];
  }
}
