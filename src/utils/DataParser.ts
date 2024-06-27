import { CategoryWithID, NormalizedCategory } from "../services/categories";
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
}
