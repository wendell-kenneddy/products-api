import { getClient } from "../../db";
import { uuidSchema } from "../../utils/uuidSchema";

export class OrderCheckoutService {
  async execute(customerID: string) {
    await uuidSchema.validate(customerID);
    const client = await getClient();

    try {
      await client.query(
        `WITH
           s_query AS (
             SELECT 
               op.product_id
             FROM orders o
             INNER JOIN order_products op ON o.order_id = op.order_id 
             WHERE o.customer_id = $1
           ),
           u_query AS (
             UPDATE products p
             SET product_stock = product_stock - 1
             FROM s_query
             WHERE p.product_id = s_query.product_id
           )
         DELETE FROM order_products op1
         WHERE op1.product_id IN (SELECT * FROM s_query)
        `,
        [customerID]
      );
    } finally {
      client.release();
    }
  }
}
