import { injectable } from "tsyringe";
import { prisma } from "../../../../shared/infrastructure/prisma";
import UserModel from "../../../domain/models/user.model";
import IUserRepository from "../../../application/ports/repositories/user.repository.interface";

@injectable()
class UserRepository implements IUserRepository {
  async save(user: UserModel): Promise<UserModel> {
    const createdUser = await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        cellphone: user.cellphone,
        uuid: user.uuid,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return new UserModel(
      createdUser.id,
      createdUser.firstName,
      createdUser.lastName,
      createdUser.email,
      createdUser.password,
      createdUser.cellphone,
      createdUser.uuid,
      createdUser.createdAt,
      createdUser.updatedAt
    );
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return new UserModel(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.cellphone,
      user.uuid,
      user.createdAt,
      user.updatedAt
    );
  }

  async findByUUID(uuid: string): Promise<UserModel | null> {
    const user = await prisma.user.findUnique({
      where: {
        uuid,
      }
    });

    if (!user) {
      return null;
    }

    return new UserModel(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.cellphone,
      user.uuid,
      user.createdAt,
      user.updatedAt
    );
  }
}

export default UserRepository;
