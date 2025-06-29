import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email e senha são obrigatórios" });
    return;
  }

  try {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
        senha: password,
      },
    });

    if (!user) {
      res.status(401).json({ error: "Credenciais inválidas" });
      return;
    }

    res.status(200).json({
      message: "Login realizado com sucesso",
      user,
    });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

export default router;
