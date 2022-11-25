import './modal.css';

import { FiX } from 'react-icons/fi'

export default function Modal({conteudo, close}) {
    return(
        <div className="modal">
            <div className="container">
                <button className="close" onClick={close}>
                    <FiX size={23} color="#FFF" />
                    Voltar
                </button>

                <div>
                    <h2>Detalhes do dividendo</h2>

                    <div className="row">
                        <span>
                            Dividendo: <i>{conteudo.ativo}</i>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Quantidade: <i>{conteudo.qtd}</i>
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            Valor: <i>{conteudo.valor}</i>
                        </span>
                    </div>
                    <div className="row">
                        <span>
                            Recebimento: <i>{conteudo.dataPagamento}</i>
                        </span>
                    </div>

                    <div className="row">
                        <span>
                            Status: <i style={{color: '#FFF', backgroundColor: conteudo.status === 'Aprovado' ? '#5cb85c' : '#999'}}>{conteudo.status}</i>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}