import { Product, productSchema } from ".";
import { uuidArraySchema } from "../../utils/uuidSchema";
import { query } from "../../db";
import { InferType, array, object, string } from "yup";

const requestDataSchema = object({
  productData: productSchema,
  categoryIDs: array().of(string().required("ID required.").uuid("Invalid ID.")),
});

export class CreateOneProductService {
  async execute(data: InferType<typeof requestDataSchema>) {
    await requestDataSchema.validate(data);
    let productID = "";

    if (data.categoryIDs && data.categoryIDs.length) {
      await uuidArraySchema.validate(data.categoryIDs);
      productID = await this.insertWithCategories(data.productData, data.categoryIDs);
    } else {
      productID = await this.insertWithoutCategories(data.productData);
    }

    return productID;
  }

  private async insertWithCategories(productData: Product, categoryIDs: string[]): Promise<string> {
    const productCategories = this.generateProductCategories(categoryIDs);
    const result = await query(
      `WITH product_insert AS (
        INSERT INTO products (
          product_name,
          product_image_url,
          product_description,
          product_price,
          product_stock
        ) VALUES ($1, $2, $3, $4, $5) RETURNING product_id) 
      INSERT INTO product_categories (product_id, category_id) VALUES ${productCategories}
      RETURNING (SELECT product_id FROM product_insert)`,
      [
        productData.productName,
        productData.productImageUrl,
        productData.productDescription,
        productData.productPrice,
        productData.productStock,
      ]
    );
    return result.rows[0].product_id as string;
  }

  private async insertWithoutCategories(productData: Product): Promise<string> {
    const result = await query(
      `INSERT INTO products (
          product_name,
          product_image_url,
          product_description,
          product_price,
          product_stock
        ) VALUES ($1, $2, $3, $4, $5) RETURNING product_id`,
      [
        productData.productName,
        productData.productImageUrl,
        productData.productDescription,
        productData.productPrice,
        productData.productStock,
      ]
    );
    return result.rows[0] as string;
  }

  private generateProductCategories(categoryIDs: string[]) {
    const insertArray = categoryIDs.map((c) => `((SELECT product_id FROM product_insert), '${c}')`);
    return insertArray.join(",");
  }
}
