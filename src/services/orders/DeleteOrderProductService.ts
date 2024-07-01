import { query } from "../../db";
import { uuidSchema } from "../../utils/uuidSchema";

export class DeleteOrderProductService {
  async execute(orderProductID: string) {
    uuidSchema.validate(orderProductID);
    await query("DELETE FROM order_products WHERE order_product_id = $1", [orderProductID]);
  }
}
