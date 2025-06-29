import { Router } from "express";
import loginRouter from "./auth";
import cadastroRouter from "./cadastrados";
import registroRouter from "../../../registro/routes/registro.routes";
import cursoRouter from "../../../../routes/curso.routes"; // <-- CORRIGIDO

const routes = Router();

// ping pong
// routes.use("/", (req, res) => res.json({ message: "pong" }));

routes.use("/cadastro", cadastroRouter);
routes.use("/login", loginRouter);
routes.use("/registros", registroRouter);
routes.use("/curso", cursoRouter); // <-- NOVO

export { routes };
