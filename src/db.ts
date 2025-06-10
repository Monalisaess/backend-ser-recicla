import pg from "pg";
import dotenv from "dotenv";
import { Error, Client, Release } from "pg";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgresql://postgres:tTsQlOHshTGVEVlLHyXdLdgaQpDxsQWJ@gondola.proxy.rlwy.net:41192/railway",
});

pool.connect((err: Error, client: Client, release: Release) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    release();
  }
});

export default pool;
