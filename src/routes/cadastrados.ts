import { Router, Request, Response } from "express";
import pool from "../db";

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
    const result = await pool.query(
      "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *",
      [email, name, password],
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao cadastrar:", err);
    res.status(500).json({ error: "Erro no cadastro" });
  }
});

export default router;
