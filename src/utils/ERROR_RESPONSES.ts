type ErrorResponses = Record<string, [number, string]>;

export const ERROR_RESPONSES: ErrorResponses = {
  "invalid token": [401, "Invalid Access/Refresh Token(s) provided."],
  "jwt malformed": [401, "Invalid Access/Refresh Token(s) provided."],
  "jwt expired": [401, "Access/Refresh token expired."],
  "unauthenticated access": [401, "Unauthenticated access denied."],
  "forbidden access": [403, "Unauthorized acess denied."],
  "unauthenticated only": [401, "User already signed in."],
  "login fail": [400, "Invalid email or password."],
  'new row for relation "products" violates check constraint "products_product_stock_check"': [
    500,
    "One or more product(s) contained in the order are currently not in stock.",
  ],
  'duplicate key value violates unique constraint "users_user_email_key"': [
    400,
    "User with provided email already exists.",
  ],
  'insert or update on table "product_categories" violates foreign key constraint "product_categories_category_id_fkey"':
    [400, "Invalid category ID(s) provided."],
};
