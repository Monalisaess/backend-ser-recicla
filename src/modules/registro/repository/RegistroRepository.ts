import { Registro, UNIDADE } from "@prisma/client";
import { RegistroDTO, CreateRegistroInput } from "../dtos/RegistroDTOs";
import { IRegistroRepository } from "./IRegistroRepository";
import prisma from "../../../prismaClient";

class RegistroRepository implements IRegistroRepository {
  public async createRegistro(registro: RegistroDTO): Promise<Registro> {
    throw new Error("Method not implemented.");
  }

  public async createRegistros(registros: CreateRegistroInput[]): Promise<Registro[]> {
    return await prisma.$transaction(
      registros.map((data) =>
        prisma.registro.create({
          data: {
            id_tipo_registro: data.id_tipo_registro,
            id_curso: data.id_curso,
            quantidade: data.quantidade,
            unidade: data.unidade as UNIDADE,
          },
        })
      )
    );
  }

  public async getAllWithCurso(): Promise<(Registro & { curso: { id_curso: string; nome_curso: string } })[]> {
    return prisma.registro.findMany({
      include: {
        curso: true,
      },
    });
  }
}

export { RegistroRepository };
