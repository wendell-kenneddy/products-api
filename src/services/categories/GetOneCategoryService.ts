import { CategoryWithID } from ".";
import { query } from "../../db";
import { DataParser } from "../../utils/DataParser";
import { uuidSchema } from "../../utils/uuidSchema";

export class GetOneCategoryService {
  async execute(id: string): Promise<CategoryWithID | null> {
    await uuidSchema.validate(id);
    const result = await query("SELECT * FROM categories WHERE category_id = $1", [id]);

    if (!result.rowCount) return null;
    return new DataParser().parseNormalizedCategory(result.rows[0]);
  }
}
