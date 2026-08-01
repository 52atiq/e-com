import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

import { sequelize } from "../../config/database";

class RefreshToken extends Model<
InferAttributes<RefreshToken>,
InferCreationAttributes<RefreshToken>
> {
  declare id: CreationOptional<string>;

  declare userId: string;

  declare token: string;

  declare expiresAt: Date;

  declare isRevoked: CreationOptional<boolean>;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    userId: {
      field: "user_id",
      type: DataTypes.UUID,
      allowNull: false,
    },

    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    expiresAt: {
      field: "expires_at",
      type: DataTypes.DATE,
      allowNull: false,
    },

    isRevoked: {
      field: "is_revoked",
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
    },

    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "refresh_tokens",
    modelName: "RefreshToken",
    timestamps: true,
    underscored: true,
  },
);

export default RefreshToken;
