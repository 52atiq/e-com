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
