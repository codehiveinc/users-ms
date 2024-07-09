import { inject, injectable } from "tsyringe";
import UserModel from "../../domain/models/user.model";
import { v4 as uuidV4 } from "uuid";
import IEncryptRepository from "../../../auth/application/ports/repositories/encrypt.repository.interface";
import IUserRepository from "../ports/repositories/user.repository.interface";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository") private readonly userRepository: IUserRepository,
    @inject("EncryptRepository") private readonly encryptRepository: IEncryptRepository
  ) {}

  async execute(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    cellphone: string
  ): Promise<UserModel> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await this.encryptRepository.hash(password);

    const user = new UserModel(
      0,
      firstName,
      lastName,
      email,
      hashedPassword,
      cellphone,
      uuidV4(),
      new Date(),
      new Date()
    );

    return await this.userRepository.save(user);
  }
}

export default CreateUserUseCase;
