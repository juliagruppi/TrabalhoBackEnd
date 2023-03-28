import express from "express";
export const mensagens = express.Router();

import fs from "fs";

function mensagemAutomatica(mensagem: string) {
    const retorno = JSON.parse(fs.readFileSync("./src/Json/retornosAutomaticos.json").toString());

    switch (mensagem) {
        case '1':
            return retorno[0].primeiraEscolha
            break;
        case '2':
            return retorno[0].segundaEscolha
            break;
        case '3':
            return retorno[0].terceiraEscolha
            break;
        case '4':
            return retorno[0].quartaEscolha
            break;
        default:
            return "Opss... não entendi, poderia digitar o número da sua opção."
            break;
    }
    return mensagem
}


function interacaoBotUsuario(mensagem: string) {
    const historico = JSON.parse(fs.readFileSync("./src/Json/historicoConversa.json").toString());
    const mensagemUsuario = {
        mensagem: mensagem,
        ehUsuario: true
    }

    historico.push(mensagemUsuario)

    const mensagemBot = {
        mensagem: mensagemAutomatica(mensagem),
        ehUsuario: false
    }

    historico.push(mensagemBot)

    const historicoString = JSON.stringify(historico)

    fs.writeFile("./src/Json/historicoConversa.json", historicoString, () => {
        console.log("Json Salvo")
    })

    return historico
}

// Código para deletar

export async function deleteHistorico() {
    const mensagensHistorico = JSON.parse(fs.readFileSync(`./src/Json/historicoConversa.json`).toString());

    fs.unlink(`./src/Json/historicoConversa.json`, () => {
        console.log("Json Deletado")
    });
    return mensagensHistorico
}


mensagens.post("/:mensagem", (req, res) => {
    const mensagemRecebida = req.params.mensagem

    const historico = interacaoBotUsuario(mensagemRecebida)
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
mensagens.delete("/", (req, res) => {
    const historico = deleteHistorico();
    res.status(200);
    res.json({
        status: 'Success',
        data: historico
    })
});
