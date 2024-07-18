import { autoInjectable } from "tsyringe";
import ConsumeMessageUseCase from "../../../shared/application/use-cases/consume-message.use-case";
import UserQueue from "../types/user-queue";
import EventUserHandler from "../handlers/event-user.handler";

@autoInjectable()
class UserEvents {
  constructor(
    private readonly consumeMessageUseCase: ConsumeMessageUseCase,
    private readonly eventUserHandler: EventUserHandler
  ) {}

  initializeEvents() {
    this.consumeMessageUseCase.execute(
      this.eventUserHandler.getUserByUUIDEventHandler,
      UserQueue.GET_USER_BY_UUID
    );
  }
}

export default UserEvents;
