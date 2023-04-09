import express from "express";
import fs from 'fs';
import * as mensagensRepository from '../repositories/mensagensRepository';
export const iniciarBot = express.Router()

// Ler a mensagem inicial do bot

iniciarBot.get("/", async (req, res) => {
    const retornoInicial = await mensagensRepository.iniciarBot();
    res.set({
        'Content-Type' : "application/json",
        'Acess-Control-Allow-Origin' : '*'
    })
    res.status(200)
    res.json({
        status: 'Success',
        mensagem: retornoInicial.response,
        numeroProtocolo: retornoInicial.idProtocolo
    })
});