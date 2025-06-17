import { Registro } from "@prisma/client";
import { RegistroDTO } from "../dtos/RegistroDTOs";

interface IRegistroRepository {
  createRegistro(registro: RegistroDTO): Promise<Registro>;
  createRegistros(registros: RegistroDTO[]): Promise<Registro[]>;
}

export { IRegistroRepository };
