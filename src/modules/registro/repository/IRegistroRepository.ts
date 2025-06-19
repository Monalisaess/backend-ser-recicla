import { Registro } from "@prisma/client";
import { RegistroDTO, CreateRegistroInput } from "../dtos/RegistroDTOs";

interface IRegistroRepository {
  createRegistro(registro: RegistroDTO): Promise<Registro>;
  createRegistros(registros: CreateRegistroInput[]): Promise<Registro[]>;
}

export { IRegistroRepository };
