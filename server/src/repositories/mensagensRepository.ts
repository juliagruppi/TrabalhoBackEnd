import { databasePool } from "../database/databasePool";
import { requireSQL } from "../database/requireSQL";
import { ComponentesPaginacao, componentesPaginacaoSchema, mensagemRecebidaSchema } from "../mensagensSchema";

export async function iniciarBot() {

    const connection = await databasePool.getConnection();

    let idProtocolo = 1
    const [ultimoIDProtocolo] = await connection.query("SELECT * FROM protocolos") as any
    if (ultimoIDProtocolo.length > 0) {
        idProtocolo = ultimoIDProtocolo[ultimoIDProtocolo.length - 1].protocolo + 1
    }

    const nomeProtocolo = `Protocolo ${idProtocolo}`
    const [responseInsertProtocolo] = await connection.query("INSERT INTO protocolos (nomeProtocolo) VALUES (?)", [nomeProtocolo])

    const [response] = await connection.query("SELECT * from iniciarBot") as any;

    const responseReset = await deleteMensagens()

    connection.release()

    return { response, idProtocolo }

}

export async function postMensagem(mensagemCliente: string, numeroProtocolo: number) {
    const validacaoMensagemCliente = await mensagemRecebidaSchema.safeParseAsync(mensagemCliente);

    const connection = await databasePool.getConnection();
    let mensagemAutomatica = 'Não entendi sua resposta'

    if (validacaoMensagemCliente.success) {
        const [[responseMensagemAutomatica]] = await connection.query(`select * from mensagensAutomaticas where id = ${mensagemCliente}`) as any
        mensagemAutomatica = responseMensagemAutomatica.mensagemAutomatica
    } else {
        mensagemAutomatica = validacaoMensagemCliente.error.issues[0].message
    }

    const insertMensagemSql = await requireSQL('insertMensagem.sql')
    const insertHistoricoSql = await requireSQL('insertHistorico.sql')

    const [response] = await connection.query(insertMensagemSql, [mensagemCliente, mensagemAutomatica]) as any;

    const [responseInsertHistorico] = await connection.query(insertHistoricoSql, [mensagemCliente, mensagemAutomatica, numeroProtocolo]) as any;

    connection.release()


    const mensagensAtuais = await getMensagens()


    return mensagensAtuais
}

export async function getMensagens() {

    const connection = await databasePool.getConnection();

    const [response] = await connection.query("SELECT * from mensagens") as any;

    connection.release()

    return response
}


export async function deleteMensagens() {
    const connection = await databasePool.getConnection();

    const [response] = await connection.query("TRUNCATE TABLE mensagens;") as any;

    connection.release()

    return response
}


export async function getHistorico(componentesPaginacao: ComponentesPaginacao) {
    const validacao = await componentesPaginacaoSchema.safeParseAsync(componentesPaginacao)

    if (validacao.success) {
        const connection = await databasePool.getConnection();

        const [[count]] = await connection.query(`SELECT COUNT(*) as numeroDeProtocolos FROM protocolos`) as any

        const [response] = await connection.query(`SELECT * FROM protocolos
    ${validacao.data.search
                ? `where protocolo like '%${validacao.data.search}%'`
                : ""
            }
    order by ${validacao.data.orderBy} ${validacao.data.direction} limit ${validacao.data.limit} offset ${validacao.data.offset}`) as any;

        connection.release()
            console.log(count)
        return { response, count }
    }

    return { response: [{nomeProtocolo: "Nenhum protocolo encontrado"}], count: 0}

}
export async function getHistoricoMensagens(numeroProtocolo: number) {
    const connection = await databasePool.getConnection();

    const [response] = await connection.query(`SELECT * FROM historicoAtendimentos inner join protocolos on historicoAtendimentos.numeroProtocolo = protocolos.protocolo where numeroProtocolo = ${numeroProtocolo}`) as any;
    console.log(response)
    connection.release()

    return response
}

