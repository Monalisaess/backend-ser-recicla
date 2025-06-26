import { RegistroService } from "../services/RegistroService";
import { Request, Response, NextFunction } from "express";
import {
  RegistroDTO,
  CreateRegistroDTO,
  CreateRegistrosDTO,
  createRegistrosSchema,
} from "../dtos/RegistroDTOs";

class RegistroController {
  private readonly registroService: RegistroService;

  constructor(registroService: RegistroService) {
    this.registroService = registroService;
  }

  public async createRegistro(
    req: Request,
    res: Response,
    nextFunction: NextFunction,
  ): Promise<Response | void> {
    console.info("REGISTRANDO REGISTROS...");
    try {
      const dto: CreateRegistrosDTO = createRegistrosSchema.parse(req.body);
      const response = await this.registroService.createRegistros(dto);

      return res.json({ message: "Registros Feitos com sucesso!", registros: response });
    } catch (error) {
      nextFunction(error);
    }
  }
}

export { RegistroController };
