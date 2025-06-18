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
  createByName(nome: string): Promise<TipoRegistro> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<TipoRegistro> {
    throw new Error("Method not implemented.");
  }
}
