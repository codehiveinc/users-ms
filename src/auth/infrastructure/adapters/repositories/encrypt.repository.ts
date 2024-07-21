import bycript from "bcrypt";
import { injectable } from "tsyringe";
import IEncryptRepository from "../../../application/ports/repositories/encrypt.repository.interface";

@injectable()
class EncryptRepository implements IEncryptRepository {
  async hash(password: string): Promise<string> {
    return await bycript.hash(password, 10);
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await bycript.compare(password, hashPassword);
  }
}

export default EncryptRepository;
