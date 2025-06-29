import { Router, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { createContext } from "vm";

const prisma = new PrismaClient();
const router = Router();

interface UserRequest extends Request {
  body: {
    email: string;
    nome: string;
    senha: string;
  };
}

router.post("/", async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  const { email, nome, senha } = req.body;
  if (!email || !nome || !senha) {
    res.status(400).json({ error: "Email, nome e senha obrigatórios" });
    return;
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
    return;
  } catch (err) {
    next(err);
  }
});

export default router;
