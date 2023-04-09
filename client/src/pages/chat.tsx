import React, { useState } from 'react';
import '../App.css';
import axios from "axios";
import api from '../api/api';
import ImgLogo from '../img/logo.png';
import ImgProduto from '../img/engrenagem-mulher.png';
import iconeEnvio from '../img/arrow.png';
import ImgLivia from '../img/livia.png';
import { Link, useNavigate } from 'react-router-dom';

type Mensagem = {
  mensagem: string,
  ehUsuario: boolean
}

const Chat = () => {

  const [historicoMensagens, setHistoricoMensagens] = useState<Mensagem[]>([])
  const [mensagemInicial, setMensagemInicial] = useState<string[]>([])
  const [numeroProtocolo, setNumeroProtocolo] = useState<number>(0)
  const [botInciado, setBotIniciado] = useState<boolean>(false)
  const navigate = useNavigate()

  function navigateToHistorico(){
    navigate("/historico")
  }

  async function iniciarBot() {
    const mensagemInicial = await api.get('/iniciarBot')
    setNumeroProtocolo(mensagemInicial.data.numeroProtocolo)
    setMensagemInicial(mensagemInicial.data.mensagem)
    setBotIniciado(true)
  }

  const [mensagemCliente, setMensagemCliente] = useState('')

  async function enviarMensagem(event: any) {
    event.preventDefault()
    const retorno = await api.post(`/mensagens/${mensagemCliente}`, {
      numeroProtocolo
    })
    const dadosRetorno = await retorno.data.data;
    setHistoricoMensagens(dadosRetorno)
    setMensagemCliente('')
  }

  function onchangedMensagemCliente(recebeMensagem: string) {
    setMensagemCliente(recebeMensagem)
  }

  async function deletarMensagem(event: any) {
    event.preventDefault()
    const informacoesHistorico = {
      id: numeroProtocolo + 1,
      conversa: historicoMensagens
    }
    const historicoPermanente = await api.put('/historico', informacoesHistorico)
    const retorno = await api.delete(`/mensagens/`)
    setMensagemInicial([])
    setHistoricoMensagens([])
    setBotIniciado(false)
  }
  return (
    <div className="App">
      <div className='flex'>

        <div className='bg-azul-escuro w-1/4 justify-center items-center flex'>
          <div className='justify-center items-center flex flex-col content-center'>
            <div className='mx-auto justify-center items-center flex pb-3'>
              <img className='w-9/12 ' src={ImgProduto} />
            </div>
            <div>
              <button type="button" onClick={navigateToHistorico} className='bg-rosa-escuro rounded-xl mb-6 pl-4 pr-4 pt-2 pb-2 drop-shadow-md font-medium text-cinza-claro text-base'>Histórico de atendimentos</button>
            </div>
          </div>
        </div>

        <div className='bg-branco-fundo w-3/4 pt-2 pb-2 pl-14 pr-14'>
          <div className='flex justify-center pt-2 pb-2'>
            <img className='w-80' src={ImgLogo} />
          </div>

          <div className='bg-cinzinha drop-shadow-1xl  rounded-2xl'>
            <div className='bg-cinza-claro rounded-2xl drop-shadow-lg flex mb-2'>
              <div>
                <img className='w-24 pt-2 pb-2 pl-4 pr-4 flex ' src={ImgLivia} />
              </div>
              <div className='grid  content-center'>
                <h3 className='text-black text-base font-semibold'>Livia</h3>
                <p className='text-black text-base'>Engenheira</p>
              </div>
            </div>

            <div className='h-96 overflow-auto'>
              {
                mensagemInicial &&
                mensagemInicial.map((mensagem: any, idx) => {
                  return <p key={`incial_${idx}`} className='text-start  bg-rosa-claro rounded-xl w-3/4  mr-auto ml-6 pl-2 pb-1 pt-1 mb-1 mt-1'>{mensagem.mensagem}</p>
                })

              }
              <div className='flex flex-col'>
                {
                  historicoMensagens?.map((mensagem: any, idx) =>
                  (
                    <>
                      <p className={'text-end bg-azul-claro rounded-xl w-3/4 ml-auto mr-6 pr-2 pb-1 pt-1 mb-1 mt-1'} key={idx}>
                        {mensagem.mensagemCliente}
                      </p>
                      <p className={'text-start bg-rosa-claro rounded-xl w-3/4 mr-auto ml-6 pl-2 pb-1 pt-1 mb-1 mt-1'} key={`mensagem_bot_${idx}`}>
                        {mensagem.mensagemAutomatica}
                      </p>
                    </>

                  ))
                }
              </div>
              <br></br>
            </div>

            <div className='bg-cinza-claro rounded-2xl drop-shadow-lg ml-6 mr-6 mb-6 mt-6'>
              {
                botInciado ?
                  <form className='flex items-center ' onSubmit={(event) => enviarMensagem(event)}>
                    <label htmlFor="mensagensCliente"></label>
                    <input className='bg-cinza-claro rounded-2xl  items-center pl-4 h-16 w-11/12' type="text" id="mensagensCliente" placeholder="Envie sua mensagem: " value={mensagemCliente} onChange={(event) => onchangedMensagemCliente(event.target.value)}></input>
                    <input className=' place-content-end h-11 w-11 ' type="image" id="submit" alt="Login" src={iconeEnvio} ></input>
                  </form> :
                  <div className='bg-cinza-claro rounded-2xl  items-center pl-4 h-16 w-11/12'> </div>
              }
            </div>

            {
              botInciado ?
                <div>
                  <button type="button" onClick={deletarMensagem} className='bg-rosa-escuro rounded-xl mb-6 pl-4 pr-4 pt-2 pb-2 drop-shadow-md font-medium text-cinza-claro text-base'>Finalizar atendimento</button>
                </div> :
                <div>
                  <button type="button" onClick={iniciarBot} className='bg-azul-escuro rounded-xl mb-6 pl-4 pr-4 pt-2 pb-2 drop-shadow-md font-medium text-cinza-claro text-base'>Iniciar atendimento</button>
                </div>
            }



          </div>

        </div>

      </div >
    </div >
  );
}

export default Chat;
