import { array, string } from "yup";

export const uuidSchema = string().required("ID required.").uuid("Invalid ID.");

export const uuidArraySchema = array().of(uuidSchema);
