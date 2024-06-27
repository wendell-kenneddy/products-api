import { ObjectSchema, number, object, string } from "yup";

export type AccessLevel = 1 | 2 | 3;

export interface User {
  userName: string;
  userPassword: string;
  userEmail: string;
  userAccessLevel: AccessLevel;
}

export interface UserWithID extends User {
  userID: string;
}

export interface NormalizedUser {
  user_id: string;
  user_name: string;
  user_password: string;
  user_email: string;
  user_access_level: AccessLevel;
}

export const userSchema: ObjectSchema<User> = object({
  userName: string().required("Name required."),
  userPassword: string()
    .required("Password required.")
    .min(8, "Password must be at least 8 characters long."),
  userEmail: string().required("E-mail required.").email("Invalid e-mail."),
  userAccessLevel: number<AccessLevel>().required("Invalid access level."),
});
