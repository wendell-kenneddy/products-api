import { query } from "../../db";
import { uuidSchema } from "../../utils/uuidSchema";

export class DeleteOneCategoryService {
  async execute(id: string) {
    uuidSchema.validate(id);
    await query("DELETE FROM categories WHERE category_id = $1", [id]);
  }
}
