import { plainToClass } from "class-transformer";
import { CreateTokenType, RefreshTokenType } from "./../schemas/auth.schema";
import { Request, Response } from "express";
import CreateTokensResponseDto from "../dtos/responses/create-tokens-response.dto";
import createBaseResponse from "../../../shared/infrastructure/utils/createBaseResponse";
import CreateTokensUseCase from "../../application/use-cases/create-tokens.use-case";
import { injectable } from "tsyringe";
import UnauthorizedError from "../../../shared/application/errors/unauthorized.error";
import RenovateTokensUseCase from "../../application/use-cases/renovate-tokens.use-case";

@injectable()
class AuthHandler {
  constructor(
    private readonly createTokensUseCase: CreateTokensUseCase,
    private readonly renovateTokensUseCase: RenovateTokensUseCase
  ) {
    this.createAuthTokenHandler = this.createAuthTokenHandler.bind(this);
    this.renovateTokensHandler = this.renovateTokensHandler.bind(this);
  }

  async createAuthTokenHandler(
    req: Request<unknown, unknown, CreateTokenType>,
    res: Response
  ) {
    const { email, password } = req.body;

    try {
      const authToken = await this.createTokensUseCase.execute(email, password);

      const createTokensResponse = plainToClass(
        CreateTokensResponseDto,
        authToken,
        { excludeExtraneousValues: true }
      );

      const response = createBaseResponse(
        createTokensResponse,
        "Tokens created successfully",
        true,
        201
      );

      return res.status(response.statusCode).json(response);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        const response = createBaseResponse(
          null,
          error.message,
          false,
          error.statusCode
        );

        return res.status(response.statusCode).json(response);
      }

      const response = createBaseResponse(
        null,
        "Internal server error",
        false,
        500
      );

      return res.status(response.statusCode).json(response);
    }
  }

  async renovateTokensHandler(
    req: Request<unknown, unknown, RefreshTokenType>,
    res: Response
  ) {
    const { refresh } = req.body;

    try {
      const authToken = await this.renovateTokensUseCase.execute(refresh);

      const response = createBaseResponse(
        authToken,
        "Tokens renovated successfully",
        true,
        201
      );

      return res.status(response.statusCode).json(response);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        const response = createBaseResponse(
          null,
          error.message,
          false,
          error.statusCode
        );

        return res.status(response.statusCode).json(response);
      }

      const response = createBaseResponse(
        null,
        "Internal server error",
        false,
        500
      );

      return res.status(response.statusCode).json(response);
    }
  }
}

export default AuthHandler;
