import { Router } from "express";
import loginRouter from "./auth";
import cadastroRouter from "./cadastrados";

const routes = Router();

routes.use("/cadastro", cadastroRouter);
routes.use("/login", loginRouter);

export { routes };
