import { Curso } from "@prisma/client";

interface ICursoRepository {
  findByNome(curso: string): Promise<Curso>;
}

export { ICursoRepository };
