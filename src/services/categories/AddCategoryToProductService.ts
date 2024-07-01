import { query } from "../../db";
import { uuidSchema } from "../../utils/uuidSchema";

export class CreateProductCategoryService {
  async execute(productID: string, categoryID: string) {
    await uuidSchema.validate(productID);
    await uuidSchema.validate(categoryID);
    await query("INSERT INTO product_categories (product_id, category_id) VALUES ($1, $2)", [
      productID,
      categoryID,
    ]);
  }
}
