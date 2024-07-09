import { NextFunction, Request, Response } from "express";
import createBaseResponse from "../utils/createBaseResponse";
import { container } from "tsyringe";
import JWTRepository from "../../../auth/infrastructure/adapters/repositoreis/jwt.repository";
import UserRepository from "../../../users/infrastructure/adapters/repositories/user.repository";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    const response = createBaseResponse(
      null,
      "Required access token",
      false,
      401
    );

    return res.status(response.statusCode).json(response);
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const jwtRepository = container.resolve(JWTRepository);

  const isTokenValid = jwtRepository.verify(accessToken, accessTokenSecret);

  if (!isTokenValid) {
    const response = createBaseResponse(
      null,
      "Invalid access token",
      false,
      401
    );

    return res.status(response.statusCode).json(response);
  }

  const decodedToken = jwtRepository.decode(accessToken, accessTokenSecret);

  const userRepository = container.resolve(UserRepository);

  const user = await userRepository.findByUUID(decodedToken.uuid);

  if (!user) {
    const response = createBaseResponse(
      null,
      "Invalid access token",
      false,
      401
    );

    return res.status(response.statusCode).json(response);
  }

  res.locals.user = user;

  next();
};
