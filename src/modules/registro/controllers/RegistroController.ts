import { RegistroService } from "../services/RegistroService";
import { Request, Response } from "express";
import { IRegistroRepository } from "../repository/IRegistroRepository";
import { RegistroRepository } from "../repository/RegistroRepository";
import {
  RegistroDTO,
  CreateRegistrosDTO,
  createRegistrosSchema,
} from "../dtos/RegistroDTOs";
import { APIError } from "../../shared/errors/APIError";

class RegistroController {
  private readonly registroService: RegistroService;
  private readonly cursoService: CursoService;

  constructor() {
    const repository: IRegistroRepository = new RegistroRepository();
    const service = new RegistroService(repository);

    this.registroService = service;
  }

  async createRegistro(req: Request, res: Response): Promise<Response> {
    try {
      const registrosDto: CreateRegistrosDTO = createRegistrosSchema.parse(
        req.body,
      );

      const registro = await this.registroService.createRegistros(registrosDto);
      return res.status(201).json(registro);
    } catch (error) {
      return res.status(500).json({ error: "" });
    }
  }
}
