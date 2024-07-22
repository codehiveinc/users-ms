import { inject, injectable } from "tsyringe";
import IUserRepository from "../ports/repositories/user.repository.interface";
import UserModel from "../../domain/models/user.model";
import ResourceNotFoundError from "../../../shared/application/errors/resource-not-found.error";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UserRepository") private readonly userRepository: IUserRepository
  ) {}

  async execute(
    userId: string,
    firstName: string,
    lastName: string,
    cellphone: string
  ): Promise<UserModel> {
    const user = await this.userRepository.update(
      userId,
      firstName,
      lastName,
      cellphone
    );

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }

    return user;
  }
}

export default UpdateUserUseCase;
