import DecodedTokenModel from "../../../domain/models/decoded-token.model";

interface IJWTRepository {
  sign(payload: object, secretKey: string, expiresIn: string): string;
  verify(token: string, secretKey: string): boolean;
  decode(token: string, secretKey: string): DecodedTokenModel;
}

export default IJWTRepository;
