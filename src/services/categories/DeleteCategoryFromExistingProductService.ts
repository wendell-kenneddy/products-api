import { query } from "../../db";
import { uuidSchema } from "../../utils/uuidSchema";

export class DeleteCategoryFromExistingProductService {
  async execute(productID: string, categoryID: string) {
    await uuidSchema.validate(productID);
    await uuidSchema.validate(categoryID);
    await query(
      `DELETE FROM product_categories
       WHERE product_id = $1
       AND category_id = $2
      `,
      [productID, categoryID]
    );
  }
}
