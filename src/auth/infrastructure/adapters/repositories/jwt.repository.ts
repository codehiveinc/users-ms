import { JwtPayload, sign, verify } from "jsonwebtoken";
import { injectable } from "tsyringe";
import DecodedTokenModel from "../../../domain/models/decoded-token.model";
import IJWTRepository from "../../../application/ports/repositories/jwt.repository.interface";

@injectable()
class JWTRepository implements IJWTRepository {
  sign(payload: object, secretKey: string, expiresIn: string): string {
    return sign(payload, secretKey, { expiresIn });
  }

  verify(token: string, secretKey: string): boolean {
    try {
      verify(token, secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  decode(token: string, secretKey: string): DecodedTokenModel {
      const payload: JwtPayload = verify(token, secretKey) as JwtPayload;

      const decodedToken = new DecodedTokenModel(payload.uuid, payload.email, payload.exp!);

      return decodedToken;
  }
}

export default JWTRepository;
