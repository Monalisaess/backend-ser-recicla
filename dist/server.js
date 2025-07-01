"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ErrorHandler_1 = __importDefault(require("./middlewares/ErrorHandler"));
const routes_1 = require("./modules/shared/http/routes/routes");
const initDb_1 = __importDefault(require("./database/initDb"));
const Logger_1 = __importDefault(require("./modules/shared/utils/Logger"));
const logger = new Logger_1.default("server.ts");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv_1.default.config();
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        yield (0, initDb_1.default)();
        //rotas
        logger.info("Iniciando rotas...");
        app.use(routes_1.routes);
        //midlewares
        logger.info("Iniciando middlewares...");
        app.use(ErrorHandler_1.default);
        const port = process.env.PORT || 3001;
        app.listen(port, () => {
            logger.info(`Server rodando na porta ${port}`);
        });
    });
}
bootstrap().catch((error) => {
    logger.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
});
