import { NormalizedFullOrderProduct, NormalizedOrder } from ".";
import { getClient } from "../../db";
import { DataParser } from "../../utils/DataParser";
import { uuidSchema } from "../../utils/uuidSchema";

export class GetOrderProductsService {
  async execute(customerID: string) {
    uuidSchema.validate(customerID);
    const client = await getClient();

    try {
      const order = await client.query<NormalizedOrder>(
        "SELECT * FROM orders WHERE customer_id = $1",
        [customerID]
      );
      if (!order.rowCount) return null;
      const fullOrderProducts = await client.query<NormalizedFullOrderProduct>(
        `SELECT
          p.product_id,
          p.product_name,
          p.product_description,
          p.product_image_url,
          p.product_price,
          p.product_stock,
          op.order_product_id
         FROM order_products op
         INNER JOIN products p ON op.product_id = p.product_id
         WHERE op.order_id = $1
        `,
        [order.rows[0].order_id]
      );

      return {
        order: DataParser.parseNormalizedOrder(order.rows[0]),
        orderProducts: fullOrderProducts.rows.map((op) =>
          DataParser.parseNormalizedFullOrderProduct(op)
        ),
      };
    } finally {
      client.release();
    }
  }
}
