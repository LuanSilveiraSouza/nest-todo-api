export enum UserRoles {
  ADMIN = 'adm',
  CLIENT = 'client',
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRoles;
  password: string;
}
