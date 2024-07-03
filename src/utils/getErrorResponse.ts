import { ValidationError } from "yup";

type ErrorResponses = Record<string, [number, string]>;

const ERROR_RESPONSES: ErrorResponses = {
  "invalid token": [401, "Invalid Access/Refresh Token(s) provided."],
  "jwt malformed": [401, "Invalid Access/Refresh Token(s) provided."],
  "jwt expired": [401, "Access/Refresh token expired."],
  "unauthenticated access": [401, "Unauthenticated acess denied."],
  "forbidden access": [403, "Unauthorized acess denied."],
  "login fail": [400, "Invalid email or password."],
  'new row for relation "products" violates check constraint "products_product_stock_check"': [
    500,
    "One or more product(s) contained in the order are currently not in stock.",
  ],
  'duplicate key value violates unique constraint "users_user_email_key"': [
    400,
    "User with provided email already exists.",
  ],
};

export function getErrorResponse(err: Error) {
  let message = "Server error.";
  let status = 500;

  if (err instanceof ValidationError) {
    message = err.message;
    status = 400;
  } else if (ERROR_RESPONSES[err.message]) {
    message = ERROR_RESPONSES[err.message][1];
    status = ERROR_RESPONSES[err.message][0];
  }

  return { status, message };
}
