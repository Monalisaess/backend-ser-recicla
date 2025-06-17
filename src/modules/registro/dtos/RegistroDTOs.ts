import { z } from "zod";

const registroSchema = z.object({
  tipo_registro: z
    .string()
    .min(1, "O tipo do registro deve ser especificado obrigatoriamente"),
  quantidade: z.number().gt(0, "O valor deve ser maior que zero"),
  curso: z.string().min(1, "O curso deve ser especificado obrigatoriamente"),
  unidade: z.enum(["G", "U"]),
});

const createRegistrosSchema = z.object({
  curso: z.string().min(1, "O curso deve ser especificado obrigatoriamente"),
  registros: z
    .array(registroSchema)
    .min(1, "Deve haver pelo menos um registro"),
});

type CreateRegistrosDTO = z.infer<typeof createRegistrosSchema>;
type RegistroDTO = z.infer<typeof registroSchema>;

export {
  CreateRegistrosDTO,
  createRegistrosSchema,
  RegistroDTO,
  registroSchema,
};
