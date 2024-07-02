import { query } from "../../db";
import { uuidSchema } from "../../utils/uuidSchema";

export class DeleteOrderProductService {
  async execute(customerID: string, orderProductID: string) {
    uuidSchema.validate(orderProductID);
    uuidSchema.validate(customerID);
    await query(
      `WITH o_query AS (SELECT order_id FROM orders o WHERE o.customer_id = $1)
       DELETE FROM order_products op
       WHERE op.order_id = (SELECT order_id FROM o_query)
       AND op.order_product_id = $2
      `,
      [customerID, orderProductID]
    );
  }
}
