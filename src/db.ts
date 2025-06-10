import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgres://postgres:tTsQlOHshTGVEVlLHyXdLdgaQpDxsQWJ@containers-us-west-207.railway.app:5432/railway",
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
    release();
  }
});

export default pool;
