import { z } from "zod";

const registroSchema = z.object({
  tipo_registro: z
    .string()
    .min(1, "O tipo do registro deve ser especificado obrigatoriamente"),
  quantidade: z.number().gt(0, "O valor deve ser maior que zero"),
  unidade: z.enum(["G", "U"]),
});

const createRegistrosSchema = z.object({
  curso: z.string().min(1, "O curso deve ser especificado obrigatoriamente"),
  registros: z
    .array(registroSchema)
    .min(1, "Deve haver pelo menos um registro"),
});

//generic registro dto
const registroDto = z.object({
  id: z.number(),
  tipo_registro: z.string(),
  curso: z.string(),
  quantidade: z.number(),
  unidade: z.string(),
  timestamp: z.string().datetime(),
});

//registro de entrada
const createRegistroInput = z.object({
  id_tipo_registro: z.number(),
  quantidade: z.number(),
  id_curso: z.number(),
  unidade: z.enum(["GRAMAS", "UNIDADES"]),
});

type CreateRegistrosDTO = z.infer<typeof createRegistrosSchema>;
type CreateRegistroDTO = z.infer<typeof registroSchema>;
type RegistroDTO = z.infer<typeof registroDto>;
type CreateRegistroInput = z.infer<typeof createRegistroInput>;

export {
  CreateRegistrosDTO,
  createRegistrosSchema,
  CreateRegistroDTO,
  registroSchema,
  registroDto,
  RegistroDTO,
  CreateRegistroInput,
  createRegistroInput,
};
