import { Router } from "express";
import loginRouter from "./auth";
import cadastroRouter from "./cadastrados";
import registroRouter from "../../../registro/routes/registro.routes";

const routes = Router();

//ping pong
//routes.use("/", (req, res) => res.json({ message: "pong" }));

routes.use("/cadastro", cadastroRouter);
routes.use("/login", loginRouter);
routes.use("/registros", registroRouter);

export { routes };
