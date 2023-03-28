import express from "express";
import fs from 'fs'
export const iniciarBot = express.Router()

// Ler a mensagem inicial do bot

iniciarBot.get("/",(req, res) => {
    fs.writeFile("./src/Json/historicoConversa.json", '[]', () => {
        console.log("Json Salvo")
    })

    const retornoInicial = JSON.parse(fs.readFileSync("./src/Json/iniciarBot.json").toString());
    const historicoPermanente = JSON.parse(fs.readFileSync("./src/Json/historicoPermanente.json").toString());
    console.log(historicoPermanente)
    const tamanhoHistorico = historicoPermanente.length
    res.set({
        'Content-Type' : "application/json",
        'Acess-Control-Allow-Origin' : '*'
    })
    res.status(200)
    res.json({
        status: 'Success',
        numeroDeConversa : tamanhoHistorico,
        mensagem: retornoInicial
    })
});