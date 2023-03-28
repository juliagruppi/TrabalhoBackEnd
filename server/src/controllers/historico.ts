import express from "express";

import fs from "fs";

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