import { Router, Request, Response, NextFunction } from "express";
import { CursoRepository } from "../modules/registro/repository/CursoRepository";
import { CursoService } from "../modules/registro/services/CursoService";
import { CursoController } from "../modules/registro/controllers/CursoController";

const router = Router();

const cursoRepository = new CursoRepository();
const cursoService = new CursoService(cursoRepository);
const cursoController = new CursoController(cursoService);

router.get(
  "/:id/registros",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cursoController.listarRegistrosDoCurso(req, res, next);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
