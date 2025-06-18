import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/ErrorHandler";
import { routes } from "./modules/shared/http/routes/routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

//rotas
console.log("Iniciando rotas...");
app.use(routes);

//midlewares
console.log("Iniciando middlewares...");
app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
