import { CreationAttributes } from "sequelize";

import RefreshToken from "./refreshToken.model";

class RefreshTokenRepository {
  async create(payload: CreationAttributes<RefreshToken>) {
    return await RefreshToken.create(payload);
  }

  async findByToken(token: string) {
    return await RefreshToken.findOne({
      where: {
        token,
        isRevoked: false,
      },
    });
  }

  async revokeToken(token: string) {
    const refreshToken = await this.findByToken(token);

    if (!refreshToken) return null;

    return await refreshToken.update({
      isRevoked: true,
    });
  }

  async revokeAllByUser(userId: string) {
    return await RefreshToken.update(
      {
        isRevoked: true,
      },
      {
        where: {
          userId,
          isRevoked: false,
        },
      },
    );
  }

  async deleteExpired() {
    return await RefreshToken.destroy({
      where: {
        expiresAt: {
          // Op.lt পরে add করব
        },
      },
    });
  }
}

export default new RefreshTokenRepository();
