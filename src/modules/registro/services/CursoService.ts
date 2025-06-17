import { ICursoRepository } from "../repository/ICursoRepository";

class CursoService {
  private readonly cursoRepository: ICursoRepository;

  constructor(cursoRepository: ICursoRepository) {
    this.cursoRepository = cursoRepository;
  }
}

export { CursoService };
