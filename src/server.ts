import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./modules/shared/http/routes/cadastrados";
import authRouter from "./modules/shared/http/routes/auth";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/cadastrados", router);
app.use("/auth", authRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
