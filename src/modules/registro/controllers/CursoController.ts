import { Request, Response, NextFunction } from "express";
import { CursoService } from "../services/CursoService";

class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  public async listarRegistrosDoCurso(req: Request, res: Response, next: NextFunction) {
    try {
      const idCurso = Number(req.params.id);
      const registros = await this.cursoService.getRegistrosDoCurso(idCurso);
      return res.json(registros);
    } catch (error) {
      next(error);
    }
  }
}

export { CursoController };
