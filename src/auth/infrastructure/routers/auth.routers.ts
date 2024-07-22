import { Router } from "express";
import validateResource from "../../../shared/infrastructure/middlewares/validate-resource.middleware";
import { CreateTokenSchema, RefreshTokenSchema } from "../schemas/auth.schema";
import AuthHandler from "../handlers/auth.handler";
import { autoInjectable } from "tsyringe";

@autoInjectable()
class AuthRouter {
  private router: Router;

  constructor(private readonly authHandler: AuthHandler) {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/tokens",
      validateResource(CreateTokenSchema),
      this.authHandler.createAuthTokenHandler
    );
    this.router.post(
      "/tokens/refresh",
      validateResource(RefreshTokenSchema),
      this.authHandler.renovateTokensHandler
    );
  }

  getRouter() {
    return this.router;
  }
}

export default AuthRouter;
