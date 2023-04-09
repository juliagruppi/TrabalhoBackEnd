import express from "express";

import fs from "fs";
import { getHistorico, getHistoricoMensagens } from "../repositories/mensagensRepository";

export const historico = express.Router()

historico.put("/",(req, res) => {
    const conversaAtual = req.body
    const historicoPermanente = JSON.parse(fs.readFileSync("./src/Json/historicoPermanente.json").toString());
    historicoPermanente.push(conversaAtual)
    const historicoPermanenteString = JSON.stringify(historicoPermanente)
    fs.writeFile("./src/Json/historicoPermanente.json", historicoPermanenteString, () => {
        console.log("Json Salvo")
    })
    res.set({
        'Content-Type': "application/json",
        'Acess-Control-Allow-Origin': '*'
    })

    res.status(201);
    res.json({
        status: 'Success',
        data: historicoPermanente
    })
});

historico.delete("/", (req, res) => {
    res.status(200)
})
historico.get("/", async (req, res) => {
    const componentesPaginacao = req.query

    const {response : protocolos, count} = await getHistorico(componentesPaginacao)
    res.status(200);
    res.json({
        status: 'Success',
        data: protocolos,
        count: count
    })
})
historico.get("/:numeroProtocolo", async (req, res) => {
    const numeroProtocolo = Number(req.params.numeroProtocolo)
    const mensagens = await getHistoricoMensagens(numeroProtocolo)
    res.status(200);
    res.json({
        status: 'Success',
        data: mensagens
    })
})

