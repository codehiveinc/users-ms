import { injectable } from "tsyringe";
import SagaMessageModel from "../../../shared/domain/types/saga-message";
import UserRoutingKey from "../types/user-routing-key";
import PublishMessageUseCase from "../../../shared/application/use-cases/publish-message.use-case";
import FindUserByUuidUseCase from "../../application/use-cases/find-user-by-uuid.use-case";

type GetUserByUUIDRequestDto = {
  userUUID: string;
};

@injectable()
class EventUserHandler {
  constructor(
    private readonly findUserByUUIDUseCase: FindUserByUuidUseCase,
    private readonly publishMessageUseCase: PublishMessageUseCase
  ) {
    this.getUserByUUIDEventHandler = this.getUserByUUIDEventHandler.bind(this);
  }

  async getUserByUUIDEventHandler(message: SagaMessageModel): Promise<void> {
    const requestDto = message.data as GetUserByUUIDRequestDto;

    if (!requestDto.userUUID) {
      const response: SagaMessageModel = {
        uuid: message.uuid,
        success: false,
        data: null,
        datetime: new Date().getTime(),
      };

      await this.publishMessageUseCase.execute(
        response,
        UserRoutingKey.USERS_RESPONSE_USER_GET_UUID
      );
      return;
    }

    try {
      const user = await this.findUserByUUIDUseCase.execute(
        requestDto.userUUID
      );

      const response: SagaMessageModel = {
        uuid: message.uuid,
        success: true,
        data: user,
        datetime: new Date().getTime(),
      };

      await this.publishMessageUseCase.execute(
        response,
        UserRoutingKey.USERS_RESPONSE_USER_GET_UUID
      );
    } catch (error) {
      const response: SagaMessageModel = {
        uuid: message.uuid,
        success: false,
        data: null,
        datetime: new Date().getTime(),
      };

      await this.publishMessageUseCase.execute(
        response,
        UserRoutingKey.USERS_RESPONSE_USER_GET_UUID
      );
    }
  }
}

export default EventUserHandler;
