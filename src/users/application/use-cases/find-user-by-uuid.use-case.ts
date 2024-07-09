import { inject, injectable } from "tsyringe";
import IUserRepository from "../ports/repositories/user.repository.interface";
import ResourceNotFoundError from "../../../shared/application/errors/resource-not-found.error";

@injectable()
class FindUserByUuidUseCase {
  constructor(@inject('UserRepository') private readonly userRepository: IUserRepository) {}

  async execute(uuid: string) {
    const user = await this.userRepository.findByUUID(uuid);

    if (!user) {
      throw new ResourceNotFoundError("User not found");
    }

    return user;
  }
}

export default FindUserByUuidUseCase;
