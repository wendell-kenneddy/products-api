import { ObjectSchema, object, string, array } from "yup";

export interface Category {
  categoryName: string;
}

export interface CategoryWithID extends Category {
  categoryID: string;
}

export interface NormalizedCategory {
  category_id: string;
  category_name: string;
}

export const categorySchema: ObjectSchema<Category> = object({
  categoryName: string().required("Category name required."),
});
