import { ICursoRepository } from "../repository/ICursoRepository"; 
import { Curso } from "@prisma/client";

class CursoService {
  private readonly cursoRepository: ICursoRepository;

  constructor(cursoRepository: ICursoRepository) {
    this.cursoRepository = cursoRepository;
  }

  public async getCursoByNome(nome: string): Promise<Curso> {
    console.log(`PESQUISANDO CURSO PELO NOME: ${nome}`);
    const curso = await this.cursoRepository.findByNome(nome);

    return curso;
  }

  public async getRegistrosDoCurso(idCurso: number) {
    return this.cursoRepository.getRegistrosDoCurso(idCurso);
  }
}

export { CursoService };
