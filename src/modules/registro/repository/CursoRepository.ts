import { Curso } from "@prisma/client";
import { ICursoRepository } from "./ICursoRepository";

class CursoRepository implements ICursoRepository {
  findCursoByName(curso: string): Promise<Curso> {
    throw new Error("Method not implemented.");
  }
}

export { CursoRepository };
