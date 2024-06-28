import { ObjectSchema, number, object, string } from "yup";
import { NormalizedProduct, ProductWithID } from "../products";

export interface OrderWithID {
  orderID: string;
  customerID: string;
}

export interface NormalizedOrder {
  order_id: string;
  customer_id: string;
}

export interface OrderProduct {
  productID: string;
  quantity: number;
}

export interface NormalizedOrderProduct {
  order_id: string;
  product_id: string;
  quantity: number;
}

export interface OrderProductWithID extends OrderProduct {
  orderID: string;
}

export interface NormalizedProductWithIDAndQuantity extends NormalizedProduct {
  quantity: number;
}

export interface ProductWithIDAndQuantity extends ProductWithID {
  quantity: number;
}

export const orderProductSchema: ObjectSchema<OrderProduct> = object({
  productID: string().required("Product ID required.").uuid("Invalid product ID."),
  quantity: number().required("Product quantity required.").min(1),
});
