import Router from "express";
import { RegistroController } from "../controllers/RegistroController";
import { RegistroService } from "../services/RegistroService";
import { RegistroRepository } from "../repository/RegistroRepository";
import { CursoService } from "../services/CursoService";
import { CursoRepository } from "../repository/CursoRepository";

const registroRouter = Router();

// initialize Controller

const cursoRepository = new CursoRepository();
const cursoService = new CursoService(cursoRepository);

const registroRepository = new RegistroRepository();
const registroService = new RegistroService(registroRepository, cursoService);

const registroController = new RegistroController(registroService);

registroRouter.post("/", (req, res, next) =>
  registroController.createRegistro(req, res, next),
);

export default registroRouter;
