export enum RoleName {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export interface IRole {
  id: string;
  name: RoleName;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateRole {
  name: RoleName;
  description?: string;
}

export interface IUpdateRole {
  name?: RoleName;
  description?: string;
}
