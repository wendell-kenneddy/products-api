import { ProductWithID, productSchema } from ".";
import { query } from "../../db";
import { uuidSchema } from "../../utils/uuidSchema";

export class UpdateProductService {
  async execute({
    productID,
    productName,
    productDescription,
    productImageUrl,
    productPrice,
    productStock,
  }: ProductWithID) {
    await uuidSchema.validate(productID);
    await productSchema.validate({
      productName,
      productDescription,
      productImageUrl,
      productPrice,
      productStock,
    });
    await query(
      `UPDATE products SET 
         (product_name, product_description, product_image_url, product_price, product_stock)
       = ($2, $3, $4, $5, $6) WHERE product_id = $1`,
      [productID, productName, productDescription, productImageUrl, productPrice, productStock]
    );
  }
}
