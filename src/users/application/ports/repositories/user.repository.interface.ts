import UserModel from "../../../domain/models/user.model";

interface IUserRepository {
  save(user: UserModel): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel | null>;
  findByUUID(uuid: string): Promise<UserModel | null>;
  update(uuid: string, firstName: string, lastName: string, cellphone: string): Promise<UserModel | null>;
}

export default IUserRepository;
