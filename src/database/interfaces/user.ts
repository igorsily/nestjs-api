export interface IUser {
  id?: number;
  firstName: string;
  lastName?: string;
  email: string;
  password?: string;
  roles?: Roles[];

  createdDate?: Date;
  updatedDate?: Date;
}

export enum Roles {
  sysAdmin = 'sysAdmin',
  admin = 'admin',
  user = 'user'
}

export function listPublicRoles(): Roles[] {
  return [Roles.admin, Roles.user];
}
