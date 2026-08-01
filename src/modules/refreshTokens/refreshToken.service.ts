import refreshTokenRepository from "./refreshToken.repository";

class RefreshTokenService {
  async save(userId: string, token: string, expiresAt: Date) {
    return await refreshTokenRepository.create({
      userId,
      token,
      expiresAt,
    });
  }

  async find(token: string) {
    return await refreshTokenRepository.findByToken(token);
  }

  async revoke(token: string) {
    return await refreshTokenRepository.revokeToken(token);
  }

  async revokeAll(userId: string) {
    return await refreshTokenRepository.revokeAllByUser(userId);
  }
}

export default new RefreshTokenService();
