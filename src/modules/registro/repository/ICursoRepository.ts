import { Curso, Registro } from "@prisma/client";

interface ICursoRepository {
  findByNome(curso: string): Promise<Curso>;
  getRegistrosDoCurso(idCurso: number): Promise<Registro[]>;
}

export { ICursoRepository };
