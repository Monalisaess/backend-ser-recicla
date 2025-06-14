import { z } from "zod";

//esquema de lista de registros para o esquema de criar registro
const registrosListSchema = z.array(
  z.object({
    tipo: z.string().min(1, "O tipo é um dado obrigatório"),
    quantidade: z.number().min(1, "A quantidade deve ser maior que zero"),
    unidade: z.enum(["G", "U"]),
  }),
);

//esquema para criar um registro
const createRegistrosSchema = z.object({
  curso: z.string().min(1, "O curso é um dado obrigatório"),
  registros: registrosListSchema,
});

//cria tipos TS
type CreateRegistrosDTO = z.infer<typeof createRegistrosSchema>;

export { CreateRegistrosDTO, createRegistrosSchema, registrosListSchema };
