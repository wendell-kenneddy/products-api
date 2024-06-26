import { query } from "../db";
import { UnormalizedUser, User, UserWithID, UsersRepository } from "./UsersRepository";

export class PostgresUsersRepository implements UsersRepository {
  async create({ name, password, email, accessLevel }: User): Promise<UserWithID> {
    const result = await query(
      `INSERT INTO users (name, password, email, access_level) VALUES (
        $1,
        $2,
        $3,
        $4
      ) RETURNING *`,
      [name, password, email, accessLevel]
    );
    const unormalizedUser = result.rows[0] as UnormalizedUser;
    return {
      id: unormalizedUser.id,
      name,
      password,
      email,
      accessLevel: unormalizedUser.access_level,
    };
  }

  async getOne(id: string) {
    const result = await query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] as UserWithID;
  }

  async getMany(condition: string): Promise<UserWithID[]> {
    const result = await query(`SELECT * FROM users ${condition}`, []);
    const users = result.rows as UnormalizedUser[];
    return users.map(({ id, name, password, email, access_level }: UnormalizedUser) => ({
      id,
      name,
      password,
      email,
      accessLevel: access_level,
    }));
  }

  async deleteOne(id: string) {
    await query("DELETE FROM users WHERE id = $1", [id]);
  }

  async updateOne({ name, password, email, accessLevel }: UserWithID): Promise<UserWithID> {
    const updatedUser = await query(
      `UPDATE users SET (name, password, email, access_level) = (
        $1,
        $2,
        $3,
        $4
      ) RETURNING *`,
      [name, password, email, accessLevel]
    );
    return updatedUser.rows[0] as UserWithID;
  }
}
