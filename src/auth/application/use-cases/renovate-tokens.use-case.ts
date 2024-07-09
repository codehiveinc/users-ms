import { inject, injectable } from "tsyringe";
import UnauthorizedError from "../../../shared/application/errors/unauthorized.error";
import IJWTRepository from "../ports/repositories/jwt.repository.interface";
import IRefreshTokenRepository from "../ports/repositories/refresh-token.repository.interface";
import IUserRepository from "../../../users/application/ports/repositories/user.repository.interface";
import AuthTokenModel from "../../domain/models/auth-token.model";
import IEncryptRepository from "../ports/repositories/encrypt.repository.interface";
import RefreshTokenModel from "../../domain/models/refresh-token.model";

@injectable()
class RenovateTokensUseCase {
  constructor(
    @inject("JWTRepository") private readonly jwtRepository: IJWTRepository,
    @inject("RefreshTokenRepository") private readonly refreshTokenRepository: IRefreshTokenRepository,
    @inject("UserRepository") private readonly userRepository: IUserRepository,
    @inject("EncryptRepository") private readonly encryptRepository: IEncryptRepository
  ) {}

  async execute(oldRefresh: string): Promise<AuthTokenModel> {
    const oldRefreshToken = await this.refreshTokenRepository.findByToken(
      oldRefresh
    );

    if (!oldRefreshToken) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    if (oldRefreshToken.expiresIn < new Date(Date.now())) {
      throw new UnauthorizedError("Refresh token expired");
    }

    const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET;
    const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenExpirationMs = process.env.ACCESS_TOKEN_EXPIRATION_MS;
    const refreshTokenExpirationMs = process.env.REFRESH_TOKEN_EXPIRATION_MS;

    const decodedToken = this.jwtRepository.decode(
      oldRefresh,
      refreshTokenSecretKey
    );

    const user = await this.userRepository.findByUUID(decodedToken.uuid);

    if (!user) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const payload = {
      uuid: user.uuid,
      email: user.email,
    };

    const currentDateNumber = Date.now();

    const accessToken = this.jwtRepository.sign(
      payload,
      accessTokenSecretKey,
      accessTokenExpirationMs
    );

    const refreshToken = this.jwtRepository.sign(
      payload,
      refreshTokenSecretKey,
      refreshTokenExpirationMs
    );

    const refreshTokenModel = new RefreshTokenModel(
      0,
      user.uuid,
      refreshToken,
      new Date(currentDateNumber + parseInt(refreshTokenExpirationMs)),
      new Date(),
      new Date()
    );

    await this.refreshTokenRepository.save(refreshTokenModel);

    const authToken = new AuthTokenModel(accessToken, refreshToken);

    return authToken;
  }
}

export default RenovateTokensUseCase;
