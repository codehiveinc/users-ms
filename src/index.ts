import "reflect-metadata";
import "./env";
import express, { Request, Response } from "express";
import morganMiddleware from "./shared/infrastructure/middlewares/morgan.middleware";
import camelCaseMiddleware from "./shared/infrastructure/middlewares/camel-case.middleware";
import snakeCaseMiddleware from "./shared/infrastructure/middlewares/snake-case.middleware";
import { container } from "tsyringe";
import UserRouter from "./users/infrastructure/routes/user.routes";
import AuthRouter from "./auth/infrastructure/routes/auth.route";
import UserRepository from "./users/infrastructure/adapters/repositories/user.repository";
import EncryptRepository from "./auth/infrastructure/adapters/repositoreis/encrypt.repository";
import JWTRepository from "./auth/infrastructure/adapters/repositoreis/jwt.repository";
import RefreshTokenRepository from "./auth/infrastructure/adapters/repositoreis/refresh-token.repository";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.use(camelCaseMiddleware);
app.use(snakeCaseMiddleware);

container.register("UserRepository", UserRepository);
container.register("EncryptRepository", EncryptRepository);
container.register("JWTRepository", JWTRepository);
container.register("RefreshTokenRepository", RefreshTokenRepository);

const userRouter = container.resolve(UserRouter);
const authRouter = container.resolve(AuthRouter);

app.use("/api/v1/users", userRouter.getRouter());
app.use("/api/v1/auth", authRouter.getRouter());

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Everything is working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
