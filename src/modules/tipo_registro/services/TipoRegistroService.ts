import APIError from "../../shared/errors/APIError";
import { ITipoRegistroRepository } from "../repository/ITipoRegistroRepository";
import { TipoRegistro } from "@prisma/client";
import Logger from "../../shared/utils/Logger";

class TipoRegistroService {
  private readonly tipoRegistroRepository: ITipoRegistroRepository;
  private readonly logger: Logger;

  constructor(tipoRegistroRepository: ITipoRegistroRepository) {
    this.tipoRegistroRepository = tipoRegistroRepository;
    this.logger = new Logger("TipoRegistroService");
  }

  async findTipoRegistrosByNome(nomes: string[]): Promise<TipoRegistro[]> {
    const registros = await this.tipoRegistroRepository.findManyByNome(nomes);
    if (!registros || registros.length === 0) {
      this.logger.error("ERRO AO BUSCAR TIPOS DE REGISTRO");
      throw new APIError("Nenhum tipo de registro encontrado com os nomes fornecidos.");
    }
    return registros;
  }

  async createRegistro(tipoRegistro: string): Promise<TipoRegistro> {
    const existingRegistro = await this.tipoRegistroRepository.findByNome(tipoRegistro);
    if (existingRegistro) {
      this.logger.error(`O Tipo Registro '${tipoRegistro}' já existe.`);
      throw new APIError(`O tipo de registro '${tipoRegistro}' já existe.`, 409);
    }

    const newRegistro = await this.tipoRegistroRepository.createByName(tipoRegistro);
    return newRegistro;
  }

  async findOrCreate(tipoRegistro: string): Promise<TipoRegistro> {
    try {
      return await this.tipoRegistroRepository.findByNome(tipoRegistro);
    } catch (error) {
      if (error instanceof APIError && error.statusCode == 404) {
        this.logger.info(`Tipo de registro '${tipoRegistro}' não encontrado, criando novo registro.`);
        return await this.tipoRegistroRepository.createByName(tipoRegistro.toUpperCase().replace(" ", "_"));
      } else {
        this.logger.info("Outro erro")
        throw error;
      }
    }
  }
}

export { TipoRegistroService };
