import { IRegistroRepository } from "../repository/IRegistroRepository";
import { CreateRegistrosDTO, RegistroDTO } from "../dtos/RegistroDTOs";
import { CursoService } from "./CursoService";

class RegistroService {
  private readonly registroRepository: IRegistroRepository;
  private readonly cursoService: CursoService;

  constructor(
    registroRepository: IRegistroRepository,
    cursoService: CursoService,
  ) {
    this.registroRepository = registroRepository;
    this.cursoService = cursoService;
  }

  async createRegistros(data: CreateRegistrosDTO): Promise<boolean> {
    const { curso, registros } = data;
    //verifica se o curso existe
    console.log("VERIFICANDO SE O CURSO EXISTE");
    const cursoFetch = await this.cursoService.getCursoByNome(curso);
    console.log(cursoFetch);
    return true;
  }
}

export { RegistroService };
