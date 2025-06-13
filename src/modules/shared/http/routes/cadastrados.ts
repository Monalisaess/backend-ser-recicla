import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

interface UserRequest extends Request {
  body: {
    email: string;
    nome: string;
    senha: string;
  };
}

router.post("/", async (req: UserRequest, res: Response) => {
  const { email, nome, senha } = req.body;
  if (!email || !nome || !senha) {
    return res.status(400).json({ error: "Email, nome e senha obrigatórios" });
  }

  try {
    const newUser = await prisma.users.create({
      data: {
        email,
        nome,
        senha,
      },
    });

    res.status(200).json(newUser);
  } catch (err) {
    console.error("Erro ao cadastrar:", err);
    res.status(500).json({ error: "Erro no cadastro" });
  }
});

export default router;
