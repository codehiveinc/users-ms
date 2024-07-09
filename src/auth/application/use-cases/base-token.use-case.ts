import { inject, injectable } from "tsyringe";
import IUserRepository from "../../../users/application/ports/repositories/user.repository.interface";
import IEncryptRepository from "../ports/repositories/encrypt.repository.interface";
import IJWTRepository from "../ports/repositories/jwt.repository.interface";
import IRefreshTokenRepository from "../ports/repositories/refresh-token.repository.interface";
import RefreshTokenModel from "../../domain/models/refresh-token.model";

abstract class BaseTokensUseCase {
  constructor(
    @inject("UserRepository") protected readonly userRepository: IUserRepository,
    @inject("EncryptRepository") protected readonly encryptRepository: IEncryptRepository,
    @inject("JWTRepository") protected readonly jwtRepository: IJWTRepository,
    @inject("RefreshTokenRepository") protected readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  protected getEnvVariables() {
    return {
      accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET,
      refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET,
      accessTokenExpirationMs: process.env.ACCESS_TOKEN_EXPIRATION_MS,
      refreshTokenExpirationMs: process.env.REFRESH_TOKEN_EXPIRATION_MS
    };
  }

  protected generateTokens(user: any): { accessToken: string, refreshToken: string, refreshTokenModel: RefreshTokenModel } {
    const { accessTokenSecretKey, refreshTokenSecretKey, accessTokenExpirationMs, refreshTokenExpirationMs } = this.getEnvVariables();

    const payload = {
      uuid: user.uuid,
      email: user.email,
    };

    const currentDateNumber = Date.now();

    const accessToken = this.jwtRepository.sign(payload, accessTokenSecretKey, accessTokenExpirationMs);
    const refreshToken = this.jwtRepository.sign(payload, refreshTokenSecretKey, refreshTokenExpirationMs);

    const refreshTokenModel = new RefreshTokenModel(
      0,
      user.uuid,
      refreshToken,
      new Date(currentDateNumber + parseInt(refreshTokenExpirationMs)),
      new Date(),
      new Date()
    );

    return { accessToken, refreshToken, refreshTokenModel };
  }
}

export default BaseTokensUseCase;