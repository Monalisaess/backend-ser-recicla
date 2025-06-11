import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

interface UserRequest extends Request {
  body: {
    email: string;
    name: string;
    password: string;
  };
}

router.post("/", async (req: UserRequest, res: Response) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ error: "Email, nome e senha obrigatórios" });
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    res.status(200).json(newUser);
  } catch (err) {
    console.error("Erro ao cadastrar:", err);
    res.status(500).json({ error: "Erro no cadastro" });
  }
});

export default router;
