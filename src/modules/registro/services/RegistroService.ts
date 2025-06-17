import { IRegistroRepository } from "../repository/IRegistroRepository";
import { CreateRegistrosDTO, RegistroDTO } from "../dtos/RegistroDTOs";

class RegistroService {
  private readonly registroRepository: IRegistroRepository;

  constructor(registroRepository: IRegistroRepository) {
    this.registroRepository = registroRepository;
  }

  async createRegistros(data: CreateRegistrosDTO): Promise<boolean> {
    //TODO: implementar
    return true;
  }
}

export { RegistroService };
