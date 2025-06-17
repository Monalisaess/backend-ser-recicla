import { Registro } from "@prisma/client";
import { RegistroDTO } from "../dtos/RegistroDTOs";
import { IRegistroRepository } from "./IRegistroRepository";
import prisma from "../../../prismaClient";

class RegistroRepository implements IRegistroRepository {
  createRegistro(registro: RegistroDTO): Promise<Registro> {
    throw new Error("Method not implemented.");
  }
  createRegistros(registros: RegistroDTO[]): Promise<Registro[]> {
    throw new Error("Method not implemented.");
  }
}

export { RegistroRepository };
