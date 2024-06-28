import { ObjectSchema, number, object, string } from "yup";
import { CategoryWithID, NormalizedCategory } from "../categories";

export interface Product {
  productName: string;
  productImageUrl?: string;
  productDescription: string;
  productPrice: number;
  productStock: number;
}

export interface ProductWithID extends Product {
  productID: string;
}

export interface NormalizedProduct {
  product_id: string;
  product_name: string;
  product_image_url?: string;
  product_description: string;
  product_price: number;
  product_stock: number;
}

export type ProductWithCategory = ProductWithID & CategoryWithID;

export type NormalizedProductWithCategory = NormalizedProduct & NormalizedCategory;

export const productSchema: ObjectSchema<Product> = object({
  productName: string().required("Product name required."),
  productImageUrl: string().optional(),
  productDescription: string().required("Product description required."),
  productPrice: number()
    .required("Product price required.")
    .positive("Product price must be positive."),
  productStock: number().required("Product stock required."),
});
