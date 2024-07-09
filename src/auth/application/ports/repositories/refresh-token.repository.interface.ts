import RefreshTokenModel from "../../../domain/models/refresh-token.model";

interface IRefreshTokenRepository {
  save(refreshTokenModel: RefreshTokenModel): Promise<RefreshTokenModel>;
  findByToken(token: string): Promise<RefreshTokenModel | null>;
}

export default IRefreshTokenRepository;
