import { Router, Request, Response, NextFunction } from "express";
import { RegistroController } from "../controllers/RegistroController";
import { RegistroService } from "../services/RegistroService";
import { RegistroRepository } from "../repository/RegistroRepository";
import { CursoService } from "../services/CursoService";
import { CursoRepository } from "../repository/CursoRepository";
import { TipoRegistroService } from "../../tipo_registro/services/TipoRegistroService";
import { TipoRegistroRepository } from "../../tipo_registro/repository/TipoRegistroRepository";

const registroRouter = Router();

// initialize Controller

const cursoRepository = new CursoRepository();
const cursoService = new CursoService(cursoRepository);

const tipoRegistroRepository = new TipoRegistroRepository();
const tipoRegistroService = new TipoRegistroService(tipoRegistroRepository);

const registroRepository = new RegistroRepository();
const registroService = new RegistroService(
  registroRepository,
  cursoService,
  tipoRegistroService,
);

const registroController = new RegistroController(registroService);

registroRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await registroController.createRegistro(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default registroRouter;
