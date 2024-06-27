import { Category, CategoryWithID, NormalizedCategory, categorySchema } from ".";
import { query } from "../../db";

export class CreateCategoryService {
  async execute(data: Category): Promise<CategoryWithID> {
    await categorySchema.validate(data);
    const result = await query("INSERT INTO categories (category_name) VALUES ($1) RETURNING *", [
      data.categoryName,
    ]);
    const { category_id }: NormalizedCategory = result.rows[0];
    return {
      categoryID: category_id,
      categoryName: data.categoryName,
    };
  }
}
