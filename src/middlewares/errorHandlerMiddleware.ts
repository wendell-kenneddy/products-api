import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";

export function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  let message = "Something went wrong.";

  if (err instanceof ValidationError || err instanceof Error) {
    err.message ==
    'new row for relation "products" violates check constraint "products_product_stock_check"'
      ? (message = "One or more product(s) contained in the order are currently not in stock.")
      : (message = err.message);
  }

  return res.status(500).json({ message });
}
