import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { iniciarBot } from "./controllers/iniciarBot";
import { mensagens } from "./controllers/mensagens";
import { historico } from "./controllers/historico";


const app = express();
app.use(express.json());
app.use(cors())

app.use("/iniciarBot", iniciarBot)
app.use("/mensagens", mensagens)
app.use("/historico", historico)

const port = 8080;
const host = "localhost";

app.listen(port, host, () =>{
    console.log(`Servidor express iniciado em http://${host}:${port}`);
});