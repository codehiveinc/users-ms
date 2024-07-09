import { inject, injectable } from "tsyringe";
import AuthTokenModel from "../../domain/models/auth-token.model";
import UnauthorizedError from "../../../shared/application/errors/unauthorized.error";
import IEncryptRepository from "../ports/repositories/encrypt.repository.interface";
import IJWTRepository from "../ports/repositories/jwt.repository.interface";
import IUserRepository from "../../../users/application/ports/repositories/user.repository.interface";
import IRefreshTokenRepository from "../ports/repositories/refresh-token.repository.interface";
import RefreshTokenModel from "../../domain/models/refresh-token.model";

@injectable()
class CreateTokensUseCase {
  constructor(
    @inject("UserRepository") private readonly userRepository: IUserRepository,
    @inject("EncryptRepository") private readonly encryptRepository: IEncryptRepository,
    @inject("JWTRepository") private readonly jwtRepository: IJWTRepository,
    @inject("RefreshTokenRepository") private readonly refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(email: string, password: string): Promise<AuthTokenModel> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Email or password is incorrect");
    }

    const isPasswordValid = await this.encryptRepository.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError("Email or password is incorrect");
    }

    const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET;
    const accessTokenExpirationMs = process.env.ACCESS_TOKEN_EXPIRATION_MS;
    const refreshTokenExpirationMs = process.env.REFRESH_TOKEN_EXPIRATION_MS;

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

export default CreateTokensUseCase;
