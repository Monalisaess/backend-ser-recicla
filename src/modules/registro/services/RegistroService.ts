import { IRegistroRepository } from "../repository/IRegistroRepository";
import { CreateRegistrosDTO, RegistroDTO, CreateRegistroInput } from "../dtos/RegistroDTOs";
import { CursoService } from "./CursoService";
import { TipoRegistroService } from "../../tipo_registro/services/TipoRegistroService";
import APIError from '../../shared/errors/APIError';
import { Registro, TipoRegistro } from "@prisma/client";
import Logger from '../../shared/utils/Logger';

class RegistroService {
  private readonly registroRepository: IRegistroRepository;
  private readonly cursoService: CursoService;
  private readonly tipoRegistroService: TipoRegistroService;
  private readonly logger: Logger;

  constructor(
    registroRepository: IRegistroRepository,
    cursoService: CursoService,
    tipoRegistroService: TipoRegistroService,
  ) {
    this.registroRepository = registroRepository;
    this.cursoService = cursoService;
    this.tipoRegistroService = tipoRegistroService;
    this.logger = new Logger("RegistroService");
  }

  async createRegistros(data: CreateRegistrosDTO): Promise<RegistroDTO[]> {
    const { curso, registros } = data;

    this.logger.info("VERIFICANDO SE O CURSO EXISTE");
    const cursoFetch = await this.cursoService.getCursoByNome(curso);
    this.logger.info("CURSO ENCONTRADO");

    this.logger.info("CONSULTANDO TIPOS DE REGISTRO");
    const tipoRegistrosSet = [...new Set(registros.map((r) => r.tipo_registro))];

    this.logger.info("BUSCANDO OU CRIANDO TIPOS DE REGISTRO");
    const tipoRegistrosFetch: TipoRegistro[] = [];
    for (const tr of tipoRegistrosSet) {
      const tipoRegistro: TipoRegistro = await this.tipoRegistroService.findOrCreate(tr);
      tipoRegistrosFetch.push(tipoRegistro);
    }

    const mapTipoRegistro = new Map<string, number>();
    tipoRegistrosFetch.forEach(tr => {
      mapTipoRegistro.set(tr.tipo, tr.id_tipo_registro);
    });

    for (const tr of registros) {
      if (!mapTipoRegistro.has(tr.tipo_registro)) {
        throw new APIError(`O Tipo Registro ${tr.tipo_registro} não foi encontrado.`, 404);
      }
    }

    this.logger.info("PREPARANDO REGISTROS PARA INSERÇÃO");
    const registrosParaInserir: CreateRegistroInput[] = registros.map((tr) => {
      const idTipoRegistro = mapTipoRegistro.get(tr.tipo_registro);
      if (idTipoRegistro === undefined) {
        this.logger.error("ERRO AO ENCONTRAR O ID DO TIPO REGISTRO");
        throw new APIError(`Tipo de registro '${tr.tipo_registro}' não encontrado.`, 404);
      }

      return {
        quantidade: tr.quantidade,
        unidade: tr.unidade === "G" ? "GRAMAS" : "UNIDADES",
        id_curso: cursoFetch.id_curso,
        id_tipo_registro: idTipoRegistro,
      };
    });

    this.logger.info("INSERINDO REGISTROS NO BANCO DE DADOS");
    const dadosInseridos: Registro[] = await this.registroRepository.createRegistros(registrosParaInserir);

    this.logger.info("MAPEANDO RETORNO");
    const mappedRegistros: RegistroDTO[] = dadosInseridos.map(registro => {
      const tipoRegistroNome = tipoRegistrosFetch.find(tr => tr.id_tipo_registro === registro.id_tipo_registro);

      if (!tipoRegistroNome) {
        this.logger.error("ERRO AO MAPEAR RETORNO");
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
    });

    return mappedRegistros;
  }

  public async getRankingCursos(): Promise<{ nome: string; totalReciclado: number }[]> {
    const registros = await this.registroRepository.getAllWithCurso();

    const rankingMap = new Map<string, { nome: string; totalReciclado: number }>();

    registros.forEach(registro => {
      const cursoId = registro.curso.id_curso;
      const cursoNome = registro.curso.nome_curso;
      const quantidade = registro.quantidade.toNumber();

      if (!rankingMap.has(cursoId)) {
        rankingMap.set(cursoId, {
          nome: cursoNome,
          totalReciclado: 0,
        });
      }

      const item = rankingMap.get(cursoId);
      if (item) item.totalReciclado += quantidade;
    });

    return Array.from(rankingMap.values());
  }
}

export { RegistroService };
