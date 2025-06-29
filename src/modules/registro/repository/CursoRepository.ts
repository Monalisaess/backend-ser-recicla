import { Curso } from "@prisma/client";
import prisma from "../../../prismaClient";
import { ICursoRepository } from "./ICursoRepository";
import APIError from "../../shared/errors/APIError";

class CursoRepository implements ICursoRepository {
  async findByNome(curso: string): Promise<Curso> {
    console.log("BUSCANDO NA BASE DE DADOS");
    const result = await prisma.curso.findUnique({
      where: {
        nome_curso: curso,
      },
    });

    if (!result) {
      throw new APIError(`Curso com nome ${curso} não encontrado.`, 404);
    } else {
      return result;
    }
  }

  async getRegistrosDoCurso(idCurso: number) {
    const registros = await prisma.registro.findMany({
      where: {
        id_curso: idCurso,
      },
      include: {
        tipo: true, // inclui informações do tipo de registro
      },
    });

    return registros;
  }
}

export { CursoRepository };
