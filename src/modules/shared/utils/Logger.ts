// src/shared/logger/Logger.ts

/**
 * Classe Logger simples para centralizar o registro de mensagens.
 * Pode ser estendida para integrar com bibliotecas de logging mais avançadas (e.g., Winston, Pino).
 */
class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  /**
   * Registra uma mensagem de informação.
   * @param message A mensagem a ser logada.
   * @param data Dados adicionais para incluir no log (opcional).
   */
  info(message: string, data?: any): void {
    console.log(`[INFO] [${this.context}] ${message}`, data ? data : '');
  }

  /**
   * Registra uma mensagem de aviso.
   * @param message A mensagem a ser logada.
   * @param data Dados adicionais para incluir no log (opcional).
   */
  warn(message: string, data?: any): void {
    console.warn(`[WARN] [${this.context}] ${message}`, data ? data : '');
  }

  /**
   * Registra uma mensagem de erro.
   * @param message A mensagem a ser logada.
   * @param error O objeto de erro (opcional).
   * @param data Dados adicionais para incluir no log (opcional).
   */
  error(message: string, error?: Error, data?: any): void {
    console.error(`[ERROR] [${this.context}] ${message}`, error, data ? data : '');
  }
}

export default Logger;