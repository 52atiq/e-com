import Role from "../modules/roles/role.model";
import User from "../modules/users/user.model";
import RefreshToken from "../modules/refreshTokens/refreshToken.model";

// Role -> User
Role.hasMany(User, {
  foreignKey: "roleId",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
  as: "role",
});

// User -> Refresh Token
User.hasMany(RefreshToken, {
  foreignKey: "userId",
  as: "refreshTokens",
});

RefreshToken.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
