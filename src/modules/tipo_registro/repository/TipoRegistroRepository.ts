import { TipoRegistro } from "@prisma/client";
import { ITipoRegistroRepository } from "./ITipoRegistroRepository";
import prisma from "../../../prismaClient";
import APIError from "../../shared/errors/APIError";

class TipoRegistroRepository implements ITipoRegistroRepository {
  public async findManyByNome(nomes: string[]): Promise<TipoRegistro[]> {
    const tipoRegistros: TipoRegistro[] = await prisma.tipoRegistro.findMany({
      where: {
        tipo: {
          in: nomes,
        },
      },
    });

    if (!tipoRegistros || tipoRegistros.length === 0) {
      throw new APIError("Nenhum tipo de registro encontrado.", 404);
    } else {
      return tipoRegistros;
    }
  }

  public async findByNome(nome: string): Promise<TipoRegistro> {
    const tipoRegistro = await prisma.tipoRegistro.findFirst({
      where: {
        tipo: nome,
      }
    })

    if (!tipoRegistro) {
      throw new APIError("Nenhum tipo de registro encontrado.", 404);
    } else {
      return tipoRegistro;
    }
  }
  async createByName(nome: string): Promise<TipoRegistro> {
    const newTipoRegistro = await prisma.tipoRegistro.create({
      data: {
        tipo: nome,
      },
    });
    return newTipoRegistro;
  }
  findById(id: string): Promise<TipoRegistro> {
    throw new Error("Method not implemented.");
  }
}

export { TipoRegistroRepository };
