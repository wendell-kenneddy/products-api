import { CategoryWithID } from ".";
import { query } from "../../db";
import { DataParser } from "../../utils/DataParser";

export class GetManyCategoriesService {
  async execute(condition: string): Promise<CategoryWithID[]> {
    const result = await query(`SELECT * FROM categories ${condition}`, []);
    const categories: CategoryWithID[] = result.rows.map((c) =>
      DataParser.parseNormalizedCategory(c)
    );
    return categories;
  }
}
