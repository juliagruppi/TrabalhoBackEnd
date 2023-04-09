import express from "express";
export const mensagens = express.Router();
import * as mensagensRepository from '../repositories/mensagensRepository';
import fs from "fs";
import { deleteMensagens, getMensagens, postMensagem } from "../repositories/mensagensRepository";

mensagens.post("/:mensagem", async (req, res) => {
    const mensagemRecebida = req.params.mensagem
    console.log(req.body)
    const historico = await postMensagem(mensagemRecebida, req.body.numeroProtocolo)
    res.set({
        'Content-Type': "application/json",
        'Acess-Control-Allow-Origin': '*'
    })

    res.status(201);
    res.json({
        status: 'Success',
        data: historico
    })
});

//Finaliza atendimento
mensagens.delete("/", async (req, res) => {
    const conversaAtual = await mensagensRepository.deleteMensagens();
    res.status(200);
    res.json({
        status: 'Success',
        data: conversaAtual
    })
});
