import express from "express";
import { Router, Request, Response } from "express";

const server = express();
const router = Router();

server.use(express.json());

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
});

server.use(router);

server.listen(8080, () => "server online on port 8080");
