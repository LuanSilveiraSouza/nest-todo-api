export enum UserRoles {
  ADMIN = 'adm',
  CLIENT = 'client',
}

export interface User {
  name: string;
  email: string;
  role: UserRoles;
  password: string;
}
