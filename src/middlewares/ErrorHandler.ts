import { Request, Response, NextFunction } from "express";
import APIError from "../modules/shared/errors/APIError";

// Middleware de tratamento de erros
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Erro interno do servidor.";

  // Se for um APIError, usamos o statusCode e a mensagem definidos
  if (err instanceof APIError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    // Para erros que não são APIError e não são PrismaClientKnownRequestError
    // Logar o erro completo para depuração (mas não enviar ao cliente em produção)
    console.error("Erro inesperado:", err);
    if (process.env.NODE_ENV === "production") {
      // Em produção, não mostre detalhes de erros não tratados
      message = "Ocorreu um erro inesperado.";
    } else {
      // Em desenvolvimento, você pode incluir mais detalhes
      message = err.message;
    }
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    // Opcional: Para depuração em desenvolvimento, inclua o stack trace
    // Em produção, NUNCA inclua o stack trace.
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
