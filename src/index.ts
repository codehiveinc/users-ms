import "reflect-metadata";
import "./env";
import express, { Request, Response } from "express";
import morganMiddleware from "./shared/infrastructure/middlewares/morgan.middleware";
import camelCaseMiddleware from "./shared/infrastructure/middlewares/camel-case.middleware";
import snakeCaseMiddleware from "./shared/infrastructure/middlewares/snake-case.middleware";
import { container } from "tsyringe";
import UserRouter from "./users/infrastructure/routers/user.router";
import AuthRouter from "./auth/infrastructure/routers/auth.routers";
import UserRepository from "./users/infrastructure/adapters/repositories/user.repository";
import EncryptRepository from "./auth/infrastructure/adapters/repositories/encrypt.repository";
import JWTRepository from "./auth/infrastructure/adapters/repositories/jwt.repository";
import RefreshTokenRepository from "./auth/infrastructure/adapters/repositories/refresh-token.repository";
import MessageBrokerRepository from "./shared/infrastructure/adapters/repositories/message-broker.repository";
import UserEvents from "./users/infrastructure/events/user.events";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.use(camelCaseMiddleware);
app.use(snakeCaseMiddleware);

container.register("UserRepository", UserRepository);
container.register("EncryptRepository", EncryptRepository);
container.register("JWTRepository", JWTRepository);
container.register("RefreshTokenRepository", RefreshTokenRepository);
container.register("MessageBrokerRepository", MessageBrokerRepository);

const userRouter = container.resolve(UserRouter);
const authRouter = container.resolve(AuthRouter);
const userEvents = container.resolve(UserEvents);

app.use("/api/v1/users", userRouter.getRouter());
app.use("/api/v1/auth", authRouter.getRouter());

userEvents.initializeEvents();

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Everything is working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
