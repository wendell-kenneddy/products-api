import { ObjectSchema, object, string } from "yup";
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
}

export interface NormalizedOrderProduct {
  order_id: string;
  product_id: string;
}

export interface OrderProductWithID extends OrderProduct {
  orderID: string;
}

export interface NormalizedFullOrderProduct extends NormalizedProduct {
  order_product_id: string;
}

export interface FullOrderProduct extends ProductWithID {
  orderProductID: string;
}

export const orderProductSchema: ObjectSchema<OrderProduct> = object({
  productID: string().required("Product ID required.").uuid("Invalid product ID."),
});
