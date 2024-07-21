import { Request, Response } from "express";
import { CreateUserBodyType } from "../schemas/user.scheme";
import { plainToClass } from "class-transformer";
import CreateUserResponseDto from "../dtos/responses/create-user-response.dto";
import createBaseResponse from "../../../shared/infrastructure/utils/createBaseResponse";
import CreateUserUseCase from "../../application/use-cases/create-user.use-case";
import { injectable } from "tsyringe";
import FindUserByUuidUseCase from "../../application/use-cases/find-user-by-uuid.use-case";
import ResourceNotFoundError from "../../../shared/application/errors/resource-not-found.error";

@injectable()
class UserHandler {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByUuidUseCase: FindUserByUuidUseCase
  ) {
    this.createUserHandler = this.createUserHandler.bind(this);
    this.findByUUID = this.findByUUID.bind(this);
  }

  async createUserHandler(
    req: Request<unknown, unknown, CreateUserBodyType>,
    res: Response
  ) {
    const { firstName, lastName, email, password, cellphone } = req.body;

    try {
      const createdUser = await this.createUserUseCase.execute(
        firstName,
        lastName,
        email,
        password,
        cellphone
      );

      const createUserResponseDto = plainToClass(
        CreateUserResponseDto,
        createdUser,
        { excludeExtraneousValues: true }
      );

      const response = createBaseResponse(
        createUserResponseDto,
        "User created successfully",
        true,
        201
      );

      return res.status(response.statusCode).json(response);
    } catch (error) {
      if (error instanceof Error) {
        const response = createBaseResponse(null, error.message, false, 400);

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

  async findByUUID(req: Request, res: Response) {
    const { uuid } = req.params;

    // const userUuid = res.locals.user.uuid;

    // if (uuid !== userUuid) {
    //   const response = createBaseResponse(
    //     null,
    //     "You are not authorized to access this resource",
    //     false,
    //     403
    //   );

    //   return res.status(response.statusCode).json(response);
    // }

    try {
      const user = await this.findUserByUuidUseCase.execute(uuid);

      const getUserResponseDto = plainToClass(CreateUserResponseDto, user, {
        excludeExtraneousValues: true,
      });

      const response = createBaseResponse(
        getUserResponseDto,
        "User found",
        true,
        200
      );

      return res.status(response.statusCode).json(response);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        const response = createBaseResponse(null, error.message, false, error.statusCode);

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

export default UserHandler;
