import { CategoryWithID, NormalizedCategory } from "../services/categories";
import { NormalizedProductWithIDAndQuantity, ProductWithIDAndQuantity } from "../services/orders";
import {
  NormalizedProduct,
  NormalizedProductWithCategory,
  ProductWithCategory,
  ProductWithID,
} from "../services/products";
import { NormalizedUser, UserWithID } from "../services/users";

export class DataParser {
  parseNormalizedUser({
    user_id,
    user_name,
    user_password,
    user_email,
    user_access_level,
  }: NormalizedUser): UserWithID {
    return {
      userID: user_id,
      userName: user_name,
      userPassword: user_password,
      userEmail: user_email,
      userAccessLevel: user_access_level,
    };
  }

  parseNormalizedCategory({ category_id, category_name }: NormalizedCategory): CategoryWithID {
    return {
      categoryID: category_id,
      categoryName: category_name,
    };
  }

  parseNormalizedProduct({
    product_id,
    product_name,
    product_description,
    product_image_url,
    product_price,
    product_stock,
  }: NormalizedProduct): ProductWithID {
    return {
      productID: product_id,
      productName: product_name,
      productDescription: product_description,
      productImageUrl: product_image_url,
      productPrice: product_price,
      productStock: product_stock,
    };
  }

  parseNormalizedProductWithCategory(data: NormalizedProductWithCategory): ProductWithCategory {
    return {
      productID: data.product_id,
      productName: data.product_name,
      productDescription: data.product_description,
      productImageUrl: data.product_image_url,
      productPrice: data.product_price,
      productStock: data.product_stock,
      categoryID: data.category_id,
      categoryName: data.category_name,
    };
  }

  parseNormalizedProductWithIDAndQuantity({
    product_id,
    product_name,
    product_description,
    product_image_url,
    product_price,
    product_stock,
    quantity,
  }: NormalizedProductWithIDAndQuantity): ProductWithIDAndQuantity {
    return {
      productID: product_id,
      productName: product_name,
      productDescription: product_description,
      productImageUrl: product_image_url,
      productPrice: product_price,
      productStock: product_stock,
      quantity,
    };
  }
}
