import { ProductWithID } from ".";
import { getClient } from "../../db";
import { DataParser } from "../../utils/DataParser";
import { uuidSchema } from "../../utils/uuidSchema";
import { CategoryWithID } from "../categories";

export class GetOneProductService {
  async execute(id: string) {
    await uuidSchema.validate(id);
    const client = await getClient();
    let data: { product: ProductWithID; categories: CategoryWithID[] } | {} = {};

    // no catch block so it gets handled by the error handler middleware
    try {
      const productQuery = await client.query("SELECT * FROM products WHERE product_id = $1", [id]);

      if (productQuery.rowCount) {
        const categoriesQuery = await client.query(
          `SELECT 
             c.category_id,
             c.category_name
           FROM product_categories pc
           INNER JOIN categories c ON pc.category_id = c.category_id
           WHERE pc.product_id = $1
        `,
          [id]
        );
        const productWithID = DataParser.parseNormalizedProduct(productQuery.rows[0]);
        const categoriesWithID = categoriesQuery.rows.map((c) =>
          DataParser.parseNormalizedCategory(c)
        );
        data = { product: productWithID, categories: categoriesWithID };
      }
    } finally {
      client.release();
    }

    return { ...data };
  }
}
