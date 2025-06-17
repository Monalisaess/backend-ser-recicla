import { Curso } from "@prisma/client";

interface ICursoRepository {
  findCursoByName(curso: string): Promise<Curso>;
}

export { ICursoRepository };
