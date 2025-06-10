import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

router.post("/login", async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Aqui você pode adicionar a geração de token JWT se desejar
    res.status(200).json({
      message: "Login realizado com sucesso",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

export default router;
