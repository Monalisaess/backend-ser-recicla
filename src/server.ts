import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { APIError } from "./modules/shared/errors/APIError";
import { routes } from "./modules/shared/http/routes/routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
//rotas
app.use(routes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
