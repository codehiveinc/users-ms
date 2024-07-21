import { injectable } from "tsyringe";
import { prisma } from "../../../../shared/infrastructure/prisma";
import IRefreshTokenRepository from "../../../application/ports/repositories/refresh-token.repository.interface";
import RefreshTokenModel from "../../../domain/models/refresh-token.model";

@injectable()
class RefreshTokenRepository implements IRefreshTokenRepository {
  async findByToken(token: string): Promise<RefreshTokenModel | null> {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        token,
      },
    });

    if (!refreshToken) {
      return null;
    }

    return new RefreshTokenModel(
      refreshToken.id,
      refreshToken.userUUID,
      refreshToken.token,
      refreshToken.expiresIn,
      refreshToken.createdAt,
      refreshToken.updatedAt
    );
  }

  async save(refreshTokenModel: RefreshTokenModel): Promise<RefreshTokenModel> {
    const refreshToken = await prisma.refreshToken.create({
      data: {
        userUUID: refreshTokenModel.userUUID,
        token: refreshTokenModel.token,
        expiresIn: refreshTokenModel.expiresIn,
      },
    });

    return new RefreshTokenModel(
      refreshToken.id,
      refreshToken.userUUID,
      refreshToken.token,
      refreshToken.expiresIn,
      refreshToken.createdAt,
      refreshToken.updatedAt
    );
  }
}

export default RefreshTokenRepository;
