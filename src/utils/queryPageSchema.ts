import { InferType, number, object } from "yup";

export const queryPageSchema = object({
  pageSize: number()
    .required("Page size required.")
    .integer("Page size must be an integer.")
    .min(1, "Page size must be greater than 1.")
    .max(10, "Page size must be equal to or lower than 10"),
  offset: number()
    .required("Offset required.")
    .integer("Offset must be an integer.")
    .min(0, "Offset must be equal to or greater than 0."),
});

export type QueryPage = InferType<typeof queryPageSchema>;
