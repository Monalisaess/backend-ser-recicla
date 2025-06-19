import { IRegistroRepository } from "../repository/IRegistroRepository";
import { CreateRegistrosDTO, RegistroDTO, CreateRegistroInput } from "../dtos/RegistroDTOs";
import { CursoService } from "./CursoService";
import { TipoRegistroService } from "../../tipo_registro/services/TipoRegistroService";
import APIError from '../../shared/errors/APIError';
import { Registro } from "@prisma/client";

class RegistroService {
  private readonly registroRepository: IRegistroRepository;
  private readonly cursoService: CursoService;
  private readonly tipoRegistroService: TipoRegistroService;

  constructor(
    registroRepository: IRegistroRepository,
    cursoService: CursoService,
    tipoRegistroService: TipoRegistroService,
  ) {
    this.registroRepository = registroRepository;
    this.cursoService = cursoService;
    this.tipoRegistroService = tipoRegistroService;
  }

  async createRegistros(data: CreateRegistrosDTO): Promise<RegistroDTO[]> {
    const { curso, registros } = data;
    //verifica se o curso existe
    console.log("VERIFICANDO SE O CURSO EXISTE");
    const cursoFetch = await this.cursoService.getCursoByNome(curso);

    //consulta tipos registro
    const tipoRegistrosSet = [
      ...new Set(registros.map((r) => r.tipo_registro)),
    ];

    //pegar os ids dos tipo_registro
    const tipoRegistrosFetch =
      await this.tipoRegistroService.findTipoRegistrosByNome(tipoRegistrosSet);
    
    const mapTipoRegistro = new Map<string, number>();
    tipoRegistrosFetch.forEach(tr => {
      mapTipoRegistro.set(tr.tipo, tr.id_tipo_registro);
    });

      //verifica se todos os  tiposRegistros estão presentes
    for(const tr of registros) {
      if (!mapTipoRegistro.has(tr.tipo_registro)) {
        throw new APIError(`O Tipo Registro ${tr.tipo_registro} não foi encontrado.`, 404);
      }
    }

    //prepara dados para inserção
    const registrosParaInserir: CreateRegistroInput[] = registros.map((tr) => {
      const idTipoRegistro = mapTipoRegistro.get(tr.tipo_registro);
  
      if (idTipoRegistro === undefined) {
        throw new APIError(`Tipo de registro '${tr.tipo_registro}' não encontrado.`, 404);
      }
      
      return {
        quantidade: tr.quantidade,
        unidade: tr.unidade === "G" ? "GRAMAS" : "UNIDADES",
        id_curso: cursoFetch.id_curso,
        id_tipo_registro: idTipoRegistro,
      }
    });

    //inserir dados
    const dadosInseridos: Registro[] = await this.registroRepository.createRegistros(registrosParaInserir);
    
    //mapeia para retorno
    const mappedRegistros: RegistroDTO[] = dadosInseridos.map(registro => {
      //encontra nome do registro pelo id
      const tipoRegistroNome = tipoRegistrosFetch.find(tr => tr.id_tipo_registro === registro.id_tipo_registro);

      if(!tipoRegistroNome) {
        throw new APIError("Ocorreu um erro no retorno do registro, contate os desenvolvedores", 500);
      }
      return {
        id: registro.id_registro,
        tipo_registro: tipoRegistroNome.tipo,
        curso: cursoFetch.nome_curso,
        quantidade: registro.quantidade.toNumber(),
        unidade: registro.unidade.toString(),
        timestamp: registro.timestamp.toISOString(),
      };
    })

    return mappedRegistros;
  }
}

export { RegistroService };
