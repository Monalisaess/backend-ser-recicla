import { ITipoRegistroRepository } from "../repository/ITipoRegistroRepository";
import { TipoRegistro } from "@prisma/client";

class TipoRegistroService {
  private readonly tipoRegistroRepository: ITipoRegistroRepository;

  constructor(tipoRegistroRepository: ITipoRegistroRepository) {
    this.tipoRegistroRepository = tipoRegistroRepository;
  }

  async findTipoRegistrosByNome(nomes: string[]): Promise<TipoRegistro[]> {
    const registros = await this.tipoRegistroRepository.findManyByNome(nomes);
    return registros;
  }
}

export { TipoRegistroService };
