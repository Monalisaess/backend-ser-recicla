import { TipoRegistro } from "@prisma/client";

interface ITipoRegistroRepository {
  findManyByNome(nomes: string[]): Promise<TipoRegistro[]>;
  findByNome(nome: string): Promise<TipoRegistro>;
  createByName(nome: string): Promise<TipoRegistro>;
  findById(id: string): Promise<TipoRegistro>;
}

export { ITipoRegistroRepository };
