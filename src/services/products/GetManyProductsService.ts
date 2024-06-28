import { ProductWithID } from ".";
import { query } from "../../db";
import { DataParser } from "../../utils/DataParser";
import { uuidSchema } from "../../utils/uuidSchema";

export class GetManyProductsService {
  async execute(condition: string, categoryID?: string): Promise<ProductWithID[]> {
    const data = categoryID
      ? this.getManyProductsByCategory(condition, categoryID)
      : this.getManyProducts(condition);
    return data;
  }

  private async getManyProducts(condition: string) {
    const result = await query(`SELECT * FROM products ${condition}`, []);
    return result.rows.map((p) => new DataParser().parseNormalizedProduct(p));
  }

  private async getManyProductsByCategory(condition: string, categoryID: string) {
    uuidSchema.validate(categoryID);
    const parser = new DataParser();
    const result = await query(
      `SELECT
         p.product_id,
         p.product_name,
         p.product_description,
         p.product_image_url,
         p.product_price,
         p.product_stock   
       FROM product_categories pc
       INNER JOIN products p ON p.product_id = pc.product_id
       WHERE pc.category_id = $1
       ${condition}`,
      [categoryID]
    );
    return result.rows.map((p) => parser.parseNormalizedProduct(p));
  }
}
