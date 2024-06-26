export type AccessLevel = 1 | 2 | 3;

export interface User {
  name: string;
  password: string;
  email: string;
  accessLevel: AccessLevel;
}

export interface UserWithID extends User {
  id: string;
}

export interface UnormalizedUser extends Omit<UserWithID, "accessLevel"> {
  access_level: AccessLevel;
}

export abstract class UsersRepository {
  abstract create(user: User): Promise<UserWithID>;
  abstract getOne(id: string): Promise<UserWithID>;
  abstract getMany(condition: string): Promise<UserWithID[]>;
  abstract deleteOne(id: string): Promise<void>;
  abstract updateOne(data: UserWithID): Promise<UserWithID>;
}
