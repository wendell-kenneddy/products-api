import { query } from "../../db";
import { uuidSchema } from "../../utils/uuidSchema";

export class DeleteOneUserService {
  async execute(id: string) {
    await uuidSchema.validate(id);
    await query("DELETE FROM users WHERE user_id = $1", [id]);
  }
}
