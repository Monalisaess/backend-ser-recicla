"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const server = (0, express_1.default)();
const router = (0, express_2.Router)();
server.use(express_1.default.json());
router.get("/", (req, res) => {
    res.json({ message: "Hello world" });
});
server.use(router);
server.listen(8080, () => "server online on port 8080");
