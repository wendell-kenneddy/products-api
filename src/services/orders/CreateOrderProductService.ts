import { OrderProduct } from ".";
import { query } from "../../db";
import { uuidSchema } from "../../utils/uuidSchema";

export class CreateOrderProductService {
  async execute(customerID: string, productID: OrderProduct) {
    await uuidSchema.validate(customerID);
    await uuidSchema.validate(productID);
    await query(
      `WITH order_select AS
         (SELECT * FROM orders WHERE customer_id = $1)
       INSERT INTO order_products (order_id, product_id) VALUES
       ((SELECT order_id FROM order_select), $2)`,
      [customerID, productID]
    );
  }
}
