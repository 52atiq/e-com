import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "sequelize";

import { sequelize } from "../../config/database";
import { Gender, UserStatus } from "./user.types";
import Role from "../roles/role.model";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;

  declare roleId: string;
  declare role?: NonAttribute<Role>;
  declare firstName: string;

  declare lastName: string;

  declare email: string;

  declare phone: CreationOptional<string>;

  declare password: string;

  declare avatar: CreationOptional<string>;

  declare gender: CreationOptional<Gender>;

  declare status: CreationOptional<UserStatus>;

  declare isVerified: CreationOptional<boolean>;

  declare lastLogin: CreationOptional<Date>;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

  declare deletedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    roleId: {
      field: "role_id",
      type: DataTypes.UUID,
      allowNull: false,
    },

    firstName: {
      field: "first_name",
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      field: "last_name",
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    phone: {
      type: DataTypes.STRING,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    avatar: {
      type: DataTypes.STRING,
    },

    gender: {
      type: DataTypes.ENUM(Gender.MALE, Gender.FEMALE, Gender.OTHER),
    },

    status: {
      type: DataTypes.ENUM(
        UserStatus.ACTIVE,
        UserStatus.INACTIVE,
        UserStatus.BLOCKED,
      ),
      defaultValue: UserStatus.ACTIVE,
    },

    isVerified: {
      field: "is_verified",
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    lastLogin: {
      field: "last_login",
      type: DataTypes.DATE,
    },

    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
    },

    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
    },

    deletedAt: {
      field: "deleted_at",
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
    timestamps: true,
    paranoid: true,
    underscored: true,
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },

    scopes: {
      withPassword: {
        attributes: {
          include: ["password"],
        },
      },
    },
  },
);

export default User;
