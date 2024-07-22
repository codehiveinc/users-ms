import { Router } from "express";
import validateResource from "../../../shared/infrastructure/middlewares/validate-resource.middleware";
import { CreateUserSchema, UpdateUserSchema } from "../schemas/user.scheme";
import UserHandler from "../handlers/rest-user.handler";
import { autoInjectable } from "tsyringe";

@autoInjectable()
class UserRouter {
  private router: Router;

  constructor(private readonly userHandler: UserHandler) {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "",
      validateResource(CreateUserSchema),
      this.userHandler.createUserHandler
    );

    this.router.get("/:uuid", this.userHandler.findByUUID);

    this.router.put("/:uuid", validateResource(UpdateUserSchema), this.userHandler.updateUserHandler);
  }

  getRouter() {
    return this.router;
  }
}

export default UserRouter;
