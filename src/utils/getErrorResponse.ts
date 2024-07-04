import { ValidationError } from "yup";
import { ERROR_RESPONSES } from "./ERROR_RESPONSES";

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
