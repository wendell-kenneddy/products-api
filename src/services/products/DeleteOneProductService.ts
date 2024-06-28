import { query } from "../../db";
import { uuidSchema } from "../../utils/uuidSchema";

export class DeleteOneProductService {
  async execute(id: string) {
    await uuidSchema.validate(id);
    await query("DELETE FROM products WHERE product_id = $1", [id]);
  }
}
